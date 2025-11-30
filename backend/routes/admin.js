// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const auth = require('../middleware/auth');

// ------------------------
//  Middleware: only officials
// ------------------------
const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'official') {
    return next();
  }
  return res.status(403).json({ msg: 'Access denied. Not an official.' });
};

// ------------------------
//  GET /api/admin/applications
//  Get all startup applications (for admin panel)
//  Private – officials only
// ------------------------
router.get('/applications', [auth, adminAuth], async (req, res) => {
  try {
    const applications = await Startup.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err.message);
    res.status(500).send('Server Error');
  }
});

// ------------------------
//  PUT /api/admin/update-status/:startupId
//  Update status + timeline + emit real-time event
//  Private – officials only
// ------------------------
router.put('/update-status/:startupId', [auth, adminAuth], async (req, res) => {
  const { newStatus, comment } = req.body;

  if (!newStatus) {
    return res.status(400).json({ msg: 'New status is required.' });
  }

  try {
    const { startupId } = req.params;

    const startup = await Startup.findById(startupId);
    if (!startup) {
      return res.status(404).json({ msg: 'Startup application not found' });
    }

    // 1. Update current status
    startup.applicationStatus = newStatus;

    // 2. Ensure we have a timeline array
    if (!Array.isArray(startup.statusTimeline)) {
      startup.statusTimeline = [];
    }

    // 3. Push new history entry
    startup.statusTimeline.push({
      status: newStatus,
      comment: comment || '',
      date: new Date(),
    });

    // 4. Save to DB
    await startup.save();

    // 5. Real-time event via socket.io
    const io = req.app.get('socketio'); // set in server.js
    if (io) {
      io.to(startupId.toString()).emit('statusUpdate', {
        applicationStatus: startup.applicationStatus,
        statusTimeline: startup.statusTimeline,
      });
    }

    return res.json(startup);
  } catch (err) {
    console.error('Error in update-status:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

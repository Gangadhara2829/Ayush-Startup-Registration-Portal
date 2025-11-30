// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../models/Startup');

// ✅ Get logged-in startup profile
// GET /api/dashboard/profile
router.get('/profile', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Authentication error, user not found in token.' });
    }

    if (req.user.role !== 'startup') {
      return res.status(403).json({ msg: 'Access denied. Not a startup.' });
    }

    const startup = await Startup.findById(req.user.id).select('-password');
    if (!startup) {
      return res.status(404).json({ msg: 'Startup profile not found' });
    }

    res.json(startup);
  } catch (err) {
    console.error('Error in /api/dashboard/profile:', err.message);
    res.status(500).send('Server Error');
  }
});

// ✅ (You already had this, keep it — it can return same data or extra)
router.get('/my-application', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ msg: 'Authentication error, user not found in token.' });
    }

    if (req.user.role !== 'startup') {
      return res.status(403).json({ msg: 'Access denied. Not a startup.' });
    }

    const startup = await Startup.findById(req.user.id).select('-password');

    if (!startup) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    res.json(startup);
  } catch (err) {
    console.error('Error in /api/dashboard/my-application:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

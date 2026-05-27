const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Startup = require('../models/Startup');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req,file,cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// middleware to verify token
function auth(req,res,next){
  const token = req.header('x-auth-token') || req.query.token;
  if(!token) return res.status(401).json({ msg:'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err){ res.status(401).json({ msg:'Token invalid' }); }
}

// submit startup application with files; use field names below
router.post('/apply', auth, upload.fields([
  { name: 'registrationCertificate', maxCount: 1 },
  { name: 'founderId', maxCount: 1 },
  { name: 'complianceDocs', maxCount: 5 }
]), async (req,res) => {
  try {
    const body = req.body;
    const files = req.files || {};
    const regCert = files.registrationCertificate ? '/uploads/' + files.registrationCertificate[0].filename : null;
    const founderId = files.founderId ? '/uploads/' + files.founderId[0].filename : null;
    const compliance = (files.complianceDocs || []).map(f => '/uploads/' + f.filename);
    const startup = await Startup.create({
      startupName: body.startupName,
      founderName: body.founderName,
      contactNumber: body.contactNumber,
      email: body.email,
      state: body.state,
      city: body.city,
      sector: body.sector,
      registrationCertificate: regCert,
      founderAadhaarOrPAN: founderId,
      complianceDocs: compliance,
      submittedBy: req.user.id
    });
    res.json({ msg:'Submitted', startup });
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// get my applications
router.get('/mine', auth, async (req,res) => {
  const apps = await Startup.find({ submittedBy: req.user.id }).sort({ createdAt: -1 });
  res.json(apps);
});

module.exports = router;

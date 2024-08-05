// routes/uploads.js
const express = require('express');
const router = express.Router();
const upload = require('../upload'); // Import the upload configuration

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ url: req.file.location });
});

module.exports = router;

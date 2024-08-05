// routes/auth.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

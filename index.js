const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // Import axios

require('dotenv').config();
const User = require('./models/User'); // Adjust path as needed
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
const uploadRoutes = require('./routes/upload'); // Correct path to upload routes

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI);

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      email,
      password
    });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Signup successful', token });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

  
app.get('/news', async (req, res) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
      res.json(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
  });
  
// Start the server on the port from environment variables
const PORT = process.env.PORT || 5000; // Default to 5000 if not specified
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

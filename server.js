const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const User = mongoose.model('User', userSchema);

// Routes
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.status(200).json({ message: 'User information saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user information', error: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

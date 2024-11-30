
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Remove extra whitespace
    minlength: 2 // Minimum length for name
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensure email is unique
    lowercase: true, // Automatically convert email to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Regex for email validation
  },
  age: {
    type: Number, // Store age as a number
    required: true, // Age is required
    min: 1, // Minimum age value
    max: 120 // Maximum age value for validation
  }
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;

const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: "Invalid email format"
    }
  },
  password: { 
    type: String, 
    required: true 
  }
});


module.exports = mongoose.model('User', userSchema);

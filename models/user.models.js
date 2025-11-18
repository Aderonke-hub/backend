const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
     firstName: {
          type: String, required: true,
          match: [/^[A-Za-z]+$/, "First name must contain only letters"],
          trim: true,
     },
     lastName: {
          type: String, required: true,
          match: [/^[A-Za-z]+$/, "Last name must contain only letters"],
          trim: true,
     },
     email: {
          type: String, required: true,
          unique: [true, "Email has been taken, please choose another one"],
          match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
     },
     userPassword: { type: String, required: true }
})
module.exports = mongoose.model('userModel', userSchema)

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  address: String,
  phoneNumber: String,
  role: { type: String, enum: ['patient', 'staff', 'admin'], required: true }
}, );

const Users = mongoose.model('Users', userSchema);

const user = new Users(communityData)

user.save();


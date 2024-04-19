const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, default: 'egypt' },
  phoneNumber: { type: String, default: null },
  email: {
    type: String,
    required: true,
    match: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/ // Add the regex pattern for email validation
  },
  gender: { type: String, required: true, default: 'male' },
  password: { type: String, required: true },
  age: Number,
  role: { type: String, enum: ['patient', 'staff', 'admin'], required: true },
  images:{ type: [String], default: [] },
});

const Users = mongoose.model('Users', userSchema);
const userData={
  name: "Abdullah",
  address: "Riyadh",
  phoneNumber: "0555555555",
  email: "ahahah@gamia.cin",
  gender:'male',
  age: 25,
  password: "123456",
  role: "patient"
}
const user = new Users(userData); // Create a new user in the database    
user.save(); // Save the user to the database
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
  role: { type: String, enum: ['patient', 'Doctor', 'admin'], required: true },
  images:{ type: [String], default: [] },
  workingHours: { type:String, default: undefined },
  salary: { type: Number, default: undefined },
});

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  date:{
    type: Date,
    required: true,
    default: Date.now
  },
  type: { type: String, enum: ['Examination', 'Consultation'], required: true },
  paymentMethod: { type: String, enum: ['Insurance', 'Cash'], required: true },

});

const Users = mongoose.model('Users', userSchema);
const Appointments = mongoose.model('Appointments', appointmentSchema);
const appounrmentData={
  doctorId: "66227ceb828269236367a6d0",
  patientId: "662279eee6cb667641500cd9",
  date: new Date(),
  type: "Examination",
  paymentMethod: "Insurance"
}

const userData={
  name: "Abdullah",
  address: "Riyadh",
  phoneNumber: "0555555555",
  email: "ahahah@gamia.cin",
  gender:'male',
  age: 25,
  password: "123456",
  role: "Doctor"
}
const user = new Users(userData); // Create a new user in the database 
const appointment = new Appointments(appounrmentData); // Create a new appointment in the database
appointment.save(); // Save the appointment to the database   
user.save(); // Save the user to the database
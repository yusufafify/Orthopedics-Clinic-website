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
  workingHours: { type:[Number], default: undefined },
  salary: { type: Number, default: undefined },
  profilePic: { type: String, default: '' },

  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null }
});

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  date:{ type: Date, required: true, default: Date.now },
  type: { type: String, enum: ['Examination', 'Consultation'], required: true },
  paymentMethod: { type: String, enum: ['Insurance', 'Cash'], required: true },
  diagnosis: { type: [String], default: null },
  treatment: { type: [String], default: [] }, // esm eldawa, elmawa3eed, elgor3a, norbotha patient history, ma3 images, ma3 diagnosis 
  doctorNotes: { type: String, default: null },
  price: { type: Number, default: undefined },
  status:{type: String, enum:['pending', 'completed', 'cancelled'], default: 'pending'}
});

const imageSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  imageType: { type: String },
  date: { type: Date, default: Date.now },
  src: { type: String, required: true }
}, { timestamps: true })

const medicalHistorySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  historytype: { type: String, required: true },
  titleofproblem: { type: String, required: true },
  dateofproblem: { type: String, required: true },
  description: { type: String, required: true }
})


const Users = mongoose.model('Users', userSchema);
const Appointments = mongoose.model('Appointments', appointmentSchema);
const Images = mongoose.model('Images', imageSchema);
const MedicalHistory = mongoose.model('medicalhistories', medicalHistorySchema);

const appounrmentData={
  doctorId: "662a912c2c9bd6a529447214",
  patientId: "662a990058c7edf6b14c99e6",
  type: "Consultation",
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

const imageData = {
  patientId: '6622d47712fd1878fb214e70',
  imageType: 'x-ray',
  src: 'ay haga for now'
}

//const user = new Users(userData); // Create a new user in the database 
const appointment = new Appointments(appounrmentData); // Create a new appointment in the database
// const image = new Images(imageData); // Create a new image in the database

appointment.save(); // Save the appointment to the database   
//user.save(); // Save the user to the database
// image.save(); // Save the image in the image collection
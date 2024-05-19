//object containing all the appointments
import { getAppointments } from "../utils/getAppointments.js";
import {loader} from "../utils/loader.js";
import { handleCancel } from "../utils/handleCancel.js";
import {handleSubmit} from "../utils/handleSubmit.js";
const appointmentsDetails = [];
document.getElementById("appointment_table_body").innerHTML =
loader();
async function getPatientAppointmentsData() {
  
  try{
    const response=await fetch("http://localhost:8008/get_patient_appointments",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if(data){
      appointmentsDetails.push(...data);
    }
    console.log(appointmentsDetails);
    
document.getElementById("appointment_table_body").innerHTML =
getAppointments(appointmentsDetails.slice(0, 3));
var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
});

  }catch(error){
    console.error(error);
    
  }
}
getPatientAppointmentsData();

let newAppointmentDate="";
const appointmentDate=document.getElementById("datetime");

function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;

  console.log("Button clicked:", buttonId);

  //get the number from the id of the button
  let number = buttonId.replace(/^\D+/g, "");
  console.log(number);


  if (buttonId.includes("detailsbtn")) {
    const mainDialog = document.getElementById(`mainDialog${number}`);
    mainDialog.classList.remove("hidden", "pointer-events-none");

    mainDialog.classList.add(
      "fixed",
      "inset-0",
      "grid",
      "h-screen",
      "w-screen",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "backdrop-blur-sm"
    );

    setTimeout(() => {
      mainDialog.classList.add("opacity-100");
    }, 100);

    const detailsDialog = document.getElementById(`detailsDialog${number}`);

    detailsDialog.classList.add("opacity-100", "translate-y-0", "scale-100");
    detailsDialog.classList.remove(
      "-translate-y-28",
      "scale-90",
      "pointer-events-none"
    );
  }
  if (buttonId.includes("exitBtn")) {
    const mainDialog = document.getElementById(`mainDialog${number}`);
    mainDialog.classList.add("hidden", "pointer-events-none");
    mainDialog.classList.remove(
      "fixed",
      "inset-0",
      "grid",
      "h-screen",
      "w-screen",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "backdrop-blur-sm",
      "opacity-100"
    );

    const detailsDialog = document.getElementById(`detailsDialog${number}`);
    detailsDialog.classList.remove("opacity-100", "translate-y-0", "scale-100");

    detailsDialog.classList.add(
      "pointer-events-none",
      "scale-90",
      "-translate-y-28"
    );
  }
  if (buttonId.includes("editbtn")) {
    const editDialogContainer = document.getElementById(
      `editDialogContainer${number}`
    );
    const editDialog = document.getElementById(`editDialog${number}`);
    ("fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm");
    editDialogContainer.classList.remove("hidden", "pointer-events-none");
    editDialogContainer.classList.add(
      "fixed",
      "inset-0",
      "grid",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "backdrop-blur-sm"
    );
    

    setTimeout(() => {
      editDialogContainer.classList.add("opacity-100");
    }, 100);

    editDialog.classList.add("opacity-100", "translate-y-0", "scale-100");

    editDialog.classList.remove(
      "-translate-y-28",
      "scale-90",
      "pointer-events-none"
    );
    console.log('iweufhwies'+newAppointmentDate);
    // newAppointmentDate=document.getElementById(`date_picker${number}`).value 
    //event listener for date picker
    document.getElementById(`datePicker${number}`).addEventListener("change", (event) => {
      newAppointmentDate = event.target.value;
      console.log(newAppointmentDate);
    });
  }
  if (buttonId.includes("exitEditBtn")) {
    const editDialogContainer = document.getElementById(
      `editDialogContainer${number}`
    );
    const editDialog = document.getElementById(`editDialog${number}`);
    editDialogContainer.classList.add("hidden", "pointer-events-none");

    editDialogContainer.classList.remove(
      "fixed",
      "inset-0",
      "grid",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "opacity-100",
      "backdrop-blur-sm"
    );

    editDialog.classList.remove("opacity-100", "translate-y-0", "scale-100");

    editDialog.classList.add(
      "-translate-y-28",
      "pointer-events-none",
      "scale-90"
    );
  }
  if (buttonId.includes("cancel")) {
    handleCancel(number);
  }
  if(buttonId.includes("submitEdit")){
    
    console.log(newAppointmentDate)
    if(newAppointmentDate===""){
      alert("Please select a date");
      return;
    }
    handleSubmit(number,newAppointmentDate);
  }


}

var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
});

//event listener for checking available slots btn
document.getElementById("checkForDateBtn").addEventListener("click",async (event)=>{
  event.preventDefault();
  const date=appointmentDate.value;
  if(date===""){
    alert("Please select a date");
    return;
  }
  const availableSlots=await checkAvailableSlots(date);
  if(availableSlots.length===0){
    alert("No available slots for the selected date");
    return;
  }
  
console.log(availableSlots);
  document.getElementById("slotsContainer").classList.remove("hidden");
  let uniqueSlots = availableSlots.filter((slot, index, self) =>
    index === self.findIndex((s) => s.doctorhours === slot.doctorhours)
  );
  console.log(uniqueSlots);
  document.getElementById("slots").innerHTML = uniqueSlots.map((slot, index) => {
    return `<option id='${slot.DoctorEmail}' value="${slot.doctorhours}">${slot.doctorhours}</option>`
  }).join("");
  document.getElementById("checkForDateBtn").classList.add("hidden");
  document.getElementById("submitAppointmentBtn").classList.remove("hidden");
})

//check for available slots
async function checkAvailableSlots(date){
try {
  const response =await fetch("http://localhost:8008/get_available_doctor",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("token")}`,
    },
    body:JSON.stringify({
      date:`${date}`,
    }),
  });
  const data=await response.json();
  console.log(data.returned_doctors)
  return data.returned_doctors
} catch (error) {
  console.log(error)
}
}



document.getElementById("submitAppointmentBtn").addEventListener("click",async (e)=>{
  const date=appointmentDate.value;
  const type=document.getElementById('type').value;
  const paymentMethod=document.getElementById('paymentMethod').value;
  console.log(paymentMethod);
  const email=document.getElementById("slots").selectedOptions[0].id;
  const appointmentsObj={
    date,
    email,
    type,
    paymentMethod

  }
  console.log(appointmentsObj);
  scheduleAppointment(appointmentsObj);

})

async function scheduleAppointment(appointmentsObj){
  try {
    const response=await fetch("http://localhost:8008/appointment_booking",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify(appointmentsObj),
    });
    const data=await response.json();
    console.log(data);
    if(data){
      alert("Appointment scheduled successfully");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
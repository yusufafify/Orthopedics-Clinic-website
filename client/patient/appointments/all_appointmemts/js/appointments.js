// import { appointmentsDetails } from "../../utils/appointmentsDetails.js";
import { getAppointments } from "../../utils/getAppointments.js";
import { fetchAppointments } from "./fetchAppointments.js";

import { loader } from "./loader.js";
import {handleSubmit} from '../../utils/handleSubmit.js';
import {handleCancel} from '../../utils/handleCancel.js';
const appointmentsDetails = [];
let pages = document.getElementById("pages");
pages.innerHTML = `pages 1 of ${Math.ceil(appointmentsDetails.length / 4)}`;
let currentPage = 1;
let isOnePageState = false;
let consultationState = false;
let examinationState = false;
let isFetchDone = false;
let newAppointmentDate=''
const appointmentDate=document.getElementById("datetime");

const search = document.getElementById("search");

function attachButtonEventListeners() {
  var buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", handleButtonClick);
  });
}

const table_body = document.getElementById("appointment_table_body");
attachButtonEventListeners();

function showLoader() {
  table_body.innerHTML = loader();
}
async function fetchDataAndDisplayAppointments() {
  showLoader();
  const data = await fetchAppointments();
  console.log(data)
  if (data) {
    isFetchDone = true;
    appointmentsDetails.push(...data);

    handlePagination(appointmentsDetails);
  }
}

fetchDataAndDisplayAppointments();

//function that handles the pagination logic of the appointments table
function handlePagination(appointments) {
  //if there are no appointments, display a message
  if (appointments.length === 0) {
    table_body.innerHTML = `<tr>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex items-center gap-3">

        <div class="flex flex-col">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            No Appointments
          </p>

        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex flex-col">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          ---
        </p>

      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">

      <div class="w-max">
        <div
          class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap">
          <span class="">---</span> 
        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50"> 

      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        ---
      </p>
    </td>
</tr>`;
    return;
  }
  //get the current page
  const startIndex = (currentPage - 1) * 8;
  //get the end index of the current page
  const endIndex = startIndex + 8;
  //get the appointments that will be displayed on the current page
  const currentAppointments = appointments.slice(startIndex, endIndex);
  //display the appointments on the table
  table_body.innerHTML = getAppointments(currentAppointments);
  //attach event listeners to the buttons
  attachButtonEventListeners();
  //if there is only one page, display the page number as 1 of 1
  if (appointments.length >= 1 && appointments.length <= 8) {
    isOnePageState = true;
    currentPage = 1;
    pages.innerHTML = "page 1 of 1";
  } else {
    isOnePageState = false;
    pages.innerHTML = `page ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;
  }
}

//function that targets the list data-value and filters the appointments based on the value of the list item
function handleListClick(event) {
  const value = event.currentTarget.getAttribute("data-value");

  // Remove existing div from all list items
  list.forEach((item) => {
    const existingDiv = item.querySelector("#list_bg");
    if (existingDiv) {
      item.removeChild(existingDiv);
    }
  });

  // Create a new div and append it to the clicked list item
  const newDiv = document.createElement("div");
  newDiv.classList.add(
    "absolute",
    "inset-0",
    "z-10",
    "h-full",
    "bg-white",
    "rounded-md",
    "shadow"
  );

  newDiv.id = "list_bg";

  event.currentTarget.appendChild(newDiv);
  //filter the appointments based on the value of the list item
  //give back all the appointments if the value is "all"
  if (value === "all") {
    consultationState = false;
    examinationState = false;
    handlePagination(appointmentsDetails);
    //attachButtonEventListeners();
    return;
  }
  if (value === "consultation") {
    consultationState = true;
    examinationState = false;
  }
  if (value === "examination") {
    examinationState = true;
    consultationState = false;
  }
  //bring back the appointments that have the same reason as the value of the list item
  const filteredAppointments = appointmentsDetails.filter(
    (appointment) => appointment.reason.toLocaleLowerCase() === value
  );
  console.log(filteredAppointments.length);
  //display the filtered appointments on the table
  if (filteredAppointments.length >= 1 && filteredAppointments.length <= 8) {
    isOnePageState = true;
    currentPage = 1;
    pages.innerHTML = "page 1 of 1";
  } else {
    isOnePageState = false;
    pages.innerHTML = `page ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;
  }
  console.log(isOnePageState);
  handlePagination(filteredAppointments);
}

const list = document.querySelectorAll("[data-value]");
list.forEach((item) => {
  item.addEventListener("click", handleListClick);
});

//function that handles the button click event
//Every button has an id that contains a number
//The number is used to identify the appointment that the button belongs to
//The function uses the number to display the details dialog of the appointment
//The function also uses the number to display the edit dialog of the appointment
//The function also uses the number to close the details dialog and the edit dialog
//The function also uses the id to navigate to the next page of the appointments table
//The function also uses the id to navigate to the previous page of the appointments table

function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;

  //get the number from the id of the button
  let number = buttonId.replace(/^\D+/g, "");

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
      "-translate-y-28",
      "scale-90",
      "pointer-events-none"
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
      "scale-90",
      "pointer-events-none"
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

  if (buttonId.includes("next")) {
    if (isOnePageState) return;

    if (currentPage === Math.ceil(appointmentsDetails.length / 8)) return;
    currentPage++;
    pages.innerHTML = `pages ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;

    if (consultationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "consultation"
      );

      handlePagination(filteredAppointments);
    } else if (examinationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "examination"
      );
      handlePagination(filteredAppointments);
    } else {
      handlePagination(appointmentsDetails);
    }
  }

  if (buttonId.includes("previous")) {
    if (isOnePageState) return;
    if (currentPage === 1) return;
    currentPage--;
    pages.innerHTML = `pages ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;
    if (consultationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "consultation"
      );

      handlePagination(filteredAppointments);
    } else if (examinationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "examination"
      );
      handlePagination(filteredAppointments);
    } else {
      handlePagination(appointmentsDetails);
    }
  }
}

//function that handles the search input
//The function filters the appointments based on the search input
//The function displays the filtered appointments on the table
search.addEventListener("input", (event) => {
  const value = event.target.value;
  console.log(value)
  const filteredAppointments = appointmentsDetails.filter((appointment) =>
    appointment.date.toLocaleLowerCase().includes(value.toLocaleLowerCase())||
    appointment.payment.toLocaleLowerCase().includes(value.toLocaleLowerCase())||
    appointment.status.toLocaleLowerCase().includes(value.toLocaleLowerCase())||
    appointment.reason.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );
  handlePagination(filteredAppointments);
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
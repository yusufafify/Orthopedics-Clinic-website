
todaysAppointments=[];
startLoading();
if (localStorage.getItem("token") === null) {
  window.location.href = "/login";
}

fetch ("http://localhost:8008/get_today_appointments", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
.then((response) => response.json())
.then((data) => {
  todaysAppointments=data;
  if (todaysAppointments.length>0){
    console.log(getActiveAppointmentID());
    console.log(localStorage.activeAppointment)
    updateAppointments();
  displayActiveAppointment();

  
  }
  else{
    confirmAppointment(-1);
noActiveAppointments();
  }
  stopLoading();
  
})
.catch((error) => {
  console.log(error);

stopLoading();
  
});


 

let oldAppointment;

let _activeAppointmentID = -1; // This will hold the actual value of activeAppointmentID
let activeAppointment = null; // This will hold the active appointment object

// Load the active appointment from localStorage when the page loads
const storedAppointment = localStorage.getItem('activeAppointment');
if (storedAppointment) {
  activeAppointment = JSON.parse(storedAppointment);
  _activeAppointmentID = activeAppointment.appointmentID;
}

function setActiveAppointmentID(id) {
  _activeAppointmentID = id;

  // Find the active appointment
  if (todaysAppointments.length>0){
  activeAppointment = todaysAppointments.find(appointment => appointment.appointmentID === id);

  // Check if activeAppointment is undefined
  if (!activeAppointment) {
    if (id==-1){
      localStorage.setItem('activeAppointment', JSON.stringify({id: -1}));
      return
    }
    console.error(`No appointment found with id ${id}`);
    return;
  }

  // Store the active appointment in localStorage
  localStorage.setItem('activeAppointment', JSON.stringify(activeAppointment));
}
}


function dropAppointment() {
todaysAppointments.push(oldAppointment);
  
  oldAppointment=null;
  setActiveAppointmentID(-1);
  updateAppointments();
  displayActiveAppointment();
  
}

function getActiveAppointmentID() {
  return _activeAppointmentID;
}

function getPatientInfo(){
let currentAppointment = JSON.parse(localStorage.getItem('activeAppointment'));
console.log(currentAppointment)
if (activeAppointment && activeAppointment.patientId) {
  fetch("http://localhost:8008/get_patient_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ patientId: activeAppointment.patientId }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.user);
    if (data != undefined){
      document.querySelector('#medicalImages').innerHTML = generateMedicalImages(data.images);
      document.querySelector('#recordBox').innerHTML = displayMedicalHistory(data.medical_history);
      document.getElementById('infoName').innerHTML = "Name: "+data.user.name;
      document.getElementById('infoAge').innerHTML = "Age: "+data.user.age;
      document.getElementById('infoGender').innerHTML = "Gender: "+ data.user.gender;
      document.getElementById('infoPhone').innerHTML = "Phone number: " +data.user.phone;
      document.getElementById('infoEmail').innerHTML = "Email: " +data.user.email;
      document.getElementById('infoAddress').innerHTML = "Address: " +data.user.address;

      
    }
  })
.catch((error) => {
console.error("Error:", error);
});
}
}
getPatientInfo();


function openImageModal(image) {
  document.getElementById('modal-image').src = image;
  document.getElementById('modal').classList.remove('hidden');
}

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.remove('opacity-0', 'pointer-events-none');
  }


function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.add('opacity-0', 'pointer-events-none');
  }

  var item = document.getElementById("container1");

  window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) item.scrollLeft += 50;
    else item.scrollLeft -= 50;
  });

  function showInputField(select, inputId) {
    var input = document.getElementById(inputId);
    if (select.value == 'Other') {
      input.classList.remove('hidden');
    } else {
      input.classList.add('hidden');
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  function displayMedicalHistory(medicalHistory) {
    if (medicalHistory===undefined){
      return `<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">

  
        No history found.
    </div>
  `;
    }
    let formattedHistory = '';
  
    medicalHistory.forEach((item, index) => {
      formattedHistory += `${index + 1}:${item.historyType}<br>`;
      for (const key in item) {
        if (key !=='historyType'){
        formattedHistory += `${capitalizeFirstLetter(key)}: ${item[key]}<br>`;
        }
      }
      formattedHistory += '----------------------------<br>';
    });
  
    return formattedHistory;
  }



// Function to generate table rows
function generateTodaysAppointmentsTableRows(dataa) {
  let rows = '';
data=todaysAppointments;
  for (let appointment of data) {

    rows += `
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${appointment.patientName}</td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${appointment.appointmentID}</td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.type}</td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
        <div class="flex items-center gap-4">
        <button
        onclick="openModal('confirmModal'); changeAppointment('${appointment.appointmentID}')"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="w-4 h-4">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
            <path d="m9 16 2 2 4-4"></path>
          </svg>
          <span class="sr-only">Confirm appointment</span>
        </button>
        

      </div>
        </td>
      </tr>
    `;
    
  }
  return rows;
}

function changeAppointment(id){
console.log("Dooo");
  setActiveAppointmentID(id);
}

function resetChange(){
  setActiveAppointmentID(oldAppointment.appointmentID);
  closeModal('confirmModal');
}

// Add the generated rows to the table
function noActiveAppointments(){
  document.querySelector('#todaysAppointmentsTable').innerHTML = `<div class=" absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"  style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">
  <br>

  <br>  
      No appointments found.
  </div>
`;

}

function updateAppointments(){
  document.querySelector('#todaysAppointmentsTable').innerHTML = generateTodaysAppointmentsTableRows(todaysAppointments);
}
updateAppointments();
// Function to handle the Confirm button click


// Medical Images



  
  // Add more image paths as needed
//image.category.split("_")[0]
// Function to generate images
function generateMedicalImages(images) {
  

  if (images === undefined){
    return `<div style="display: flex; justify-content: center; margin-left:7em; align-items: center; height: 100%; font-size: 2em;">
    <br>
  
    <br>  
        No images found.
    </div>
  `;

  }
  let imageElements = '';
  for (let image of images) {
    imageElements += `
    <div class="flex-none">
    <a href="${image.src}" data-lightbox="image-1" data-title="${image.category}">
      <img src="${image.src}" alt="Medical Image" class="w-48 h-48 object-cover cursor-pointer" />
    </a>
    <p class="mt-2 h-7 font-medium">${image.category}</p>
    <p class="text-sm text-gray-500">${image.date}</p>
  </div>
    `;
  }
  return imageElements;
}

// Add the generated images to the div
//document.querySelector('#medicalImages').innerHTML = generateMedicalImages(medicalImages);

// Write a function to check the activeAppointmentID, and does one of two things: either displays "No active appointment" or it displays the details of the active ID's appointment

function displayActiveAppointment() {
  
  if (getActiveAppointmentID() === -1 || getActiveAppointmentID() === undefined){
    setActiveAppointmentID(-1);
    document.getElementById('active1').innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">
    <br>
    <br>
    <br>  
        No appointment is selected. Select one to start.
    </div>
  `;
    document.getElementById('active2').innerHTML = '';
  } else {
  
// Removes from "appointments" the appointment with ID "activeAppointment"

// Remove the appointment with ID 2 from appointments

document.getElementById('active1').innerHTML = `<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4"></div>
<div>

  <h3 class="font-medium">Active Appointment</h3>


  <p id="appointmentName"></p>
</div>
<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4">
</div>
<div>
  <h3 class="font-medium">Date</h3>
  <p id="appointmentDate"></p>
</div>
<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4">
</div>
<div>
  <h3 class="font-medium">Number</h3>
  <p id="appointmentNumber"></p>
</div>

<div>
  <!-- button to view patient info -->

  <button onclick="openModal('patientInfoModal')"
    class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    View Patient Info
  </button>
</div>
<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4">
</div>


</div>`
document.getElementById('active2').innerHTML = `<div>
<h5 class="font-medium">&nbsp;</h5>

</div>
<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4"></div>
<div>
<h3 class="font-medium">Age</h3>
<p id="appointmentAge"></p>
</div>
<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4"></div>
<div>

<h3 class="font-medium">Phone Number</h3>
<p id="appointmentPhone"></p>
</div>
<div data-orientation="horizontal" role="none" class="shrink-0 bg-gray-100 h-[1px] w-full my-4"></div>
<div>
<h3 class="font-medium">Appointment Type</h3>
<p id="appointmentType"></p>
</div>
<div class="flex items-center gap-4">

<button onclick="openModal('finalizeModal')" title="Finalize appointment"
  class="tooltip inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="w-4 h-4 mx-auto">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
    <path d="m9 16 2 2 4-4"></path>
  </svg>
  <span class="sr-only">Finalize appointment</span>
</button>
<button onclick="openModal('cancelModal')" title="Cancel appointment"
  class="tooltip inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="w-4 h-4 mx-auto">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
    <line x1="10" x2="14" y1="14" y2="18"></line>
    <line x1="14" x2="10" y1="14" y2="18"></line>
  </svg>
  <span class="sr-only">Cancel appointment</span>
</button>
<div>
  <!-- button to drop appointment -->
  <button onclick="dropAppointment()"
    class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Drop Appointment
  </button>
</div>
</div>

`

  let appointment= todaysAppointments.find(appointment => appointment.appointmentID === getActiveAppointmentID());

  document.getElementById('appointmentName').innerHTML = appointment.patientName;
  document.getElementById('appointmentAge').innerHTML = appointment.patientAge;
  document.getElementById('appointmentNumber').innerHTML = appointment.appointmentID;
  document.getElementById('appointmentType').innerHTML = appointment.type;
  document.getElementById('appointmentDate').innerHTML = appointment.date;
  document.getElementById('appointmentPhone').innerHTML = appointment.phoneNumber;
  let appointmentIndex = todaysAppointments.findIndex(appointment => appointment.appointmentID === getActiveAppointmentID());
  oldAppointment=appointment;

  todaysAppointments.splice(appointmentIndex, 1);
  updateAppointments();
  
  }
}





// 

// Function to handle the View Profile button click

function viewProfile(id) {
  // Replace with your own code to view the patient's profile
  console.log(`Viewing profile for patient with id ${id}`);
}

function switchAppointment(){
  if (oldAppointment != null && getActiveAppointmentID() != -1){
  todaysAppointments.push(oldAppointment);
  }
  updateAppointments();

  displayActiveAppointment();
  closeModal('confirmModal');
  getPatientInfo();
}

function confirmAppointment(id) {
  setActiveAppointmentID(id);
  displayActiveAppointment();
}

fetch("http://localhost:8008/personal_data", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    //   document.getElementById('first_name').value=data.name.split(' ')[0];
    //   document.getElementById('last_name').value=data.name.split(' ')[1];
    //   email.value=data.email;
    //   document.getElementById('phone').value=data.phone;
    //  document.getElementById('address').value=data.address;
    //   document.getElementById('age').value=data.age;
    document.getElementById("welcome").innerHTML =
      "Welcome, Dr. " + data.name;

  })
  .catch((error) => {
    console.error("Error:");

  });

  function startLoading() {
    document.getElementById('loading').style.display = 'flex';
  }
  
  function stopLoading() {
    document.getElementById('loading').style.display = 'none';
  }

  function addTreatment() {
    event.preventDefault();
    const treatmentsDiv = document.getElementById('Treatment');
  
    const newTreatmentDiv = document.createElement('div');
    newTreatmentDiv.className = 'grid grid-cols-3 gap-4 mt-4';
    newTreatmentDiv.innerHTML = `
                  <div>
                    <label for="medicine" class="block text-sm font-medium text-gray-700">Medicine Name</label>
                    <select id="medicine" onchange="showInputField(this, 'medicineInput')"
                      class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                      <option>Medicine 1</option>
                      <option>Medicine 2</option>
                      <option>Other</option>
                      <!-- Add more options as needed -->
                    </select>

                    <input type="text" id="medicineInput"
                      class="hidden  mt-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                  </div>
                  <div>
                    <label for="frequency" class="block text-sm font-medium text-gray-700">Frequency</label>
                    <select id="frequency" onchange="showInputField(this, 'frequencyInput')"
                      class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                      <option>Once a day</option>
                      <option>Twice a day</option>
                      <option>Other</option>
                      <!-- Add more options as needed -->
                    </select>

                    <input type="text" id="frequencyInput"
                      class="hidden  mt-2 h-10  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  
                  <div>
                    <label for="dosage" class="block text-sm font-medium text-gray-700">Dosage</label>
                    <select id="dosage" onchange="showInputField(this, 'dosageInput')"
                      class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                      <option>100mg</option>
                      <option>200mg</option>
                      <option>Other</option>
                      <!-- Add more options as needed -->
                    </select>
                

                    <input type="text" id="dosageInput"
                      class="hidden h-10 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  
                    </div>
                
    `;
  
    treatmentsDiv.appendChild(newTreatmentDiv);
  }


  function addDiagnosis() {
    event.preventDefault();
    const diagnosesDiv = document.getElementById('Diagnosis');
  
    const newDiagnosisDiv = document.createElement('div');
    newDiagnosisDiv.innerHTML = `
    <label for="diagnosis" class="block text-sm font-medium text-gray-700">Diagnosis</label>
    <select id="diagnosis" onchange="showInputField(this, 'diagnosisInput')"
      class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
      <option>Orthopedic Diagnosis 1</option>
      <option>Orthopedic Diagnosis 2</option>
      <option>Orthopedic Diagnosis 3</option>
      <option>Other</option>
      <!-- Add more options as needed -->
    </select>

    <input type="text" id="diagnosisInput"
      class="hidden mt-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    `;
  
    diagnosesDiv.appendChild(newDiagnosisDiv);
  }

  function removeTreatment() {
    event.preventDefault();
    const treatmentsDiv = document.getElementById('Treatment');
    if (treatmentsDiv.children.length > 1) {
      treatmentsDiv.removeChild(treatmentsDiv.lastChild);
    }
  }
  
  function removeDiagnosis() {
    event.preventDefault();
    const diagnosesDiv = document.getElementById('Diagnosis');
    if (diagnosesDiv.children.length > 1) {
      diagnosesDiv.removeChild(diagnosesDiv.lastChild);
    }
  }


//  function updatePatientInfo(){

//   g
//  }
indexDiag=0;
indexTreat=0;
function getMedicalHistory(array, isFetchDone) {
  if (!isFetchDone) {
    return `
    
              <div role="status" class="animate-pulse">
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              <div role="status" class="animate-pulse">
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              

    `;
  }
  if (array.length === 0) {
    return `<div class="bg-white p-6 rounded-lg shadow-md ">
      <h2 class="text-md ml-[10px] font-semibold mb-4"> No Medical History yet</h2>
    </div>`;
  }
  return array.map(
    (history) =>
      `
      
      <div class="bg-white p-6 rounded-lg shadow-md ">
      <div class="flex justify-between">
          <h3 class="text-lg font-bold mb-2">${history.title}</h3>
          <button id='deleteBtn${history.history_id}' class="text-red-700 hover:bg-red-500 hover:p-2 hover:text-white transition-all duration-300 rounded-xl">delete</button>
          </div>
        <p class="mb-2">Date: ${history.date}</p>
        <p>
          Description: ${history.description}
        </p>
        
      </div>
      
    
    `
  );
}




todaysAppointments=[];
startLoading();
function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("activeAppointment")
  window.location.href ="http://" + window.location.host + "/client/Login/Login.html";
}
if (localStorage.getItem("token") === null) {
 logout()
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

    updateAppointments();
  displayActiveAppointment();
  }
  else{
    confirmAppointment(-1);
noActiveAppointments();
localStorage.removeItem('activeAppointment');

  }
  stopLoading();
  
})
.catch((error) => {
  console.log(error);

  
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
    console.log(data);
    if (data != undefined){
      document.querySelector('#medicalImages').innerHTML = generateMedicalImages(data.images);
      document.querySelector('#recordBox').innerHTML = displayMedicalHistory(data.medical_history);
      document.getElementById('infoName').innerHTML = "Name: "+data.user.name;
      document.getElementById('infoAge').innerHTML = "Age: "+data.user.age;
      document.getElementById('infoGender').innerHTML = "Gender: "+ data.user.gender;
      document.getElementById('infoPhone').innerHTML = "Phone number: " +data.user.phoneNumber;
      document.getElementById('infoEmail').innerHTML = "Email: " +data.user.email;
      document.getElementById('infoAddress').innerHTML = "Address: " +data.user.address;
   
//Initial medical history details
const medicalHistory = [];
      //variables for the medical history details
      const injuriesHistory = medicalHistory
        .filter((history) => history.historyType === "Injuries")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const surgeriesHistory = medicalHistory
        .filter((history) => history.historyType === "Surgeries")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const treatmentsHistory = medicalHistory
        .filter((history) => history.historyType === "Treatments")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const familyHistory = medicalHistory
        .filter((history) => history.historyType === "Family Afflictions")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const medications = medicalHistory
        .filter((history) => history.historyType === "Medications")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const allergies = medicalHistory
        .filter((history) => history.historyType === "Allergies")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const injuriesDetails = document.getElementById("injuries_details");
      const surgeriesDetails = document.getElementById("surgeries_details");
      const treatmentsDetails = document.getElementById("treatments_details");
      const familyHistoryDetails = document.getElementById("family_details");
      const medicationsDetails = document.getElementById("medication_details");
      const allergiesDetails = document.getElementById("allergies_details");
      injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
      surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
      treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
      familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
      medicationsDetails.innerHTML = getMedicalHistory(medications, true);
      allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
      
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
    let formattedHistory = ``;
  for (let i=0;i<medicalHistory.length;i++){
    let item= medicalHistory[i]
    let thing=item["description"];
    let things=thing.split('\n');
    things.splice(1,1);
formattedHistory+=`Date: ${item.date}<br>
${things.join('<br>')}<br>
Type: ${item.title} <br>
--------------------------------<br>
`
  }
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
noneSelected();

}

function noneSelected(){
  document.querySelector('#recordBox').innerHTML=`<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">
    No patient selected.
    </div>
    
    `;
document.querySelector('#medicalImages').innerHTML=`<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">

No patient selected.
</div>`;
};

function updateAppointments(){
  document.querySelector('#todaysAppointmentsTable').innerHTML = generateTodaysAppointmentsTableRows(todaysAppointments);
}
updateAppointments();
// Function to handle the Confirm button click
document.getElementById('sideOpenBtn').addEventListener('click', function() {
  document.getElementById('sidebar').style.transform = 'translateX(0)';
});

document.getElementById('sideCloseBtn').addEventListener('click', function() {
  document.getElementById('sidebar').style.transform = 'translateX(-100%)';
});

// Medical Images



  
  // Add more image paths as needed
//image.category.split("_")[0]
// Function to generate images
function generateMedicalImages(images) {
  

  if (images === undefined){
    return `<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">
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
  document.querySelector('#recordBox').innerHTML=`<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 2em;">
    No patient selected.
    </div>
    
    `;
noneSelected();
  //generateMedicalImages();

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
  <h3 class="font-medium">ID</h3>
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
  if (appointment!=undefined){
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
}





// 

// Function to handle the View Profile button click


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
    // if (data.name===undefined){
    //   logout();
    // }
    console.log(data)
    console.log("a7a neek eshtaghaly"+data.name)
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

  let diagnosesList=["Arthritis",
  "Osteoarthritis"
  ,"Rheumatoid Arthritis"
  ,"Bursitis"
  ,"Fibromyalgia"
  ,"Fractures"
  ,"Hip Fracture"
  ,"Low Back Pain"
  ,"Hand Pain and Problems"
  ,"Knee Pain and Problems"
  ,"Kyphosis"
  ,"Neck Pain and Problems"
  ,"Osteoporosis"
  ,"Paget’s Disease of the Bone"
  ,"Scoliosis"
  ,"Shoulder Pain and Problems"
  ,"Soft-Tissue Injuries","Other"]

let medicineList=[
  "Acetaminophen",
  "Acetylsalicylic Acid",
  "Alprazolam",
  "Amoxicillin",
  "Atorvastatin",
  "Azithromycin",
  "Citalopram",
  "Clonazepam",
  "Diazepam",
  "Fluoxetine",
  "Gabapentin",
  "Hydrochlorothiazide",
  "Ibuprofen",
  "Levothyroxine",
  "Lisinopril",
  "Losartan",
  "Meloxicam",
  "Metformin",
  "Metoprolol",
  "Omeprazole",
  "Pantoprazole",
  "Prednisone",
  "Sertraline",
  "Simvastatin",
  "Tamsulosin",
  "Tramadol",
  "Trazodone",
  "Zolpidem",
  "Other"
]
let dosages=[
  "1mg",
  "2mg",
  "2.5mg",
  "5mg",
  "10mg",
  "20mg",
  "25mg",
  "50mg",
  "75mg",
  "100mg",
  "200mg",
  "300mg",
  "400mg",
  "500mg",
  "600mg",
  "700mg",
  "800mg",
  "900mg",
  "1g",
  "1.5g",
  "2g",
  "3g",
  "4g",
  "5g",
  "10g",
  "20g",
  "30g",
  "40g",
  "50g",
  "100g",
  "Other"
];

let frequencies=[
"Once a day",
"Twice a day",
"Three times a day",
"Four times a day",
"Every 4 hours",
"Every 6 hours",
"Every 8 hours",
"Every 12 hours",
"After every meal",
"Before every meal",
"Every night",
"Every morning",
"Every evening",
"Every afternoon",
"Every week",
"Every month",
"Every year",
"Other"
];

let durations=[
  "1 day",
  "2 days",
  "3 days",
  "4 days",
  "5 days",
  "6 days",
  "1 week",
  "2 weeks",
  "3 weeks",
  "4 weeks",
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "Other"

];
 
  function addTreatment() {
    const treatmentsDiv = document.getElementById('Treatment');
    let medNames = medicineList.map(medicine => `<option>${medicine}</option>`).join('\n');
    let frequenciesList = frequencies.map(frequency => `<option>${frequency}</option>`).join('\n');
    let dosagesList = dosages.map(dosage => `<option>${dosage}</option>`).join('\n');
    let durationsList = durations.map(duration => `<option>${duration}</option>`).join('\n');

    const newTreatmentDiv = document.createElement('div');
    newTreatmentDiv.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pl-6';
    newTreatmentDiv.innerHTML = `
    <div>
                        <label for="medicine" class="block text-sm font-medium text-gray-700">Medicine Name</label>
                        <select id="medicine" class="medicine h-10" onchange="showInputField(this, 'medicineInput${indexTreat}')"
                          class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                          ${medNames}
                          <!-- Add more options as needed -->
                        </select>

                        <input type="text" id="medicineInput${indexTreat}"
                          class="hidden  mt-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                      </div>
                      <div>
                        <label for="frequency" class="block text-sm font-medium text-gray-700">Frequency</label>
                        <select id="frequency" class="frequency  h-10" onchange="showInputField(this, 'frequencyInput${indexTreat}')"
                          class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                          ${frequenciesList}
                          <!-- Add more options as needed -->
                        </select>

                        <input type="text" id="frequencyInput${indexTreat}"
                          class="hidden  mt-2 h-10  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      </div>

                      <div>
                        <label for="dosage" class="block text-sm font-medium text-gray-700">Dosage</label>
                        <select id="dosage" class="dosage h-10" onchange="showInputField(this, 'dosageInput${indexTreat}')"
                          class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                          ${dosagesList}
                          <!-- Add more options as needed -->
                        </select>


                        <input type="text" id="dosageInput${indexTreat}"
                          class="hidden h-10 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                      </div>

                      <div>
                        <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
                        <select id="duration" class="duration h-10" onchange="showInputField(this, 'durationInput${indexTreat}')"
                          class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
                          ${durationsList}
                          <!-- Add more options as needed -->
                        </select>

                        <input type="text" id="durationInput${indexTreat}"
                          class="hidden  mt-2 h-10  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      </div>
    `;
    indexTreat=indexTreat+1;
    treatmentsDiv.appendChild(newTreatmentDiv);
  }



  function addDiagnosis() {
    const diagnosesDiv = document.getElementById('Diagnosis');
    let optionsHTML = diagnosesList.map(diagnosis => `<option>${diagnosis}</option>`).join('\n');
    const newDiagnosisDiv = document.createElement('div');
    newDiagnosisDiv.className="pl-6 pt-6 pr-6"
    newDiagnosisDiv.innerHTML = `
    <label for="diagnosis" class="block text-sm font-medium text-gray-700">Diagnosis</label>
    <select id="diagnosis" class="diagnosis h-10 w-full" onchange="showInputField(this, 'diagnosisInput${indexDiag}')"
      class="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-grab">
      ${optionsHTML}
      <!-- Add more options as needed -->
    </select>

    <input type="text" id="diagnosisInput${indexDiag}"
      class="hidden mt-2 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    `;
    indexDiag=indexDiag+1;
    diagnosesDiv.appendChild(newDiagnosisDiv);
  }
  addDiagnosis();
  addTreatment();

  function removeTreatment() {
    event.preventDefault();
    const treatmentsDiv = document.getElementById('Treatment');
    if (treatmentsDiv.children.length > 1) {
      treatmentsDiv.removeChild(treatmentsDiv.lastChild);
      indexTreat=indexTreat-1;
    }
  }
  
  function removeDiagnosis() {
    event.preventDefault();
    const diagnosesDiv = document.getElementById('Diagnosis');
    if (diagnosesDiv.children.length > 1) {
      diagnosesDiv.removeChild(diagnosesDiv.lastChild);
      indexDiag=indexDiag-1;
    }
  }


function confirmCancel(){
  fetch ("http://localhost:8008/cancel_appointment", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ appointmentId: getActiveAppointmentID() }),
  })
  .then((response) => response.json())
  .then((data) => {
  
    //todaysAppointments.push(oldAppointment);
    oldAppointment=null;
    setActiveAppointmentID(-1);
    updateAppointments();
    displayActiveAppointment();
    closeModal('cancelModal');
    getPatientInfo();
  })
}
let stars = document.querySelectorAll('.star');
let ratingValue = document.getElementById('ratingValue');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        // Set the color of the clicked star and all preceding stars to yellow
        for (let i = 0; i <= index; i++) {
            stars[i].classList.remove('text-gray-300');
            stars[i].classList.add('text-yellow-300');
        }

        // Set the color of all following stars to gray
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove('text-yellow-300');
            stars[i].classList.add('text-gray-300');
        }

        // Update the rating value
        ratingValue.value = index + 1;

    });
});

function submitAppointment(){
  const diagnosesDiv = document.getElementsByClassName('diagnosis');
  const medicineNames=document.getElementsByClassName('medicine');
  const frequencies=document.getElementsByClassName('frequency');
  const dosages=document.getElementsByClassName('dosage');
  const durations=document.getElementsByClassName('duration');
  let treatments = [];
  let diagnoses = [];
 for (let i=0;i<medicineNames.length;i++){
  let medicineName = medicineNames[i].value;
  if (medicineName === 'Other') {
    medicineName = document.getElementById('medicineInput' + i).value;
  }

  let frequency = frequencies[i].value;
if (frequency === 'Other') { 
  frequency = document.getElementById('frequencyInput' + i).value;
}

let dosage = dosages[i].value;
  if (dosage==='Other'){ 
    dosage = document.getElementById('dosageInput' + i).value;
  }

  let duration = durations[i].value;
  if (duration === 'Other') { 
    duration = document.getElementById('durationInput' + i).value;
  }

  treatments.push(medicineName+','+frequency+','+dosage+','+duration);
 }


 for (let i=0;i<diagnosesDiv.length;i++){
  let diagnosis = diagnosesDiv[i].value;
  if ( diagnosis === 'Other') {
    diagnosis = document.getElementById('diagnosisInput' + i).value;
  }
  diagnoses.push(diagnosis);
 }

  let rating=ratingValue.value;
  const notes = document.getElementById('notes').value;
  const appointmentId = getActiveAppointmentID();


  fetch ("http://localhost:8008/complete_appointment", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ appointmentId, diagnoses,treatments,notes,rating }),
  })
  .then((response) => response.json())
  .then((data) => {
    noneSelected();
    oldAppointment=null;
    setActiveAppointmentID(-1);
    localStorage.removeItem("activeAppointment")
    updateAppointments();
    displayActiveAppointment();
    closeModal('finalizeModal');
    getPatientInfo();
    noneSelected();
    location.reload();
  })
}
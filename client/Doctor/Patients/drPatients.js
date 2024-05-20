
startLoading();
fetch("http://localhost:8008/get_lifetime_doctor_patients", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        images=data.images;
        patients=data.patients;
        document.querySelector('#patientsTable').innerHTML = generatePatientTableRows(data.patients);
        stopLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    for (var i = 1, row; row = patientsTable.rows[i]; i++) {
      // Create a new cell
      var cell = row.insertCell(-1);
    
      // Create a new button
      var btn = document.createElement('button');
      btn.innerHTML = 'Details';
      btn.classList.add('details-button');
    
      // Add a click event listener to the button
      btn.addEventListener('click', function() {
        // Open the modal
        openModal('patientModal');
    
        // Fetch the patient details
        getPatientDetails(i - 1); // Subtract 1 if your table has a header row
      });
    
      // Append the button to the cell
      cell.appendChild(btn);
    }

let patients;
  
  // Function to generate table rows
  function generatePatientTableRows(data) {
    let rows = '';
    if (data === undefined || data.length === 0) {
      return `
        <tr class="border-b">
          <td class="p-4 align-middle text-center" colspan="4">No patients found</td>
        </tr>
      `;
    }
    for (let i = 0; i < data.length; i++) {
      let patient=data[i];
      console.log(patient);
      rows += `
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden lg:table-cell">${patient.patientId}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${patient.name}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">${patient.age}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden lg:table-cell">${patient.phoneNumber}</td>

          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <button class="view_btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" data-id="${i}" id="view${i}" onclick="openModal('patientInfoModal'); showPatientDetails(this);  getHistory(${i})">History</button>
          </td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <button class="view_btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" data-id="${i}" id="view${i}" onclick="openModal('imagesModal'); showPatientImages(this)">Images</button>
          </td>
        </tr>
      `;
    }
    //add event listener to the view button
    // document.querySelectorAll('.view_btn').forEach((button) => {
    // //get the id of the selected btn
    // const index = button.id;
    // console.log(index)
    // button.addEventListener('click', () => {
    //   showPatientDetails(button);
    // }
    // );
    
    // });
    
    return rows;
  }
  
  // Add the generated rows to the table
  document.querySelector('#patientsTable').innerHTML = generatePatientTableRows(patients);
  
  // Function to handle the View Profile button click
  function viewProfile(id) {
    // Replace with your own code to view the patient's profile
    console.log(`Viewing profile for patient with id ${id}`);
  }

  function startLoading() {
    document.getElementById('loading').style.display = 'flex';
  }
  
  function stopLoading() {
    document.getElementById('loading').style.display = 'none';
  }

  
  function searchPatients() {
    // Get the search term from the input field
    const searchTerm = document.querySelector('#searchInput').value.toLowerCase();
  
    // Filter the patients based on the search term
    const filteredPatients = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm) ||
      patient.address.toLowerCase().includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm) ||
     patient.phoneNumber.toLowerCase().includes(searchTerm) ||
     patient.age.toLowerCase().includes(searchTerm) ||
      patient.address.toLowerCase().includes(searchTerm)
    );
  
    // Update the patients table with the filtered patients
    document.querySelector('#patientsTable').innerHTML = generatePatientTableRows(filteredPatients);
  }

function showPatientImages(button){
  openModal('imagesModal');
  const index = button.getAttribute('data-id');
    let divv=document.getElementsByClassName('scrollable-panel');
    divv=divv[0];
    console.log(divv);
    divv.innerHTML='';
  // Get the appointment details using the index
  const patientImages = images[index];
  patientImages.forEach((image) => {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'image-container flex-shrink-0 w-64 px-2';

    let img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.className = 'w-full';
    console.log(image)
    let imageDescription = document.createElement('p');
    imageDescription.textContent = image.category;

    let imageDate = document.createElement('p');
    imageDate.textContent = image.date;

    imageContainer.appendChild(img);
    imageContainer.appendChild(imageDescription);
    imageContainer.appendChild(imageDate);

    divv.appendChild(imageContainer);
  });
  
  // Populate the form with the appointment details
  // document.getElementById('infoName').innerHTML = "Name: "+patient.name;
  // document.getElementById('infoAge').innerHTML = "Age: "+patient.age;
  // document.getElementById('infoGender').innerHTML = "Gender: "+ patient.gender;
}

  function showPatientDetails(button) {
    const index = button.getAttribute('data-id');
    
    // Get the appointment details using the index
    const patient = patients[index];
    console.log(patient)
    // Populate the form with the appointment details
    document.getElementById('infoName').innerHTML = "Name: "+patient.name;
    document.getElementById('infoAge').innerHTML = "Age: "+patient.age;
    document.getElementById('infoGender').innerHTML = "Gender: "+ patient.gender;
    document.getElementById('infoPhone').innerHTML = "Phone number: " +patient.phoneNumber;
    document.getElementById('infoEmail').innerHTML = "Email: " +patient.email;
    document.getElementById('infoAddress').innerHTML = "Address: " +patient.address;
  }


  
  //getPatientInfo();
  
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove('opacity-0', 'pointer-events-none');
    }
  
  
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add('opacity-0', 'pointer-events-none');
    }


  document.getElementById('sideOpenBtn').addEventListener('click', function() {
    document.getElementById('sidebar').style.transform = 'translateX(0)';
  });
  
  document.getElementById('sideCloseBtn').addEventListener('click', function() {
    document.getElementById('sidebar').style.transform = 'translateX(-100%)';
  });




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
            </div>
          <p class="mb-2">Date: ${history.date}</p>
          <p>
            Description: ${history.description}
          </p>
          
        </div>
        
      
      `
    );
  }
  
  
  //variables for the header of the history page
  const historyOpenBtn = document.querySelector("#historyOpenBtn");
  const historyNav = document.querySelector("#historyNav");
  const navBtns = document.querySelectorAll(".nav_btns");
  let historNavState = false;
  
  //variables for the medical history details Container
  const injuriesContainer = document.getElementById("injuries");
  const surgeriesContainer = document.getElementById("surgeries");
  const treatmentsContainer = document.getElementById("treatments");
  const familyContainer = document.getElementById("family");
  const medicationsContainer = document.getElementById("medications");
  const allergiesContainer = document.getElementById("allergies");
  const appointmentsContainer = document.getElementById("appointments");
  
  //Initially all containers are visible
  injuriesContainer.classList.remove("hidden");
  surgeriesContainer.classList.remove("hidden");
  treatmentsContainer.classList.remove("hidden");
  familyContainer.classList.remove("hidden");
  medicationsContainer.classList.remove("hidden");
  allergiesContainer.classList.remove("hidden");
  appointmentsContainer.classList.remove("hidden");
  
  //variables for the medical history details
  const injuriesDetails = document.getElementById("injuries_details");
  const surgeriesDetails = document.getElementById("surgeries_details");
  const treatmentsDetails = document.getElementById("treatments_details");
  const familyHistoryDetails = document.getElementById("family_details");
  const medicationsDetails = document.getElementById("medication_details");
  const allergiesDetails = document.getElementById("allergies_details");
  const appointmentsDetails = document.getElementById("appointments_details");
  //Initial medical history details
  let medicalHistory = [];
  
  //Event listeners for the medical history details in the header
  historyOpenBtn.addEventListener("click", () => {
    if (historNavState) {
      historyNav.classList.remove("opacity-100");
  
      historyNav.classList.add("opacity-0");
  
      historyNav.classList.add("pointer-events-none");
  
      historNavState = false;
    } else {
      historyNav.classList.remove("hidden");
      historyNav.classList.remove("opacity-0");
      historyNav.classList.remove("pointer-events-none");
  
      setTimeout(() => {
        historyNav.classList.add("opacity-100");
      }, 100);
      historNavState = true;
    }
  });
  
  //Event listener for the nav buttons to target the pressed btn and put white bg color
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((btn) => {
        btn.classList.remove(
          "underline",
          "decoration-[#22ffa3]",
          "decoration-[3px]",
          "underline-offset-[3px]"
        );
      });
      btn.classList.add(
        "underline",
        "decoration-[#22ffa3]",
        "decoration-[3px]",
        "underline-offset-[3px]"
      );
      const btnID = btn.id;
  
      if (btnID === "allBtn") {
        injuriesContainer.classList.remove("hidden");
        surgeriesContainer.classList.remove("hidden");
        treatmentsContainer.classList.remove("hidden");
        familyContainer.classList.remove("hidden");
        medicationsContainer.classList.remove("hidden");
        allergiesContainer.classList.remove("hidden");
        appointmentsContainer.classList.remove("hidden");
        familyContainer.parentElement.classList.add("md:grid-cols-2", "gap-4");
        allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
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
          const appointments = medicalHistory
          .filter((history) => history.historyType === "appointment")
          .reverse()
          .slice(0, 2); // Limit to 2 items
        injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
        surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
        treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
        familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
        medicationsDetails.innerHTML = getMedicalHistory(medications, true);
        appointmentsDetails.innerHTML = getMedicalHistory(appointments, true);
  
        allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
      }
      if (btnID === "injuriesBtn") {
        injuriesContainer.classList.remove("hidden");
        surgeriesContainer.classList.add("hidden");
        treatmentsContainer.classList.add("hidden");
        familyContainer.classList.add("hidden");
        medicationsContainer.classList.add("hidden");
        allergiesContainer.classList.add("hidden");
        appointmentsContainer.classList.add("hidden");
        allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
        const injuriesHistory = medicalHistory
          .filter((history) => history.historyType === "Injuries")
          .reverse();
        injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
        familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
      }
      if (btnID === "surgeriesBtn") {
        injuriesContainer.classList.add("hidden");
        surgeriesContainer.classList.remove("hidden");
        treatmentsContainer.classList.add("hidden");
        familyContainer.classList.add("hidden");
        medicationsContainer.classList.add("hidden");
        allergiesContainer.classList.add("hidden");
        appointmentsContainer.classList.add("hidden");
        allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
        const surgeriesHistory = medicalHistory
          .filter((history) => history.historyType === "Surgeries")
          .reverse();
        surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
  
        familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
      }
      if (btnID === "treatmentsBtn") {
        injuriesContainer.classList.add("hidden");
        surgeriesContainer.classList.add("hidden");
        treatmentsContainer.classList.remove("hidden");
        familyContainer.classList.add("hidden");
        medicationsContainer.classList.add("hidden");
        allergiesContainer.classList.add("hidden");
        appointmentsContainer.classList.add("hidden");
        allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
        const treatmentsHistory = medicalHistory
          .filter((history) => history.historyType === "Treatments")
          .reverse();
        treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
        familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
      }
      if (btnID === "familyBtn") {
        injuriesContainer.classList.add("hidden");
        surgeriesContainer.classList.add("hidden");
        treatmentsContainer.classList.add("hidden");
        familyContainer.classList.remove("hidden");
        medicationsContainer.classList.add("hidden");
        allergiesContainer.classList.add("hidden");
        appointmentsContainer.classList.add("hidden");
        allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
        const familyHistory = medicalHistory
          .filter((history) => history.historyType === "Family Afflictions")
          .reverse();
        familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
        familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
      }
      if (btnID === "medicationBtn") {
        injuriesContainer.classList.add("hidden");
        surgeriesContainer.classList.add("hidden");
        treatmentsContainer.classList.add("hidden");
        familyContainer.classList.add("hidden");
        medicationsContainer.classList.remove("hidden");
        allergiesContainer.classList.add("hidden");
        appointmentsContainer.classList.add("hidden");
        medicationsContainer.parentElement.classList.remove(
          "md:grid-cols-2",
          "gap-2"
        );
        const medications = medicalHistory
          .filter((history) => history.historyType === "Medications")
          .reverse();
        medicationsDetails.innerHTML = getMedicalHistory(medications, true);
      }
      if (btnID === "allergiesBtn") {
        injuriesContainer.classList.add("hidden");
        surgeriesContainer.classList.add("hidden");
        treatmentsContainer.classList.add("hidden");
        familyContainer.classList.add("hidden");
        medicationsContainer.classList.add("hidden");
        allergiesContainer.classList.remove("hidden");
        appointmentsContainer.classList.add("hidden");
        allergiesContainer.parentElement.classList.remove(
          "md:grid-cols-2",
          "gap-2"
        );
        const allergies = medicalHistory
          .filter((history) => history.historyType === "Allergies")
          .reverse();
        allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
      }
      if (btnID === "appointmentBtn") {
        injuriesContainer.classList.add("hidden");
        surgeriesContainer.classList.add("hidden");
        treatmentsContainer.classList.add("hidden");
        familyContainer.classList.add("hidden");
        medicationsContainer.classList.add("hidden");
        allergiesContainer.classList.add("hidden");
        appointmentsContainer.classList.remove("hidden");
        const appointments = medicalHistory
        .filter((history) => history.historyType === "appointment")
        .reverse()
  
        appointmentsDetails.innerHTML = getMedicalHistory(appointments, true);
  
      }
      document.querySelectorAll("button").forEach(function (button) {
    
      });
    });
  });
  
  async function getHistory(index) {
    injuriesDetails.innerHTML = getMedicalHistory([], false);
    surgeriesDetails.innerHTML = getMedicalHistory([], false);
    treatmentsDetails.innerHTML = getMedicalHistory([], false);
    familyHistoryDetails.innerHTML = getMedicalHistory([], false);
    medicationsDetails.innerHTML = getMedicalHistory([], false);
    allergiesDetails.innerHTML = getMedicalHistory([], false);
    appointmentsDetails.innerHTML = getMedicalHistory([], false);
    try {
      const response = await fetch("http://localhost:8008/get_lifetime_doctor_patients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(index)
      console.log(data.medical_history[index])
      medicalHistory=[];
      medicalHistory.push(...data.medical_history[index]);
      console.log(medicalHistory);
    } catch (error) {
      console.log(error);
    }
    // Filter the medical history details based on the type of history
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
          const appointments = medicalHistory
      .filter((history) => history.historyType === "appointment")
      .reverse()
      .slice(0, 2); // Limit to 2 items
    injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
    surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
    treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
    familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
    medicationsDetails.innerHTML = getMedicalHistory(medications, true);
    allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
      appointmentsDetails.innerHTML = getMedicalHistory(appointments, true);
  
    
  }
  
  // getHistory();
  
  
  // file 1 done
  
  
  
  
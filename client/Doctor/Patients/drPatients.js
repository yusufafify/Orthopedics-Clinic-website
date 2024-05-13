
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
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${patient.name}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${patient.age}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${patient.upcomingAppointment}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <button data-id="${i}" onclick="openModal('patientInfoModal'); showPatientDetails(this)">View Details</button>
          </td>
        </tr>
      `;
    }
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
     
      patient.address.toLowerCase().includes(searchTerm)
    );
  
    // Update the patients table with the filtered patients
    document.querySelector('#patientsTable').innerHTML = generatePatientTableRows(filteredPatients);
  }



  function showPatientDetails(button) {
    const index = button.getAttribute('data-id');
    
    // Get the appointment details using the index
    const patient = patients[index];
    
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

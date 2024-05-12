// Dummy data
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
    for (let patient of data) {
      rows += `
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${patient.name}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${patient.age}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${patient.upcomingAppointment}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <button onclick="viewProfile(${patient.id})">View Profile</button>
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
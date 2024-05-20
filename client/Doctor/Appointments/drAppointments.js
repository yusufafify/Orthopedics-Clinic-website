// Dummy data
let appointments;
let nDiagnosis;
let nTreatments;
let diagnosisSlot;
let treatmentsSlot;

startLoading();
fetch("http://localhost:8008/all_appointments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
      appointments=data;
      document.querySelector('#appointmentsTable').innerHTML = generateTableRows(appointments);
      stopLoading();
    })
    .catch((error) => {
      console.error("Error:");
    });


  
  // Function to generate table rows
  function generateTableRows(data) {
    let rows = '';
    if (data === undefined || data.length === 0) {
      return `
        <tr class="border-b">
          <td class="p-4 align-middle text-center" colspan="6">No appointments found</td>
        </tr>
      `;
    }
    for (let i = 0; i < data.length; i++) {
      let appointment = data[i];
      rows += `
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden lg:table-cell font-medium">${appointment.appointmentID}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${appointment.patientName}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden lg:table-cell">${appointment.date}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden lg:table-cell">${appointment.type}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">${appointment.status}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" data-id="${i}" onclick="openModal('appointmentModal'); showAppointmentDetails(this)">View</button>
          </td>
        </tr>
      `;
    }
    
    return rows;
  }
  
  document.getElementById('sideOpenBtn').addEventListener('click', function() {
    document.getElementById('sidebar').style.transform = 'translateX(0)';
  });
  
  document.getElementById('sideCloseBtn').addEventListener('click', function() {
    document.getElementById('sidebar').style.transform = 'translateX(-100%)';
  });

  // Add the generated rows to the table

  function startLoading() {
    document.getElementById('loading').style.display = 'flex';
  }
  
  function stopLoading() {
    document.getElementById('loading').style.display = 'none';
  }
 
  function searchInput() {
    // Get the search term from the input field
    const searchTerm = document.getElementById('searchValue').value.toLowerCase();

    // Filter the appointments based on the search term
    const filteredAppointments = appointments.filter(appointment => 
      appointment.patientName.toLowerCase().includes(searchTerm) ||
      appointment.date.toLowerCase().includes(searchTerm) ||
      appointment.paymentMethod.toLowerCase().includes(searchTerm) ||
      appointment.status.toLowerCase().includes(searchTerm) ||
      appointment.type.toLowerCase().includes(searchTerm)
    );
  
    // Update the appointments table with the filtered appointments
    document.querySelector('#appointmentsTable').innerHTML = generateTableRows(filteredAppointments);
  }

  function showAppointmentDetails(button) {
    const index = button.getAttribute('data-id');
    
    // Get the appointment details using the index
    const appointment = appointments[index];
    console.log(appointment);
    console.log(appointment.diagnosis.length);
    nDiagnosis= appointment.diagnosis.length;
    nTreatments=appointment.treatment.length;

    // Populate the form with the appointment details
    document.querySelector('#appointmentID').value = appointment.appointmentID;
    document.querySelector('#date').value = appointment.date;
    document.querySelector('#patientName').value = appointment.patientName;
    document.querySelector('#paymentMethod').value = appointment.paymentMethod;
    document.querySelector('#doctorNotes').value = appointment.doctorNotes;
    document.querySelector('#type').value = appointment.type;
    document.querySelector('#status').value = appointment.status;
    diagnosisSlot=document.querySelector('#diagnoses');
    treatmentsSlot=document.querySelector('#treatments');
    for (let i=1; i<nDiagnosis; i++){
      diagnosisSlot.insertAdjacentHTML('afterbegin',` <label for="diagnosis" class="block mb-2">Diagnosis</label>
      <input type="text" id="diagnosis${i}" name="diagnosis" class="w-full p-2 border border-gray-300 rounded">`);
    }
    for (let i=1; i<nTreatments; i++){
      treatmentsSlot.insertAdjacentHTML('afterbegin',` <label for="treatment" class="block mb-2">Treatment</label>
      <input type="text" id="treatment${i}" name="treatment" class="w-full p-2 border border-gray-300 rounded">`);
    }
    
    for (let i=0;i<nDiagnosis;i++){
      console.log(appointment.diagnosis[i])
      //Write this function so that it takes every instance of diagnosis, and adds a space after every , and adds it to the input fields
      document.querySelector(`#diagnosis${i}`).value=appointment.diagnosis[i];
    }
    for (let i=0;i<nTreatments;i++){
//Take every treatment, add a space after every ',' and display it on treatment
appointment.treatment[i].replace(/,/g,', ')
      document.querySelector(`#treatment${i}`).value=appointment.treatment[i].replace(/,/g,', ');
      
    }
    // Show the modal
    document.querySelector('#appointmentModal').style.display = 'block';
  }
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove('opacity-0', 'pointer-events-none');
    }
  
  
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    nDiagnosis=0;
nTreatments=0;
diagnosisSlot.innerHTML=`<label for="diagnosis" class="block mb-2">Diagnosis</label>
<input type="text" id="diagnosis0" name="diagnosis" class="w-full p-2 border border-gray-300 rounded">`;
treatmentsSlot.innerHTML=` <label for="treatment" class="block mb-2">Treatment</label>
<input type="text" id="treatment0" name="treatment" class="w-full p-2 border border-gray-300 rounded">`;
    modal.classList.add('opacity-0', 'pointer-events-none');
    }
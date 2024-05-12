// Dummy data
let appointments;
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
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${appointment.appointmentID}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${appointment.patientName}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.date}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.type}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">${appointment.status}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <button data-id="${i}" onclick="openModal('appointmentModal'); showAppointmentDetails(this)">View Details</button>
          </td>
        </tr>
      `;
    }
    
    return rows;
  }
  


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
    
    // Populate the form with the appointment details
    document.querySelector('#appointmentID').value = appointment.appointmentID;
    document.querySelector('#date').value = appointment.date;
    document.querySelector('#patientName').value = appointment.patientName;
    document.querySelector('#paymentMethod').value = appointment.paymentMethod;
    document.querySelector('#doctorNotes').value = appointment.doctorNotes;
    document.querySelector('#type').value = appointment.type;
    document.querySelector('#status').value = appointment.status;
    
    // Show the modal
    console.log(document.querySelector('#appointmentModal'));
    document.querySelector('#appointmentModal').style.display = 'block';
  }
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove('opacity-0', 'pointer-events-none');
    }
  
  
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add('opacity-0', 'pointer-events-none');
    }

  function editAppointment() {
    // Get the updated appointment details from the form
    const appointmentID = document.querySelector('#appointmentID').value;
    const patientName = document.querySelector('#patientName').value;
    const date = document.querySelector('#date').value;
    const type = document.querySelector('#type').value;
    const status = document.querySelector('#status').value;
    
    // Update the appointment in the database
    // ...
    
    // Hide the modal
    document.querySelector('#appointmentModal').style.display = 'none';
  }
  
  function deleteAppointment() {
    // Get the appointment ID from the form
    const appointmentID = document.querySelector('#appointmentID').value;
    
    // Delete the appointment from the database
    // ...
    
    // Hide the modal
    document.querySelector('#appointmentModal').style.display = 'none';
  }
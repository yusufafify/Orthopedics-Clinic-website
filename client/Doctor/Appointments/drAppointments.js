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
    for (let appointment of data) {
      rows += `
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${appointment.appointmentID}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${appointment.patientName}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.date}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.paymentMethod}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">${appointment.status}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <!-- Add action buttons here -->
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
      appointment.status.toLowerCase().includes(searchTerm)
    );
  
    // Update the appointments table with the filtered appointments
    document.querySelector('#appointmentsTable').innerHTML = generateTableRows(filteredAppointments);
  }

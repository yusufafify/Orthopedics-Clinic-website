// Dummy data
const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      upcomingAppointment: '2022-01-01'
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 28,
      upcomingAppointment: '2022-01-02'
    },
    // Add more patients as needed
  ];
  
  // Function to generate table rows
  function generatePatientTableRows(data) {
    let rows = '';
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
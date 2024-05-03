// Dummy data
const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      date: '2022-01-01',
      time: '10:00 AM',
      status: 'Booked'
    },
    {
      id: 2,
      patientName: 'Jane Doe',
      doctorName: 'Dr. Johnson',
      date: '2022-01-02',
      time: '11:00 AM',
      status: 'Booked'
    },
    // Add more appointments as needed
  ];
  
  // Function to generate table rows
  function generateTableRows(data) {
    let rows = '';
    for (let appointment of data) {
      rows += `
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${appointment.id}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">${appointment.patientName}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.date}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">${appointment.time}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">${appointment.status}</td>
          <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            <!-- Add action buttons here -->
          </td>
        </tr>
      `;
    }
    console.log(rows);
    return rows;
  }
  
  // Add the generated rows to the table
  document.querySelector('#appointmentsTable').innerHTML = generateTableRows(appointments);



  //DATA received in this format
  const sampleData = [
    { id: 1, name: "Alice Smith", email: "pat@gmail.com", phone:"01212342134 ", nextAppointment: "2025-10-12"},
    { id: 2, name: "Bob Johnson", email: "pat2@gmail.com", phone:"01212336434 ", nextAppointment: "2024-05-25"},
    { id: 3, name: "Carol Williams", email: "pat3@3gmail.com", phone:"01254342134 ", nextAppointment: "2024-06-20" },
    
];

// fetch("http://localhost:8080/personal_data", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//     },
// })
// .then((response) => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .then((data) => {
    
    const data = sampleData; // Use the sample data array
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Clear existing data in table body
    tableBody.innerHTML = ' ';
  

    // Loop through each item in the data array
    data.forEach(item => {
        // Create a new row and cells for each data element
        const row = tableBody.insertRow();
        row.className = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';

        const idCell = row.insertCell();
        idCell.className = "p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium"

        const nameCell = row.insertCell();
        nameCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

        const emailCell = row.insertCell();
        emailCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

        const phoneCell = row.insertCell();
        phoneCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

        const nextAppointmentCell = row.insertCell();
        nextAppointmentCell.className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"

        const editCell = row.insertCell();
        editCell.className="p-4 font-bold  hover:text-gray-500 align-middle [&amp;:has([role=checkbox])]:pr-0"

        
        // Add text to the cells
        idCell.textContent = item.id;
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        phoneCell.textContent = item.phone;
        nextAppointmentCell.textContent = item.nextAppointment;

        const editBtn = document.createElement("button");
        editBtn.textContent = "\u2026";
        editBtn.className = "edit-btn";
        editBtn.onclick = function() {
        openModal(item); // Function to open modal and pass current item
    };
        editCell.appendChild(editBtn);

       
    });
// })
// .catch((error) => {
//     console.error("Error:", error.message);
//     alert('Failed to fetch data: ' + error.message);
// });


function openModal(item) {
    const dialog = document.querySelector('[data-dialog="dialog"]');
    const dialogBackdrop = document.querySelector('[data-dialog-backdrop="dialog"]');
  
    // Example of setting up the content dynamically
    // You need to have elements inside your modal to hold these values
    dialog.querySelector('#modalName').value = item.name;
    dialog.querySelector('#modalEmail').value = item.email;
    dialog.querySelector('#modalPhone').value = item.phone;
    dialog.querySelector('#modalNextApp').value = item.nextAppointment;
   

  
    // Show the dialog
    dialogBackdrop.style.opacity = '1';
    dialogBackdrop.classList.remove('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const closeButtons = document.querySelectorAll('[data-dialog-close="true"]');
    const dialogBackdrop = document.querySelector('[data-dialog-backdrop="dialog"]');
  
    // Function to close dialog
    closeButtons.forEach(button => {
      button.addEventListener('click', function () {
        dialogBackdrop.style.opacity = '0';
        setTimeout(() => dialogBackdrop.classList.add('hidden'), 300); // Ensure opacity transition completes
      });
    });
  });



  

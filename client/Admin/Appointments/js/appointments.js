


  //DATA received in this format
    // const sampleData = [
    //     { id: '1', name: "Alice Smith",doctor:" Ahmed" ,date: "20-4-2024", time:"22:30 ", status: "Paid"  },
    //     { id: '2', name: "Bob Johnson",doctor:" Mohamed" ,date: "21-4-2024", time:"20:30 ", status: "Paid" },
    //     { id: '3', name: "Carol Williams", doctor:" Ahmed",date: "20-3-2024", time:"21:30 ", status: "Paid" },
        
    // ];

const searchInput = document.getElementById('search');

let appointmentsData = []; // Define this globally to store the fetched data

fetch("http://localhost:8008/get_appointments", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
})
.then((response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then((data) => {
    appointmentsData = data; // Store the fetched data globally
    renderTable(appointmentsData); // Render the initial table
})
.catch((error) => {
    console.error("Error:", error.message);
    alert('Failed to fetch data: ' + error.message);
});



function openModal(item) {
    const dialog = document.querySelector('[data-dialog="dialog"]');
    const dialogBackdrop = document.querySelector('[data-dialog-backdrop="dialog"]');
  
    // Example of setting up the content dynamically
    // You need to have elements inside your modal to hold these values
    dialog.querySelector('#modalName').value = item.patientName;
    dialog.querySelector('#modalDate').value = item.date;
    dialog.querySelector('#modalTime').value = item.time;
    dialog.querySelector('#modalStatus').value = item.paymentMethod;


    // Store the appointment ID in the delete button
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.dataset.appointmentId = item.AppointmentId;  // Using data attributes to store the appointment ID
  
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




  
// Function for search bar filtering
function renderTable(filteredData) {
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear the table first

  filteredData.forEach(item => {
      const row = tableBody.insertRow();
      row.className = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';

      // Creating cells as per your existing setup
      const cells = ['AppointmentId', 'patientName', 'doctorName', 'date', 'time', 'paymentMethod'].map(key => {
          const cell = row.insertCell();
          cell.textContent = item[key];
          if (key === 'AppointmentId') {
            cell.className = "p-4 font-bold  align-middle"; // Change styles here for DoctorId
        } else {
            cell.className = "p-4  align-middle [&amp;:has([role=checkbox])]:pr-0";
        }          return cell;
      });

      const editCell = row.insertCell();
      editCell.className = "p-4 font-bold  hover:text-gray-500 align-middle [&amp;:has([role=checkbox])]:pr-0";
      const editBtn = document.createElement("button");
      editBtn.textContent = "...";
      editBtn.onclick = function() {
          openModal(item);
      };
      editCell.appendChild(editBtn);
  });
}







// Event listener for the search bar input
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (!searchText) {
      renderTable(appointmentsData); // If no input, show all data
      return;
  }

  // Filter data based on ID or name match (case insensitive)
  console.log(appointmentsData[0].patientName)
  const filteredData = appointmentsData.filter(item => 
      item.AppointmentId.toLowerCase().includes(searchText) || 
      item.patientName.toLowerCase().includes(searchText)
  );
  renderTable(filteredData);
});


//Delete Appointment Event listener
document.getElementById('deleteBtn').addEventListener('click', function () {
  const appointmentId = this.dataset.appointmentId; // Retrieve the stored appointment ID
  deleteAppointment(appointmentId);
});

async function deleteAppointment(appointmentId) {
  console.log('Deleting appointment ID:', appointmentId);


try{
  const response = await fetch(
        "http://localhost:8008/add_to_medical_history",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({id: appointmentId}),
        }
      );
      const data = await response.json();
      console.log(data);
      window.location.reload();

      
}
catch (error) {
    console.log(error);
   }


  
}


//Edit Appointment EVENT listner
const submitBtn = document.getElementById('confirmEditbtn');


document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action (form submission in this case)

        // Fetch all inputs
        //const name = document.getElementById('modalName').value.trim();
        //const email = document.getElementById('modalEmail').value.trim();
        //const password = document.getElementById('password').value.trim();
        //const age = document.getElementById('age').value.trim();
        //const role = document.querySelector('input[name="role"]:checked');
        //const gender = document.querySelector('input[name="gender"]:checked');
        //const address = document.getElementById('address').value.trim();
        const appDate = document.getElementById('modalDate').value.trim();
        const appTime = document.getElementById('modalTime').value.trim();
        const paymentMethod = document.getElementById('modalStatus').value.trim();
        //const workinghours = document.getElementById('working-hours').value.trim();

        // Validate all required inputs
        if (!appDate || !appTime || !paymentMethod) {
            alert("Please fill in all required fields.");
            return; // Stop the function if validation fails
        }

        // Prepare data object with validated values
        const AppointmentData = {
           appDate,
           appTime,
           paymentMethod
        };

        console.log(AppointmentData);
        //UpdateAppointmentForm(employeeData);  // Call the function to submit data
    });
});




async function UpdateAppointmentForm(AppointmentData) {
    try {
      const response = await fetch(
        "http://localhost:8008/create_employee",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(AppointmentData),
        }
      );
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }



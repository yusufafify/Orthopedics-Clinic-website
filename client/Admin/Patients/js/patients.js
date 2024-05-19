


  //DATA received in this format
//   const sampleData = [
//     { id: '1', name: "Alice Smith", email: "pat@gmail.com", phone:"01212342134 ", nextAppointment: "2025-10-12"},
//     { id: '2', name: "Bob Johnson", email: "pat2@gmail.com", phone:"01212336434 ", nextAppointment: "2024-05-25"},
//     { id: '3', name: "Carol Williams", email: "pat3@3gmail.com", phone:"01254342134 ", nextAppointment: "2024-06-20" },
    
// ];
const searchInput = document.getElementById('search');

let patientData = [];
fetch("http://localhost:8008/get_patients", {
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
    
    patientData = data;
    console.log(patientData);
    renderTable(patientData);
   
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
    dialog.querySelector('#modalEmail').value = item.patientEmail;
    dialog.querySelector('#modalPhone').value = item.patientPhone;

    //const appointmentDate = new Date(item.time).toISOString().split('T')[0];
    //dialog.querySelector('#modalNextApp').value = item.time;
    


     // Store the patient Email in the delete button
     const deleteBtn = document.getElementById('deleteBtn');
     deleteBtn.dataset.patientEmail = item.patientEmail;  // Using data attributes to store the appointment ID
   
     // STore the PatientID in the edit button
     const submitBtn = document.getElementById('confirmEditbtn');
     submitBtn.dataset.patient_id = item.PatientId;


  
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
      const cells = ['PatientId', 'patientName','patientEmail', 'patientPhone'].map(key => {
        const cell = row.insertCell();
          cell.textContent = item[key];
          if (key === 'PatientId') {
            cell.className = "p-4 font-bold align-middle"; // Change styles here for DoctorId
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
      renderTable(patientData); // If no input, show all data
      return;
  }

  // Filter data based on ID or name match (case insensitive)
 
  const filteredData = patientData.filter(item => 
      item.PatientId.toLowerCase().includes(searchText) ||
      String(item.patientName).toLowerCase().includes(searchText)

  );

  
  renderTable(filteredData);
});


//Delete Patient Event listener
document.getElementById('deleteBtn').addEventListener('click', function () {
  const patientEmail = this.dataset.patientEmail; // Retrieve the stored appointment ID
  deleteAppointment(patientEmail);
});

async function deleteAppointment(patientEmail) {
  console.log('Deleting Patient Email:', patientEmail);

try{
  const response = await fetch(
        "http://localhost:8008/delete_user",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({email: patientEmail}),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Patient is Deleted",
        text: "",
        timer: 1500,
        showConfirmButton: false,
      })
      setTimeout(() => {
        window.location.reload();
    }, 1500);

      
}
catch (error) {
    console.log(error);
   }

  // try {
  //   const response = await fetch(
  //     "http://localhost:8008/add_to_medical_history",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: Bearer ${localStorage.getItem("token")},
  //       },
  //       body: JSON.stringify(historyForm),
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   window.location.reload();
  // } catch (error) {
  //   console.log(error);
  // }
}




//Edit Patient Event listener


const submitBtn = document.getElementById('confirmEditbtn');


document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById('confirmEditbtn');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action (form submission in this case)

        // Fetch all inputs
        const name = document.getElementById('modalName').value.trim();
        const email = document.getElementById('modalEmail').value.trim();
        //const password = document.getElementById('password').value.trim();
        //const age = document.getElementById('age').value.trim();
        //const role = document.querySelector('input[name="role"]:checked');
        //const gender = document.querySelector('input[name="gender"]:checked');
        //const address = document.getElementById('address').value.trim();
        //const nextApp = document.getElementById('modalNextApp').value.trim();
        const phone = document.getElementById('modalPhone').value.trim();
        //const salary = document.getElementById('salary').value.trim();
        //const workinghours = document.getElementById('working-hours').value.trim();

        const patient_id = this.dataset.patient_id;
        if (!validatePhone(phone))
          {
            Swal.fire({
              icon: "error",
              title: "Incorrect Phone Number Format",
              text: "",
              timer: 2000,
              showConfirmButton: false,
            })
            return; 
          }
        // Validate all required inputs
        if (!name || !email || !phone ) {
          Swal.fire({
            icon: "error",
            title: "Please fill in all required fields.",
            text: "",
            timer: 2000,
            showConfirmButton: false,
          })
            return; // Stop the function if validation fails
        }

        // Prepare data object with validated values
        const patientData = {
            patient_id,
            name,
            email,
            phone,
           
        };

        console.log(patientData);
        //UpdatePatientForm(employeeData);  // Call the function to submit data
    });
});




async function UpdatePatientForm(patientData) {
    try {
      const response = await fetch(
        "http://localhost:8008/create_employee",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(patientData),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Patient Updated ",
        text: "",
        timer: 1500,
        showConfirmButton: false,
      })
      setTimeout(() => {
        window.location.reload();
    }, 1500);
    } catch (error) {
      console.log(error);
    }
  }


  //Validate phone
  function validatePhone(phone) {
    // Assuming Egyptian phone number format is XXXX-XXX-XXXX where X is a digit
    const phonePattern = /^\d{4}\d{3}\d{4}$/;
    return phonePattern.test(phone);
  }
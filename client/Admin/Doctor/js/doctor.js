


  //DATA received in this format
    // const sampleData = [
    //     { id: '1', name: "Alice Smith", email: "doc@gmail.com", phone:"01212342134 ", workingHours: "8-3", salary: "10000"},
    //     { id: '2', name: "Bob Johnson", email: "doc2@gmail.com", phone:"01212336434 ", workingHours: "9-3", salary: "10000"},
    //     { id: '3', name: "Carol Williams", email: "doc@3gmail.com", phone:"01254342134 ", workingHours: "8-2",salary: "10000" },
        
    // ];

    const searchInput = document.getElementById('search');

    let doctorData = []; // Define this globally to store the fetched data


    fetch("http://localhost:8008/get_doctors", {
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
        doctorData = data; // Store the fetched data globally
        renderTable(doctorData); // Render the initial table
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
        dialog.querySelector('#modalName').value = item.DoctorName;
        dialog.querySelector('#modalEmail').value = item.DoctorEmail;
        dialog.querySelector('#modalPhone').value = item.DoctorPhone;
        dialog.querySelector('#modalWork').value = item.workingHours;
        dialog.querySelector('#modalSalary').value = item.salary;

        
        // Store the Doctor Email in the delete button
         const deleteBtn = document.getElementById('deleteBtn');
         deleteBtn.dataset.DoctorEmail = item.DoctorEmail;  // Using data attributes to store the appointment ID
  


         // STore the PatientID in the edit button
         const submitBtn = document.getElementById('confirmEditbtn');
         submitBtn.dataset.DoctorId = item.DoctorId;

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
    




        function renderTable(filteredData) {
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear the table first
          
            filteredData.forEach(item => {
                const row = tableBody.insertRow();
                row.className = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';
          
                // Creating cells as per your existing setup
                const cells = ['DoctorId', 'DoctorName', 'DoctorEmail', 'DoctorPhone', 'workingHours'].map(key => {
                    const cell = row.insertCell();
                    cell.textContent = item[key];
                    if (key === 'DoctorId') {
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
        renderTable(doctorData); // If no input, show all data
        return;
    }
  
    // Filter data based on ID or name match (case insensitive)
    const filteredData = doctorData.filter(item => 
        item.DoctorId.toLowerCase().includes(searchText) || 
        String(item.DoctorName).toLowerCase().includes(searchText)
    );
    renderTable(filteredData);
  });




  //Delete Doctor Event listener
document.getElementById('deleteBtn').addEventListener('click', function () {
    const DoctorEmail = this.dataset.DoctorEmail; // Retrieve the stored appointment ID
    deleteAppointment(DoctorEmail);
  });
  
async function deleteAppointment(DoctorEmail) {
    console.log('Deleting Doctor Email:', DoctorEmail);
    
   

try{
  const response = await fetch(
        "http://localhost:8008/delete_user",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({email: DoctorEmail}),
        }
      );
      Swal.fire({
        icon: "success",
        title: "Doctor Is Deleted",
        text: "",
        timer: 3500,
        showConfirmButton: false,
      })
      const data = await response.json();
      console.log(data);

      setTimeout(() => {
        window.location.reload();
    }, 1500);

      
}
catch (error) {
    console.log(error);
   }
    
  }


  //Edit Patient Event listener

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
        const salary = document.getElementById('modalSalary').value.trim();
        const working_hours = document.getElementById('modalWork').value.trim();
        
        const _id=this.dataset.DoctorId;
        // Validate all required inputs
        if (!name || !email || !salary || !working_hours || !phone) {
            alert("Please fill in all required fields.");
            return; // Stop the function if validation fails
        }

        // Prepare data object with validated values
        const employeeData = {
            _id,
            name,
            email,
            phone,
            salary,
            working_hours
        };

        console.log(employeeData);
        Swal.fire({
          icon: "success",
          title: "Doctor Is Edited",
          text: "",
          timer: 1500,
          showConfirmButton: false,
        })
        UpdateDoctorForm(employeeData);  // Call the function to submit data
    });
});




async function UpdateDoctorForm(employeeData) {
    try {
      const response = await fetch(
        "http://localhost:8008/edit_doctor",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(employeeData),
        }
      );
      const data = await response.json();
      console.log(data);
      
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
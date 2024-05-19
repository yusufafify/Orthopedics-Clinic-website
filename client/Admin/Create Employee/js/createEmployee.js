const submitBtn = document.getElementById('submitBtn');


document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action (form submission in this case)

        // Fetch all inputs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const age = document.getElementById('age').value.trim();
        const role = document.querySelector('input[name="role"]:checked');
        const gender = document.querySelector('input[name="gender"]:checked');
        const address = document.getElementById('address').value.trim();
        const ssn = document.getElementById('ssn').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const salary = document.getElementById('salary').value.trim();
        const workinghours = document.getElementById('working-hours').value.trim();
        console.log(workinghours)
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

        if(!validateSSN(ssn))
        {
         
          Swal.fire({
            icon: "error",
            title: "Incorrect SSN Format",
            text: "",
            timer: 2000,
            showConfirmButton: false,
          })
          return; 
        }
        // Validate all required inputs
        if (!name || !email || !password || !age || !role || !gender || !address || !ssn || !phone || !salary || !workinghours) {
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
        const employeeData = {
            name,
            email,
            password,
            age,
            role: role.value, // Access value here, after ensuring the role is selected
            gender: gender.value, // Access value here, after ensuring the gender is selected
            address,
            ssn,
            phone,
            salary,
            workinghours
        };

        console.log(employeeData);
        
        postEmployeeForm(employeeData);  // Call the function to submit data

    });
});




async function postEmployeeForm(employeeData) {
    try {
      const response = await fetch(
        "http://localhost:8008/create_employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(employeeData),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Employee is Created",
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
  



  // Validation function for Egyptian phone number
function validatePhone(phone) {
  // Assuming Egyptian phone number format is XXXX-XXX-XXXX where X is a digit
  const phonePattern = /^\d{4}\d{3}\d{4}$/;
  return phonePattern.test(phone);
}

//SSN validation
function validateSSN(ssn) {
  // Check if the input is exactly 14 characters long
  if (ssn.length !== 14) {
      return false;
  }
  
  // Check if all characters are digits
  const digitPattern = /^\d{14}$/;
  return digitPattern.test(ssn);
}


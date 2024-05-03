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

        // Validate all required inputs
        if (!name || !email || !password || !age || !role || !gender || !address || !ssn || !phone || !salary || !workinghours) {
            alert("Please fill in all required fields.");
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  



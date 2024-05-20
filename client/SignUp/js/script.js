
let selectedGender = document.querySelector('input[name="gender"]').value;
console.log(selectedGender);

// Validation function for email
function validateEmail(email) {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return emailPattern.test(email);
}

// Add an event listener to all radio buttons with name "gender"
document.querySelectorAll('input[name="gender"]').forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    // Check if the radio button is checked
    if (this.checked) {
      // Get the value of the checked radio button
      selectedGender = this.value;
      console.log("Selected gender:", selectedGender);
    }
  });
});

// Validation function for Egyptian phone number
function validatePhone(phone) {
  // Assuming Egyptian phone number format is XXXX-XXX-XXXX where X is a digit
  const phonePattern = /^\d{4}\d{3}\d{4}$/;
  return phonePattern.test(phone);
}

// Form submission event handler
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  register();
});

async function register() {
  const emailInput = document.getElementById("email").value;
  const phoneInput = document.getElementById("phoneNumber").value;
  const passwordInput = document.getElementById("password").value;
  const firstNameInput = document.getElementById("first-name").value;
  const lastNameInput = document.getElementById("last-name").value;
  const ageInput = document.getElementById("age").value;
  const addressInput = document.getElementById("address").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;

  if (!validateEmail(emailInput)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
    });
    return;
  }

  if (!validatePhone(phoneInput)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Phone Number',
      text: 'Please enter a valid Egyptian phone number in the format XXXX-XXX-XXXX.',
    });
    return;
  }

  try {
    const response = await fetch("http://localhost:8008/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        phone: phoneInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        age: ageInput,
        gender: selectedGender,
        address: addressInput,
        weight: weight,
        height: height,
      }),
    });
    const data = await response.json();

    if (data.token) {
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("patient_id", data.id);
      console.log(localStorage.getItem("token"));

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully.',
        showConfirmButton: false,
      })
      setTimeout(() => {
        window.location.href = `http://${window.location.host}/client/patient/patient.html`;
      }, 1500);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: data.error,
        showConfirmButton: true,

      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong. Please try again later.',
    });
    console.error(error);
  }
}
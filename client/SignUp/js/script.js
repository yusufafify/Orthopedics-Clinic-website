// Validation function for email
function validateEmail(email) {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return emailPattern.test(email);
}

// Validation function for Egyptian phone number
function validatePhone(phone) {
  // Assuming Egyptian phone number format is XXXX-XXX-XXXX where X is a digit
  const phonePattern = /^\d{4}\d{3}\d{4}$/;
  return phonePattern.test(phone);
}

// Form submission event handler
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
register();

});


function register(){
  const emailInput = document.getElementById("email").value;
  const phoneInput = document.getElementById("phoneNumber").value;
  const passwordInput = document.getElementById("password").value;
  const firstNameInput = document.getElementById("first-name").value;
  const lastNameInput = document.getElementById("last-name").value;
  const ageInput = document.getElementById("age").value;

  if (!validateEmail(emailInput)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePhone(phoneInput)) {
    alert("Please enter a valid Egyptian phone number in the format XXXX-XXX-XXXX.");
    return;
  }

  fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: emailInput,
      phone: phoneInput,
      password: passwordInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      age: ageInput
    })
  }).then(response => {
    if (response.ok) {
      alert("User registered successfully!");
      window.location.href = "../Login/Login.html";
    } else {
      alert("An error occurred. Please try again later.");
    }
  }).catch(error => console.error(error));
}




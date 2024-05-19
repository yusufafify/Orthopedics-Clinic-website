document
  .getElementById("loginform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    login();
  });

// localStorage.removeItem('token');
//if token exists override the login page elements with a message
if (localStorage.getItem("token") != null) {
  // Override the login page elements with a message
  let message = document.createElement("p");
  message.textContent = "Redirecting...";
  document.getElementById("loginform").innerHTML = "";
  document.getElementById("loginform").appendChild(message);
  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("role"));
  if (localStorage.getItem("role") == "patient") {
    window.location.href = "http://127.0.0.1:5500/client/patient/patient.html";
  } else if (localStorage.getItem("role") == "doctor") {
    window.location.href = "http://127.0.0.1:5500/client/Doctor/doctor.html";
  } else if (localStorage.getItem("role") == "admin") {
    window.location.href = "http://127.0.0.1:5500/client/Admin/admin.html";
  }
}
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Check if both fields are filled
  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out both email and password fields!",
    });
    return;
  }

  fetch("http://localhost:8008/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.role == "patient") {
          localStorage.setItem("patient_id", data.id);
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Redirecting to patient dashboard...",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href =
              "http://127.0.0.1:5500/client/patient/patient.html";
          });
        } else if (data.role == "doctor") {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Redirecting to doctor dashboard...",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href =
              "http://127.0.0.1:5500/client/Doctor/doctor.html";
          });
        } else if (data.role == "admin") {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Redirecting to admin dashboard...",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href =
              //"http://127.0.0.1:5500/client/Admin/admin.html";
              "http://127.0.0.1:5500/Orthopedics-Clinic-website/client/Admin/admin.html";

          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    });
}

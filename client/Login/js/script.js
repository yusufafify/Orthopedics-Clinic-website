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
      // console.log('token:', JSON.stringify(data.token) );
      localStorage.setItem("token", data.token);

      console.log(data.role);
      if (data.role == "patient") {
        localStorage.setItem("patient_id", data.id);
        localStorage.setItem("role", data.role);
        window.location.href =
          "http://127.0.0.1:5500/client/patient/patient.html";
      } else if (data.role == "doctor") {
        localStorage.setItem("role", data.role);
        window.location.href =
          "http://127.0.0.1:5500/client/Doctor/doctor.html";
      } else if (data.role == "admin") {
        localStorage.setItem("role", data.role);
        window.location.href = "http://127.0.0.1:5500/client/Admin/admin.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

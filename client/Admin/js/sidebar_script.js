var sideNav = document.getElementById("sidebar");
var toggleBtn = document.getElementById("sideOpenBtn");
let closeBtn = document.getElementById("sideCloseBtn");
let navLinks = document.querySelectorAll("#sidebar a");
const logoutBtn = document.getElementById("logOutBtn");
// const modal = document.getElementById("modal");
// const editInfo = document.getElementById("edit_info");
// const body = document.querySelector("body");

// let email = document.getElementById("email");

let state = false;
// let modalState = false;
toggleBtn.addEventListener("click", function () {
  if (state) {
    sideNav.classList.add("-translate-x-full");
    state = false;
  } else {
    sideNav.classList.remove("-translate-x-full");
    state = true;
  }
});
closeBtn.addEventListener("click", function () {
  if (state) {
    sideNav.classList.add("-translate-x-full");
    state = false;
  } else {
    sideNav.classList.remove("-translate-x-full");

    state = true;
  }
});

// Add event listener to each nav link
navLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    // Remove the active class from all links
    navLinks.forEach((link) => link.classList.remove("bg-gray-100"));

    // Add the active class to the clicked link
    if (index !== 0 && index !== 5) {
      this.classList.add("bg-gray-100");
    }
  });
});

//fetch function to get user data from the server and check on the status
fetch("http://localhost:8008/personal_data", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => {
    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status === 422 ||
      !localStorage.getItem("token")
    ) {
      console.log("Unauthorized");
      localStorage.removeItem("token");
      window.location.href =
        "http://" + window.location.host + "/Orthopedics-Clinic-website/client/Login/login.html";
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
  })

  .catch((error) => {
    console.error("Error:", error);
  });

console.log(localStorage.getItem("token"));

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href =
    "http://" + window.location.host + "/Orthopedics-Clinic-website/client/Login/login.html";
});




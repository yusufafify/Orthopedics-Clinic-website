var sideNav = document.getElementById("sidebar");
var toggleBtn = document.getElementById("sideOpenBtn");
let closeBtn = document.getElementById("sideCloseBtn");
let navLinks = document.querySelectorAll("#sidebar a");
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

// editInfo.addEventListener('click', function () {
//   console.log('modal btn clicked');
//   console.log(modalState);
//   if(!modalState){
//     body.classList.add('overflow-hidden');
//     modal.classList.remove('pointer-events-none');
//     modal.classList.remove('opacity-0');
//     modal.classList.add('opacity-100');
//     modalState=true;}

// });

// modal.addEventListener('click', function (e) {
//   if(e.target.id === 'modal' && email.value === initialEmailValue){
//     body.classList.remove('overflow-hidden');
//     modal.classList.remove('opacity-100');
//     modal.classList.add('opacity-0');
//     modal.classList.add('pointer-events-none');
//     modalState=false;
//   }
// });


//fetch function to get user data from the server

  // fetch("http://localhost:8080/personal_data", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     //   document.getElementById('first_name').value=data.name.split(' ')[0];
  //     //   document.getElementById('last_name').value=data.name.split(' ')[1];
  //     //   email.value=data.email;
  //     //   document.getElementById('phone').value=data.phone;
  //     //  document.getElementById('address').value=data.address;
  //     //   document.getElementById('age').value=data.age;
  //     document.getElementById("patient_name").innerHTML =
  //       data.name + "    -" + data.age + " years old";
  //     document.getElementById("patient_email").innerHTML = data.email;
  //     document.getElementById("patient_phone").innerHTML = data.phoneNumber;
  
  //     document.getElementById("patient_address").innerHTML = data.address;
  //   })
  //   .catch((error) => {
  //     console.error("Error:");

  //   });
  


// async await function to get user data from the server
// async function getUserData(){
//   try {
//     const response = await fetch('http://localhost:8080/personal_data',{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     const data = await response.json();
//     document.getElementById("patient_name").innerHTML =
//         data.name + "    -" + data.age + " years old";
//       document.getElementById("patient_email").innerHTML = data.email;
//       document.getElementById("patient_phone").innerHTML = data.phoneNumber;
  
//       document.getElementById("patient_address").innerHTML = data.address;
//   } catch (error) {
//     console.error('Error:', error);
//     localStorage.removeItem('token');
//     window.location.href = "http://127.0.0.1:5500/client/Login/login.html"; 
//   }
// }
// getUserData();


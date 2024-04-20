document.getElementById('loginform').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  login();

});


// localStorage.removeItem('token');
//if token exists override the login page elements with a message
// if(localStorage.getItem('token') != null){
//   // Override the login page elements with a message
//   let message = document.createElement('p');
//   message.textContent = 'Redirecting...';
//   document.getElementById('loginform').innerHTML = '';
//   document.getElementById('loginform').appendChild(message);
//   window.location.href = 'http://127.0.0.1:5500/client/patient/info/info.html';
// }




function login(){
  let email=document.getElementById('email').value;
  let password=document.getElementById('password').value;
  fetch('http://localhost:8080/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })  .then(response => response.json())
  .then(data => {

    // console.log('token:', JSON.stringify(data.token) );
    localStorage.setItem('token', data.token);

    console.log(data.role)
    if(data.role=='patient'){
      window.location.href = 'http://127.0.0.1:5500/client/patient/patient.html';
    }
    else if(data.role=='doctor'){
      window.location.href = 'http://127.0.0.1:5500/client/doctor/doctor.html';
    }
    else if(data.role=='admin'){
      window.location.href = 'http://127.0.0.1:5500/client/admin/admin.html';
    }

  })
  .catch((error) => {
    console.error('Error:', error);
  })}
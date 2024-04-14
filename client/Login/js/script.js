document.getElementById('loginform').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  login();

});



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

    console.log('message:', JSON.stringify(data.message) );

  })
  .catch((error) => {
    console.error('Error:', error);
  })}
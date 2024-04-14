// fetch('http://localhost:8080/', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })
//   .then(response => response.json())
//   .then(data => {

//     console.log('Success:', data);

//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });



// Assuming you have obtained the token from the server and stored it in a variable named 'token'

fetch('http://localhost:8080/check_token', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inl1c3VmYWZpZnkwQGdtYWlsLmNvbSIsInJvbGUiOiJwYXRpZW50IiwiZXhwIjoxNzEzMDU5ODc5fQ.61lgeSrsZDIOeXPLulNZZp_smRVmrYHSQVnC_epPMXQ"  // Sending the token in the 'token' header
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('Token validation response:', data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});

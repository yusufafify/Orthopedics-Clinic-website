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



fetch('http://localhost:8080/check_token', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'token': "eyJ0eXAiOiJKVQiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inl1c3VmYWZpZnkwQGdtYWlsLmNvbSIsInJvbGUiOiJwYXRpZW50IiwiZXhwIjoxNzEzMDkzNDY2fQ.rSLXo5Jvd1GOk3lUHcoR0vKDGfs8aL0OB-T7TSsSv-w"  // Sending the token in the 'token' header
  }
})
.then(response => {
  if (!response.ok) {
    return response.json().then(data => {
      switch (data.status) {
        case 401:
          console.log('Unauthorized');
          break;
        case 404:
          console.log('Not Found');
          break;
        case 500:
          console.log('Bad Request');
          break;
        default:
          console.log('Unknown error');
      }
      throw new Error(response.status );
    });
  }
  return response.json();
})
.then(data => {
  console.log('Token validation response:', data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
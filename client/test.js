// fetch('http://localhost:8008/', {
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



fetch('http://localhost:8008/check_token', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFoYWhhaEBnYW1pYS5jaW4iLCJyb2xlIjoicGF0aWVudCIsImV4cCI6MTcxMzEyNDI1NX0.5G8bsdoEydVjHkjg6uhpstI5N4TVtyg2-XwLo96k6Ac"  // Sending the token in the 'token' header
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
//fetch function to get user data from the server

  fetch("http://localhost:8008/personal_data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //   document.getElementById('first_name').value=data.name.split(' ')[0];
      //   document.getElementById('last_name').value=data.name.split(' ')[1];
      //   email.value=data.email;
      //   document.getElementById('phone').value=data.phone;
      //  document.getElementById('address').value=data.address;
      //   document.getElementById('age').value=data.age;
      document.getElementById("patient_name").innerHTML =
        data.name + "    -" + data.age + " years old";
      document.getElementById("patient_email").innerHTML = data.email;
      document.getElementById("patient_phone").innerHTML = data.phoneNumber;
  
      document.getElementById("patient_address").innerHTML = data.address;
    })
    .catch((error) => {
      console.error("Error:");

    });
  
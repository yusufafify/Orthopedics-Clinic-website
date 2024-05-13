function getPatientInfo() {
  let currentAppointment = JSON.parse(localStorage.getItem('activeAppointment'));
  console.log(currentAppointment);
  if (activeAppointment && activeAppointment.patientId) {
    fetch("http://localhost:8008/get_patient_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ patientId: activeAppointment.patientId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user);
        if (data != undefined) {
          document.querySelector('#medicalImages').innerHTML = generateMedicalImages(data.images);
          document.querySelector('#recordBox').innerHTML = displayMedicalHistory(data.medical_history);
          document.getElementById('infoName').innerHTML = "Name: " + data.user.name;
          document.getElementById('infoAge').innerHTML = "Age: " + data.user.age;
          document.getElementById('infoGender').innerHTML = "Gender: " + data.user.gender;
          document.getElementById('infoPhone').innerHTML = "Phone number: " + data.user.phone;
          document.getElementById('infoEmail').innerHTML = "Email: " + data.user.email;
          document.getElementById('infoAddress').innerHTML = "Address: " + data.user.address;


        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}


import { landingMedicalHistory } from "./history.js";
import { landingMedicalImages } from "./images.js";
async function getPersonalData() {
  const response = await fetch("http://localhost:8008/get_patient_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      patientId: localStorage.getItem("patient_id"),
    }),
  });
  const data = await response.json();
  console.log(data);
  document.getElementById("patient_name").innerHTML =
    data.user.name + "    -" + data.user.age + " years old";
  document.getElementById("patient_email").innerHTML = data.user.email;
  document.getElementById("patient_phone").innerHTML = data.user.phoneNumber;

  document.getElementById("patient_address").innerHTML = data.user.address;
  console.log(data.images);
  console.log(data.medical_history);
  const images = [];
  const history = [];
  
  if (data.images) {
    images.push(...data.images);
    console.log(images)
  }
  
  console.log(images);
  if(data.medical_history){

    history.push(...data.medical_history);
  }
  console.log(history);
  console.log(landingMedicalHistory(history));

  document.getElementById("briefHistory").innerHTML =
    landingMedicalHistory(history);
  document.getElementById("briefImages").innerHTML =
    landingMedicalImages(images);
}

getPersonalData();

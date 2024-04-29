const nameAge= document.getElementById('nameAge');
const drEmail = document.getElementById('drEmail');
const drPhone = document.getElementById('drPhone');
const drAddress= document.getElementById('drAddress');

fetch("http://localhost:8008/personal_data", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    })
    .then((response) => response.json())
    .then((data) => {
        nameAge.innerHTML = data.name + "    -" + data.age + " years old";
        drEmail.innerHTML = data.email;
        drPhone.innerHTML = data.phoneNumber;
        drAddress.innerHTML = data.address;
    })
    .catch((error) => {
        console.error("Error:");
    });
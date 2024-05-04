// Initialize variables
const modal = document.getElementById("modal");
const editInfo = document.getElementById("edit_info");
const body = document.querySelector("body");
const email = document.getElementById("email");
const uploadInput = document.getElementById("upload");
const filenameLabel = document.getElementById("filename");
const imagePreview = document.getElementById("image-preview");
const updateBtn = document.getElementById("update_info");
const profilePic = document.getElementById("profile_pic");

//states
let imageFile = null;
let imageUrl = "";
let modalState = false;
let isEventListenerAdded = false; // Check if the event listener has been added before



editInfo.addEventListener("click", function () {
  console.log("modal btn clicked");
  console.log(modalState);
  if (!modalState) {
    body.classList.add("overflow-hidden");
    modal.classList.remove("pointer-events-none","opacity-0");
    modal.classList.add("opacity-100");
    modalState = true;
  }
});

modal.addEventListener("click", function (e) {
  if (e.target.id === "modal") {
    body.classList.remove("overflow-hidden");
    modal.classList.remove("opacity-100");
    modal.classList.add("pointer-events-none","opacity-0");
    modalState = false;
  }
});

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
    console.log("data:", JSON.stringify(data));
    document.getElementById("first_name").value = data.name.split(" ")[0];
    document.getElementById("last_name").value = data.name.split(" ")[1];
    email.value = data.email;
    document.getElementById("phone").value = data.phoneNumber;
    document.getElementById("address").value = data.address;
    document.getElementById("patient_name").innerHTML =
      data.name + "    -" + data.age + " years old";
    document.getElementById("patient_email").innerHTML = data.email;
    document.getElementById("patient_phone").innerHTML = data.phoneNumber;
    document.getElementById("patient_address").innerHTML = data.address;
    data.profilePic
      ? (profilePic.src = data.profilePic)
      : data.gender === "male"
      ? (profilePic.src = "/public/assets/imgs/man.png")
      : (profilePic.src = "/public/assets/imgs/woman.png");

  })
  .catch((error) => {
    console.error("Error:", error);
  });



uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    filenameLabel.textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = `<img src="${e.target.result}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
      imagePreview.classList.remove(
        "border-dashed",
        "border-2",
        "border-gray-400"
      );
      imageFile = reader.result;

      // Add event listener for image preview only once
      if (!isEventListenerAdded) {
        imagePreview.addEventListener("click", () => {
          uploadInput.click();
        });

        isEventListenerAdded = true;
      }
    };
    reader.readAsDataURL(file);
  } else {
    filenameLabel.textContent = "";
    imagePreview.innerHTML = `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    imagePreview.classList.add("border-dashed", "border-2", "border-gray-400");

    // Remove the event listener when there's no image
    imagePreview.removeEventListener("click", () => {
      uploadInput.click();
    });

    isEventListenerAdded = false;
  }
});

uploadInput.addEventListener("click", (event) => {
  event.stopPropagation();
});

const getImageUrlAndUpdateData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/imageUploader", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photo: imageFile,
      }),
    });

    const data = await response.json();
    const imageUrl = data.data;
    const updatedData = {
      name:
        document.getElementById("first_name").value +
        " " +
        document.getElementById("last_name").value,
      email: email.value,
      phoneNumber: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      profilePic: imageUrl,
    };
    await updateData(updatedData);
    
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

const updateData = async (updatedData) => {
  try {
    const response = await fetch("http://localhost:8008/update_data", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });
 
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateInfo = async () => {
  const response = await getImageUrlAndUpdateData();
  if (response) {
    window.location.reload();
  }
};

updateBtn.addEventListener("click", function () {
  updateInfo();
  body.classList.remove("overflow-hidden");
  modal.classList.remove("opacity-100");
  modal.classList.add("pointer-events-none","opacity-0");
  modalState = false;
});
console.log(localStorage.getItem('token'))
const uploadInput = document.getElementById("upload");
const filenameLabel = document.getElementById("filename");
const imagePreview = document.getElementById("image-preview");
const submitBtn = document.getElementById("imageSubmitBtn");


//states
let imageFile = null;
let imageUrl = "";
let modalState = false;
let isEventListenerAdded = false; // Check if the event listener has been added before



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




const getImageUrlAndPost = async () => {
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
    const uploadedData = {
      imageType:
        document.getElementById("imageType").value+"_"+document.getElementById('imageDiscription').value,
        src: imageUrl,
        date: document.getElementById("imageDate").value,
      createdAt: new Date().toISOString(),
      updadtedAt: new Date().toISOString(),
      
    };
    await uploadData(uploadedData);
    
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

const uploadData = async (uploadedData) => {
  try {
    const response = await fetch("http://localhost:8008/add_medical_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(uploadedData),
    });
 
  } catch (error) {
    console.error("Error:", error);
  }
};

const uploadInfo = async () => {
  const response = await getImageUrlAndPost();
  if (response) {
    window.location.reload();
  }
};

submitBtn.addEventListener("click", function () {
  uploadInfo();
});



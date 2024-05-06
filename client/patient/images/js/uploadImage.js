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
let isImageURL = false;
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
    if (imageUrl) {
      isImageURL = true;
    }
    const uploadedData = {
      imageType:
        document.getElementById("imageType").value +
        "_" +
        document.getElementById("imageDiscription").value,
      src: imageUrl,
      date: document.getElementById("imageDate").value,
      createdAt: new Date().toISOString(),
      updadtedAt: new Date().toISOString(),
    };
    if (isImageURL) {
      await uploadData(uploadedData);
      return true;
    }
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: "Please upload a valid image.",
        icon: "error",
      });
    }
    return false;
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
  try {
    const imageType = document.getElementById("imageType").value;
    const imageDescription = document.getElementById("imageDiscription").value;
    const imageDate = document.getElementById("imageDate").value;

    // Check if all required fields are filled
    if (!imageType || !imageDescription || !imageDate) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }

    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-700 text-white font-md p-2 rounded",
        cancelButton:
          "bg-red-500 hover:bg-red-700 text-white font-md p-2 mr-2 rounded",
      },
      buttonsStyling: false,
      showConfirmButton: false, // Hide the default "OK" button
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "This action will upload information.",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes, upload!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await getImageUrlAndPost();
          if (response) {
            swalWithTailwindButtons.fire({
              title: "Uploaded!",
              text: "Information has been uploaded successfully.",
              icon: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Information upload has been cancelled.",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
};

submitBtn.addEventListener("click", function () {
  uploadInfo();
});

import { putImageInTheContainer } from "./putImageInTheContainer.js";
import { initializeDialog } from "./initializeDialog.js";
import { deleteImage } from "./deleteImage.js";

const xrayBtn = document.querySelector("#xRay");
const mriBtn = document.querySelector("#mri");
const ctscanBtn = document.querySelector("#ct");

const imgContainer = document.querySelector("#image_container");
imgContainer.classList.remove(
  "grid-cols-1",
  "gap-4",
  "sm:grid-cols-2",
  "md:grid-cols-3"
);
imgContainer.classList.add("place-items-center");

initializeDialog();

let imgArray = [];

function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;
  let number = buttonId.replace(/^\D+/g, "");
  


  if (buttonId.includes("delete")) {
    deleteImage(number);
  }
}

function getImages(category) {
  imgContainer.innerHTML = putImageInTheContainer(imgArray, false);
  imgContainer.classList.remove(
    "grid-cols-1",
    "gap-4",
    "sm:grid-cols-2",
    "md:grid-cols-3"
  );
  imgContainer.classList.add("place-items-center");
  fetch("http://127.0.0.1:8008/medical_images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      category: category,
    }),
  }).then((response) => {
    response.json().then((data) => {
      console.log(data);
      imgArray.push(...data);
      imgContainer.classList.add(
        "grid-cols-1",
        "gap-4",
        "sm:grid-cols-2",
        "md:grid-cols-3"
      );

      imgContainer.innerHTML = putImageInTheContainer(imgArray, true);
      initializeDialog();
      const buttons = document.querySelectorAll("button");

      buttons.forEach(function (button) {
        button.addEventListener("click", handleButtonClick);
      });
    });
  });
}

getImages("all");

xrayBtn.addEventListener("click", () => {
  imgArray = [];
  initializeDialog();
  getImages("x-ray");
});

mriBtn.addEventListener("click", () => {
  imgArray = [];
  initializeDialog();
  getImages("mri");
});

ctscanBtn.addEventListener("click", () => {
  imgArray = [];
  initializeDialog();
  getImages("ct");
});

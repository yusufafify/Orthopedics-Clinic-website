import { putImageInTheContainer } from "./putImageInTheContainer.js";
import { initializeDialog } from "./initializeDialog.js";

const imgContainer = document.querySelector("#image_container");
imgContainer.classList.remove(
  "grid-cols-1",
  "gap-4",
  "sm:grid-cols-2",
  "md:grid-cols-3"
);
imgContainer.classList.add("place-items-center");

initializeDialog();

const imgArray = [];

function getImages() {
  imgContainer.innerHTML = putImageInTheContainer(imgArray, false);
  fetch("http://localhost:8008/medical_images", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    response.json().then((data) => {
      imgArray.push(...data);
      imgContainer.classList.add(
        "grid-cols-1",
        "gap-4",
        "sm:grid-cols-2",
        "md:grid-cols-3"
      );

      imgContainer.innerHTML = putImageInTheContainer(imgArray, true);
      initializeDialog();
    });
  });
}

getImages();

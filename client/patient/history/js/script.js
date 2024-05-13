//import the functions needed
import { getMedicalHistory } from "./getMedicalHistory.js";
import { handleDelete } from "./handleDelete.js";
import { personalInfoSkeleton } from "./personalInfoSkeleton.js";

//variables for the header of the history page
const historyOpenBtn = document.querySelector("#historyOpenBtn");
const historyNav = document.querySelector("#historyNav");
const navBtns = document.querySelectorAll(".nav_btns");
let historNavState = false;

//variables for the medical history details Container
const injuriesContainer = document.getElementById("injuries");
const surgeriesContainer = document.getElementById("surgeries");
const treatmentsContainer = document.getElementById("treatments");
const familyContainer = document.getElementById("family");
const medicationsContainer = document.getElementById("medications");
const allergiesContainer = document.getElementById("allergies");

//Initially all containers are visible
injuriesContainer.classList.remove("hidden");
surgeriesContainer.classList.remove("hidden");
treatmentsContainer.classList.remove("hidden");
familyContainer.classList.remove("hidden");
medicationsContainer.classList.remove("hidden");
allergiesContainer.classList.remove("hidden");

//variables for the medical history details
const injuriesDetails = document.getElementById("injuries_details");
const surgeriesDetails = document.getElementById("surgeries_details");
const treatmentsDetails = document.getElementById("treatments_details");
const familyHistoryDetails = document.getElementById("family_details");
const medicationsDetails = document.getElementById("medication_details");
const allergiesDetails = document.getElementById("allergies_details");

//patient info
const patientInfo = document.getElementById("patientInfo");
//Initial medical history details
const medicalHistory = [];

//Event listeners for the medical history details in the header
historyOpenBtn.addEventListener("click", () => {
  if (historNavState) {
    historyNav.classList.remove("opacity-100");

    historyNav.classList.add("opacity-0");

    historyNav.classList.add("pointer-events-none");

    historNavState = false;
  } else {
    historyNav.classList.remove("hidden");
    historyNav.classList.remove("opacity-0");
    historyNav.classList.remove("pointer-events-none");

    setTimeout(() => {
      historyNav.classList.add("opacity-100");
    }, 100);
    historNavState = true;
  }
});

//Event listener for the nav buttons to target the pressed btn and put white bg color
navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    navBtns.forEach((btn) => {
      btn.classList.remove(
        "underline",
        "decoration-[#22ffa3]",
        "decoration-[3px]",
        "underline-offset-[3px]"
      );
    });
    btn.classList.add(
      "underline",
      "decoration-[#22ffa3]",
      "decoration-[3px]",
      "underline-offset-[3px]"
    );
    const btnID = btn.id;
    console.log(btnID);
    if (btnID === "allBtn") {
      injuriesContainer.classList.remove("hidden");
      surgeriesContainer.classList.remove("hidden");
      treatmentsContainer.classList.remove("hidden");
      familyContainer.classList.remove("hidden");
      medicationsContainer.classList.remove("hidden");
      allergiesContainer.classList.remove("hidden");
      familyContainer.parentElement.classList.add("md:grid-cols-2", "gap-4");
      allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
      const injuriesHistory = medicalHistory
        .filter((history) => history.historyType === "Injuries")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const surgeriesHistory = medicalHistory
        .filter((history) => history.historyType === "Surgeries")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const treatmentsHistory = medicalHistory
        .filter((history) => history.historyType === "Treatments")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const familyHistory = medicalHistory
        .filter((history) => history.historyType === "Family Afflictions")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const medications = medicalHistory
        .filter((history) => history.historyType === "Medications")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      const allergies = medicalHistory
        .filter((history) => history.historyType === "Allergies")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
      surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
      treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
      familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
      medicationsDetails.innerHTML = getMedicalHistory(medications, true);
      allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
    }
    if (btnID === "injuriesBtn") {
      injuriesContainer.classList.remove("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.add("hidden");
      allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
      const injuriesHistory = medicalHistory
        .filter((history) => history.historyType === "Injuries")
        .reverse();
      injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
      familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
    }
    if (btnID === "surgeriesBtn") {
      injuriesContainer.classList.add("hidden");
      surgeriesContainer.classList.remove("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.add("hidden");
      allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
      const surgeriesHistory = medicalHistory
        .filter((history) => history.historyType === "Surgeries")
        .reverse();
      surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);

      familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
    }
    if (btnID === "treatmentsBtn") {
      injuriesContainer.classList.add("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.remove("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.add("hidden");
      allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
      const treatmentsHistory = medicalHistory
        .filter((history) => history.historyType === "Treatments")
        .reverse();
      treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
      familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
    }
    if (btnID === "familyBtn") {
      injuriesContainer.classList.add("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.remove("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.add("hidden");
      allergiesContainer.parentElement.classList.add("md:grid-cols-2", "gap-2");
      const familyHistory = medicalHistory
        .filter((history) => history.historyType === "Family Afflictions")
        .reverse();
      familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
      familyContainer.parentElement.classList.remove("md:grid-cols-2", "gap-4");
    }
    if (btnID === "medicationBtn") {
      injuriesContainer.classList.add("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.remove("hidden");
      allergiesContainer.classList.add("hidden");
      medicationsContainer.parentElement.classList.remove(
        "md:grid-cols-2",
        "gap-2"
      );
      const medications = medicalHistory
        .filter((history) => history.historyType === "Medications")
        .reverse();
      medicationsDetails.innerHTML = getMedicalHistory(medications, true);
    }
    if (btnID === "allergiesBtn") {
      injuriesContainer.classList.add("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.remove("hidden");
      allergiesContainer.parentElement.classList.remove(
        "md:grid-cols-2",
        "gap-2"
      );
      const allergies = medicalHistory
        .filter((history) => history.historyType === "Allergies")
        .reverse();
      allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
    }
    document.querySelectorAll("button").forEach(function (button) {
      button.addEventListener("click", handleDelete);
    });
  });
});

async function getHistory() {
  injuriesDetails.innerHTML = getMedicalHistory([], false);
  surgeriesDetails.innerHTML = getMedicalHistory([], false);
  treatmentsDetails.innerHTML = getMedicalHistory([], false);
  familyHistoryDetails.innerHTML = getMedicalHistory([], false);
  medicationsDetails.innerHTML = getMedicalHistory([], false);
  allergiesDetails.innerHTML = getMedicalHistory([], false);
  try {
    const response = await fetch("http://localhost:8008/get_medical_history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    medicalHistory.push(...data);
    console.table(medicalHistory);
  } catch (error) {
    console.log(error);
  }
  // Filter the medical history details based on the type of history
  const injuriesHistory = medicalHistory
    .filter((history) => history.historyType === "Injuries")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  const surgeriesHistory = medicalHistory
    .filter((history) => history.historyType === "Surgeries")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  const treatmentsHistory = medicalHistory
    .filter((history) => history.historyType === "Treatments")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  const familyHistory = medicalHistory
    .filter((history) => history.historyType === "Family Afflictions")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  const medications = medicalHistory
    .filter((history) => history.historyType === "Medications")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  const allergies = medicalHistory
    .filter((history) => history.historyType === "Allergies")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
  surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
  treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
  familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
  medicationsDetails.innerHTML = getMedicalHistory(medications, true);
  allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
  document.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", handleDelete);
  });
}

getHistory();

async function getInfo() {
  try {
    patientInfo.innerHTML = personalInfoSkeleton({}, false);
    const response = await fetch("http://localhost:8008/personal_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    patientInfo.innerHTML = personalInfoSkeleton(data, true);
  } catch (error) {}
}

getInfo();

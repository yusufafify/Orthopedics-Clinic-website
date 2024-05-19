
function getMedicalHistory(array, isFetchDone) {
  if (!isFetchDone) {
    return `
    
              <div role="status" class="animate-pulse">
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              <div role="status" class="animate-pulse">
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <div class="h-2 bg-gray-400 rounded-full w-48 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full w-40 mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div> 

              

    `;
  }
  if (array.length === 0) {
    return `<div class="bg-white p-6 rounded-lg shadow-md ">
      <h2 class="text-md ml-[10px] font-semibold mb-4"> No Medical History yet</h2>
    </div>`;
  }
  return array.map(
    (history) =>
      `
      
      <div class="bg-white p-6 rounded-lg shadow-md ">
      <div class="flex justify-between">
          <h3 class="text-lg font-bold mb-2">${history.title}</h3>
          </div>
        <p class="mb-2">Date: ${history.date}</p>
        <p>
          Description: ${history.description}
        </p>
        
      </div>
      
    
    `
  );
}


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
const appointmentsContainer = document.getElementById("appointments");

//Initially all containers are visible
injuriesContainer.classList.remove("hidden");
surgeriesContainer.classList.remove("hidden");
treatmentsContainer.classList.remove("hidden");
familyContainer.classList.remove("hidden");
medicationsContainer.classList.remove("hidden");
allergiesContainer.classList.remove("hidden");
appointmentsContainer.classList.remove("hidden");

//variables for the medical history details
const injuriesDetails = document.getElementById("injuries_details");
const surgeriesDetails = document.getElementById("surgeries_details");
const treatmentsDetails = document.getElementById("treatments_details");
const familyHistoryDetails = document.getElementById("family_details");
const medicationsDetails = document.getElementById("medication_details");
const allergiesDetails = document.getElementById("allergies_details");
const appointmentsDetails = document.getElementById("appointments_details");
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

    if (btnID === "allBtn") {
      injuriesContainer.classList.remove("hidden");
      surgeriesContainer.classList.remove("hidden");
      treatmentsContainer.classList.remove("hidden");
      familyContainer.classList.remove("hidden");
      medicationsContainer.classList.remove("hidden");
      allergiesContainer.classList.remove("hidden");
      appointmentsContainer.classList.remove("hidden");
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
        const appointments = medicalHistory
        .filter((history) => history.historyType === "appointment")
        .reverse()
        .slice(0, 2); // Limit to 2 items
      injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
      surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
      treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
      familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
      medicationsDetails.innerHTML = getMedicalHistory(medications, true);
      appointmentsDetails.innerHTML = getMedicalHistory(appointments, true);

      allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
    }
    if (btnID === "injuriesBtn") {
      injuriesContainer.classList.remove("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.add("hidden");
      appointmentsContainer.classList.add("hidden");
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
      appointmentsContainer.classList.add("hidden");
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
      appointmentsContainer.classList.add("hidden");
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
      appointmentsContainer.classList.add("hidden");
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
      appointmentsContainer.classList.add("hidden");
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
      appointmentsContainer.classList.add("hidden");
      allergiesContainer.parentElement.classList.remove(
        "md:grid-cols-2",
        "gap-2"
      );
      const allergies = medicalHistory
        .filter((history) => history.historyType === "Allergies")
        .reverse();
      allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
    }
    if (btnID === "appointmentBtn") {
      injuriesContainer.classList.add("hidden");
      surgeriesContainer.classList.add("hidden");
      treatmentsContainer.classList.add("hidden");
      familyContainer.classList.add("hidden");
      medicationsContainer.classList.add("hidden");
      allergiesContainer.classList.add("hidden");
      appointmentsContainer.classList.remove("hidden");
      const appointments = medicalHistory
      .filter((history) => history.historyType === "appointment")
      .reverse()

      appointmentsDetails.innerHTML = getMedicalHistory(appointments, true);

    }
    document.querySelectorAll("button").forEach(function (button) {
  
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
  appointmentsDetails.innerHTML = getMedicalHistory([], false);
  try {
    const response = await fetch("http://localhost:8008/get_lifetime_doctor_patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    medicalHistory.push(...data.medical_history[0]);
    console.log(medicalHistory);
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
        const appointments = medicalHistory
    .filter((history) => history.historyType === "appointment")
    .reverse()
    .slice(0, 2); // Limit to 2 items
  injuriesDetails.innerHTML = getMedicalHistory(injuriesHistory, true);
  surgeriesDetails.innerHTML = getMedicalHistory(surgeriesHistory, true);
  treatmentsDetails.innerHTML = getMedicalHistory(treatmentsHistory, true);
  familyHistoryDetails.innerHTML = getMedicalHistory(familyHistory, true);
  medicationsDetails.innerHTML = getMedicalHistory(medications, true);
  allergiesDetails.innerHTML = getMedicalHistory(allergies, true);
    appointmentsDetails.innerHTML = getMedicalHistory(appointments, true);

  
}

getHistory();


// file 1 done


const viewBtns=document.querySelectorAll('.view_btn');


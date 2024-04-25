import { appointmentsDetails } from "../../utils/appointmentsDetails.js";
import { getAppointments } from "../../utils/getAppointments.js";

let pages = document.getElementById("pages");
pages.innerHTML = `pages 1 of ${Math.ceil(appointmentsDetails.length / 4)}`;
let currentPage = 1;
let isOnePageState = false;
let consultationState = false;
let examinationState = false;

function attachButtonEventListeners() {
  var buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", handleButtonClick);
  });
}

const table_body = document.getElementById("appointment_table_body");
attachButtonEventListeners();

handlePagination(appointmentsDetails);



//function that handles the pagination logic of the appointments table
function handlePagination(appointments) {
  //if there are no appointments, display a message
  if (appointments.length === 0) {
    table_body.innerHTML = `<tr>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex items-center gap-3">

        <div class="flex flex-col">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            No Appointments
          </p>

        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex flex-col">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          ---
        </p>

      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">

      <div class="w-max">
        <div
          class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap">
          <span class="">---</span> 
        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50"> 

      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        ---
      </p>
    </td>
</tr>`;
    return;
  }
  //get the current page
  const startIndex = (currentPage - 1) * 8;
  //get the end index of the current page
  const endIndex = startIndex + 8;
  //get the appointments that will be displayed on the current page
  const currentAppointments = appointments.slice(startIndex, endIndex);
  //display the appointments on the table
  table_body.innerHTML = getAppointments(currentAppointments);
  //attach event listeners to the buttons
  attachButtonEventListeners();
  //if there is only one page, display the page number as 1 of 1
  if (appointments.length === 1 || appointments.length === 8) {
    isOnePageState = true;
    currentPage = 1;
    pages.innerHTML = "page 1 of 1";
  } else {
    isOnePageState = false;
    pages.innerHTML = `page ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;
  }
}

//function that targets the list data-value and filters the appointments based on the value of the list item
function handleListClick(event) {
  const value = event.currentTarget.getAttribute("data-value");

  // Remove existing div from all list items
  list.forEach((item) => {
    const existingDiv = item.querySelector("#list_bg");
    if (existingDiv) {
      item.removeChild(existingDiv);
    }
  });

  // Create a new div and append it to the clicked list item
  const newDiv = document.createElement("div");
  newDiv.classList.add("absolute");
  newDiv.classList.add("inset-0");
  newDiv.classList.add("z-10");
  newDiv.classList.add("h-full");
  newDiv.classList.add("bg-white");
  newDiv.classList.add("rounded-md");
  newDiv.classList.add("shadow");
  newDiv.id = "list_bg";

  event.currentTarget.appendChild(newDiv);
  //filter the appointments based on the value of the list item
  //give back all the appointments if the value is "all"
  if (value === "all") {
    consultationState = false;
    examinationState = false;
    handlePagination(appointmentsDetails);
    //attachButtonEventListeners();
    return;
  }
  if (value === "consultation") {
    consultationState = true;
    examinationState = false;
  }
  if (value === "examination") {
    examinationState = true;
    consultationState = false;
  }
  //bring back the appointments that have the same reason as the value of the list item
  const filteredAppointments = appointmentsDetails.filter(
    (appointment) => appointment.reason.toLocaleLowerCase() === value
  );
  //display the filtered appointments on the table
  if (filteredAppointments.length === 1 || filteredAppointments.length === 8) {
    isOnePageState = true;
    currentPage = 1;
    pages.innerHTML = "page 1 of 1";
  } else {
    isOnePageState = false;
    pages.innerHTML = `page ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;
  }

  handlePagination(filteredAppointments);

}

const list = document.querySelectorAll("[data-value]");
list.forEach((item) => {
  item.addEventListener("click", handleListClick);
});




//function that handles the button click event
//Every button has an id that contains a number
//The number is used to identify the appointment that the button belongs to
//The function uses the number to display the details dialog of the appointment
//The function also uses the number to display the edit dialog of the appointment
//The function also uses the number to close the details dialog and the edit dialog
//The function also uses the id to navigate to the next page of the appointments table
//The function also uses the id to navigate to the previous page of the appointments table

function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;
  
  //get the number from the id of the button
  let number = buttonId.replace(/^\D+/g, "");

  if (buttonId.includes("detailsbtn")) {
    
    const mainDialog = document.getElementById(`mainDialog${number}`);
    mainDialog.classList.remove("hidden");

    mainDialog.classList.remove("pointer-events-none");
    mainDialog.classList.add("fixed");
    mainDialog.classList.add("inset-0");
    mainDialog.classList.add("grid");
    mainDialog.classList.add("h-screen");
    mainDialog.classList.add("w-screen");
    mainDialog.classList.add("place-items-center");
    mainDialog.classList.add("bg-black");
    mainDialog.classList.add("bg-opacity-60");
    setTimeout(() => {
      mainDialog.classList.add("opacity-100");
    }, 100);
    mainDialog.classList.add("backdrop-blur-sm");

    const detailsDialog = document.getElementById(`detailsDialog${number}`);
    detailsDialog.classList.add("opacity-100");
    detailsDialog.classList.add("translate-y-0");
    detailsDialog.classList.add("scale-100");

    detailsDialog.classList.remove("-translate-y-28");
    detailsDialog.classList.remove("scale-90");
    detailsDialog.classList.remove("pointer-events-none");
  }


  if (buttonId.includes("exitBtn")) {
    
    const mainDialog = document.getElementById(`mainDialog${number}`);
    mainDialog.classList.add("hidden");
    mainDialog.classList.add("pointer-events-none");
    mainDialog.classList.remove("fixed");
    mainDialog.classList.remove("inset-0");
    mainDialog.classList.remove("grid");
    mainDialog.classList.remove("h-screen");
    mainDialog.classList.remove("w-screen");
    mainDialog.classList.remove("place-items-center");
    mainDialog.classList.remove("bg-black");
    mainDialog.classList.remove("bg-opacity-60");
    mainDialog.classList.remove("opacity-100");
    mainDialog.classList.remove("backdrop-blur-sm");

    const detailsDialog = document.getElementById(`detailsDialog${number}`);
    detailsDialog.classList.remove("opacity-100");
    detailsDialog.classList.remove("translate-y-0");
    detailsDialog.classList.remove("scale-100");

    detailsDialog.classList.add("-translate-y-28");
    detailsDialog.classList.add("scale-90");
    detailsDialog.classList.add("pointer-events-none");
  }


  if (buttonId.includes("editbtn")) {
    
    const editDialogContainer = document.getElementById(
      `editDialogContainer${number}`
    );
    const editDialog = document.getElementById(`editDialog${number}`);
    ("fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm");
    editDialogContainer.classList.remove("hidden");
    editDialogContainer.classList.remove("pointer-events-none");
    editDialogContainer.classList.add("fixed");
    editDialogContainer.classList.add("inset-0");
    editDialogContainer.classList.add("grid");
    editDialogContainer.classList.add("place-items-center");
    editDialogContainer.classList.add("bg-black");
    editDialogContainer.classList.add("bg-opacity-60");
    editDialogContainer.classList.add("backdrop-blur-sm");
    setTimeout(() => {
      editDialogContainer.classList.add("opacity-100");
    }, 100);

    editDialog.classList.add("opacity-100");
    editDialog.classList.add("translate-y-0");
    editDialog.classList.add("scale-100");

    editDialog.classList.remove("-translate-y-28");
    editDialog.classList.remove("scale-90");
    editDialog.classList.remove("pointer-events-none");
  }


  if (buttonId.includes("exitEditBtn")) {
    
    const editDialogContainer = document.getElementById(
      `editDialogContainer${number}`
    );
    const editDialog = document.getElementById(`editDialog${number}`);
    editDialogContainer.classList.add("hidden");
    editDialogContainer.classList.add("pointer-events-none");
    editDialogContainer.classList.remove("fixed");
    editDialogContainer.classList.remove("inset-0");
    editDialogContainer.classList.remove("grid");
    editDialogContainer.classList.remove("place-items-center");
    editDialogContainer.classList.remove("bg-black");
    editDialogContainer.classList.remove("bg-opacity-60");
    editDialogContainer.classList.remove("opacity-100");
    editDialogContainer.classList.remove("backdrop-blur-sm");

    editDialog.classList.remove("opacity-100");
    editDialog.classList.remove("translate-y-0");
    editDialog.classList.remove("scale-100");

    editDialog.classList.add("-translate-y-28");
    editDialog.classList.add("scale-90");
    editDialog.classList.add("pointer-events-none");
  }


  if (buttonId.includes("next")) {
    if (isOnePageState) return;

    if (currentPage === Math.ceil(appointmentsDetails.length / 8)) return;
    currentPage++;
    pages.innerHTML = `pages ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;

    if (consultationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "consultation"
      );

      handlePagination(filteredAppointments);
    } else if (examinationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "examination"
      );
      handlePagination(filteredAppointments);
    } else {
      handlePagination(appointmentsDetails);
    }
  }



  if (buttonId.includes("previous")) {
    if (isOnePageState) return;
    if (currentPage === 1) return;
    currentPage--;
    pages.innerHTML = `pages ${currentPage} of ${Math.ceil(
      appointmentsDetails.length / 8
    )}`;
    if (consultationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "consultation"
      );

      handlePagination(filteredAppointments);
    } else if (examinationState) {
      const filteredAppointments = appointmentsDetails.filter(
        (appointment) =>
          appointment.reason.toLocaleLowerCase() === "examination"
      );
      handlePagination(filteredAppointments);
    } else {
      handlePagination(appointmentsDetails);
    }
  }

}
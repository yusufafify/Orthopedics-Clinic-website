let pages = document.getElementById("pages");

//object containing all the appointments
const appointmentsDetails = [
  {
    id: 1,
    date: "2018-01-01",
    time: "10:00",
    patient: "John Doe",
    doctor_name: "Youssef Ahmed",
    doctor_email: "hi@hmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "paid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },

  {
    id: 2,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Mahmoud Batoot",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Examination",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },

  {
    id: 3,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
  {
    id: 4,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
  {
    id: 5,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
  {
    id: 6,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
  {
    id: 7,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
  {
    id: 8,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
  {
    id: 9,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultation",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
];

pages.innerHTML = `pages 1 of ${Math.ceil(appointmentsDetails.length / 4)}`;
let currentPage = 1;

let state1 = false;
let state2 = false;
let isOnePageState=false;

function getAppointments(appointments) {
  return appointments
    .map(
      (appointment, i) =>
        `
    <tr>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex items-center gap-3">

        <div class="flex flex-col">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            ${appointment.reason}
          </p>

        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="flex flex-col">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          ${appointment.payment}
        </p>

      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <div class="w-max">
        <div
          class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap ${
            appointment.status.toLowerCase() === "paid"
              ? "bg-green-500/20"
              : "bg-red-500/20"
          } ">
          <span class="">${appointment.status}</span>
        </div>
      </div>
    </td>
    <td class="p-4 border-b border-blue-gray-50">
      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        ${appointment.date}
      </p>
    </td>
    <td class="p-4 border-b border-blue-gray-50">


    


      <button
      id="detailsbtn${i}"
      
        class="select-none rounded-lg bg-[#276973] from-gray-900  p-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
        <img src="../../../assets/imgs/eye.png" alt="" class="h-6 w-6 object-cover">
        <span class="hidden">Details</span>
      </button>
      <div data-dialog-backdrop="animated-dialog" data-dialog-backdrop-close="true"
      id="mainDialog${i}"
        class="hidden transition-opacity duration-300 opacity-0 z-[999] pointer-events-none">
        <div data-dialog="animated-dialog" data-dialog-mount=""
          data-dialog-unmount=""
          data-dialog-transition=""
          id="detailsDialog${i}"
          class="relative m-4 w-screen md:w-2/5 min-w-[100%] md:min-w-[40%] md:max-w-[40%]  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl opacity-0 -translate-y-28 scale-90 pointer-events-none transition-all duration-300">
          <div
            class="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
            <div class="flex justify-between items-center w-full">
                            <h2>Appointment Details</h2>
                            <div class="flex items-center justify-between mr-6 md:mr-0">
                              <button id="exitBtn${i}">
                                <img src="../../../assets/imgs/xIcon.png" alt="exit icon" class="h-4 w-4">
                              </button>
                            </div>
                          </div>
          </div>
          <div
            class="relative grid gap-2 grid-cols-2 p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
            <div>
              <p class="text-md font-semibold">Appintment id: <span
                  class="text-sm font-light">${appointment.id}</span></p>
            </div>
            <div>
              <p class="text-md font-semibold">Date: <span class="text-sm font-light">20/5/2024</span></p>
            </div>
            <div>
              <p class="text-md font-semibold">Doctor's name: <span
                  class="text-sm font-light">Youssef</span></p>
            </div>
            <div>
              <p class="text-md font-semibold">Doctor's email: <span
                  class="text-sm font-light">youssefahmed@gmail.com</span></p>
            </div>
          </div>
          <div
            class="flex items-center p-4 grid grid-cols-1 font-sans  antialiased leading-snug shrink-0 text-blue-gray-900">
            <h2 class="font-semibold text-md">Doctor's Note:</h2>
            ${
              appointment.doctor_notes
                ? `<p>${appointment.doctor_notes}</p>`
                : "No Notes yet"
            }
          </div>
          <div class="flex flex-wrap items-center mx-6 justify-end p-4 shrink-0 text-blue-gray-500">
            <button data-ripple-dark="true" data-dialog-close="true"
              class="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Cancel
            </button>
            <button
            id="editbtn${i}"
              class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" data-dialog-target="edit-date-dialog">
              Edit
            </button>

          </div>
        </div>
        <div data-dialog-backdrop="edit-date-dialog" data-dialog-backdrop-close="true"
        id="editDialogContainer${i}"
          class="pointer-events-none hidden h-screen w-screen opacity-0 transition-opacity duration-300">
          <div data-dialog="edit-date-dialog"
          id="editDialog${i}"
            class="relative -translate-y-28
            scale-90
            pointer-events-none mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="flex flex-col gap-4 p-6">
            <div class="flex w-full justify-between items-center">
            <h4
                class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Appointment Date
              </h4>
              <div class="flex items-center justify-between ">
                              <button id="exitEditBtn${i}">
                                <img src="../../../assets/imgs/xIcon.png" alt="exit icon" class="h-4 w-4">
                              </button>
                            </div>
            </div>
              
              <p
                class="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Enter the date you want to reschedule the appointment to.
              </p>
              <h6
                class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                Original Date
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  class="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" " value='${appointment.date}' disabled/>
                <label
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Date
                </label>
              </div>
              <h6
                class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                New Date
              </h6>


              <div class="relative h-10 w-full min-w-[100%]">
                <input id="date-picker"
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" " type="date" />
                <label
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select a Date
                </label>
              </div>

            </div>
            <div class="p-6 pt-0">
              <button
                class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                submit
              </button>

            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
    `
    )
    .join("");
}

const table_body = document.getElementById("appointment_table_body");
handlePagination(appointmentsDetails);

let consultationState = false;
let examinationState = false;

function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;
  console.log(buttonId);

  //get the number from the id of the button
  let number = buttonId.replace(/^\D+/g, "");

  if (buttonId.includes("detailsbtn")) {
    state1 = true;
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
    state1 = false;
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
    state2 = true;
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
    state2 = false;
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
    if(isOnePageState) return;

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
    if(isOnePageState) return;
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
  console.log(currentPage);
}

function handlePagination(appointments) {
  if(appointments.length===0){
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
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const currentAppointments = appointments.slice(startIndex, endIndex);
  table_body.innerHTML = getAppointments(currentAppointments);
  attachButtonEventListeners();
  if (appointments.length === 1 || appointments.length === 8) {
  isOnePageState=true;
  currentPage=1;
    pages.innerHTML = "page 1 of 1";
  } else {
    isOnePageState=false;
    pages.innerHTML = `page ${currentPage} of ${Math.ceil(appointmentsDetails.length / 8)}`;
  }
}

function attachButtonEventListeners() {
  var buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", handleButtonClick);
  });
}

// Call this function initially to attach event listeners to the buttons
attachButtonEventListeners();

//function that targets the list data-value and console logs the value
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
  if (filteredAppointments.length === 1 || filteredAppointments.length === 8) {
    isOnePageState=true;
    currentPage=1;
      pages.innerHTML = "page 1 of 1";
    } else {
      isOnePageState=false;
      pages.innerHTML = `page ${currentPage} of ${Math.ceil(appointmentsDetails.length / 8)}`;
    }

    

  handlePagination(filteredAppointments);
  //attachButtonEventListeners();
}

const list = document.querySelectorAll("[data-value]");
list.forEach((item) => {
  item.addEventListener("click", handleListClick);
});

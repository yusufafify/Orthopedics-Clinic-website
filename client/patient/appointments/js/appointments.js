//object containing all the appointments
import { getAppointments } from "../utils/getAppointments.js";
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
    time: "11:00",
    patient: "Jane Doe",
    doctor_name: "Mahmoud Batoot",

    doctor_email: "qidj@gmail.com",
    reason: "Examination",
    payment: "Insurance",
    status: "paid",
  },

  {
    id: 3,
    date: "2018-01-01",
    time: "12:00",
    patient: "Youssef",
    doctor_name: "Amr Doma",

    doctor_email: "oqudhoqd@gmail.com",
    reason: "Consultatiion",
    payment: "Cash",
    status: "UNPaid",
    doctor_notes:
      "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  },
];



document.getElementById("appointment_table_body").innerHTML =
  getAppointments(appointmentsDetails,'../../public');

function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;

  // console.log("Button clicked:", buttonId);

  //get the number from the id of the button
  let number = buttonId.replace(/^\D+/g, "");
  // console.log(number);

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
}

var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
});

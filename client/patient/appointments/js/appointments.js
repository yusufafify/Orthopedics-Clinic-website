//object containing all the appointments
import { getAppointments } from "../utils/getAppointments.js";
const appointmentsDetails = [
  // {
  //   id: 1,
  //   date: "2018-01-01",
  //   time: "10:00",
  //   patient: "John Doe",
  //   doctor_name: "Youssef Ahmed",
  //   doctor_email: "hi@hmail.com",
  //   reason: "Consultation",
  //   payment: "Cash",
  //   status: "paid",
  //   doctor_notes:
  //     "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  // },
  // {
  //   id: 2,
  //   date: "2018-01-01",
  //   time: "11:00",
  //   patient: "Jane Doe",
  //   doctor_name: "Mahmoud Batoot",
  //   doctor_email: "qidj@gmail.com",
  //   reason: "Examination",
  //   payment: "Insurance",
  //   status: "paid",
  // },
  // {
  //   id: 3,
  //   date: "2018-01-01",
  //   time: "12:00",
  //   patient: "Youssef",
  //   doctor_name: "Amr Doma",
  //   doctor_email: "oqudhoqd@gmail.com",
  //   reason: "Consultatiion",
  //   payment: "Cash",
  //   status: "UNPaid",
  //   doctor_notes:
  //     "loremiqjdq qowdqowd, qwidbqwidn, diqwdbqwdm diqwdbq,whbdiqywdkqwddoqwhdo",
  // },
];

async function getPatientAppointmentsData() {
  try{
    const response=await fetch("http://localhost:8008/get_patient_appointments",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if(data){
      appointmentsDetails.push(...data);
    }
    console.log(appointmentsDetails);
    
document.getElementById("appointment_table_body").innerHTML =
getAppointments(appointmentsDetails.slice(0, 3));
var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
});

  }catch(error){
    console.error(error);
    
  }
}
getPatientAppointmentsData();



function handleButtonClick(event) {
  // event.currentTarget is the button that the event listener is attached to
  let buttonId = event.currentTarget.id;

  // console.log("Button clicked:", buttonId);

  //get the number from the id of the button
  let number = buttonId.replace(/^\D+/g, "");
  // console.log(number);

  if (buttonId.includes("detailsbtn")) {
    const mainDialog = document.getElementById(`mainDialog${number}`);
    mainDialog.classList.remove("hidden", "pointer-events-none");

    mainDialog.classList.add(
      "fixed",
      "inset-0",
      "grid",
      "h-screen",
      "w-screen",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "backdrop-blur-sm"
    );

    setTimeout(() => {
      mainDialog.classList.add("opacity-100");
    }, 100);

    const detailsDialog = document.getElementById(`detailsDialog${number}`);

    detailsDialog.classList.add("opacity-100", "translate-y-0", "scale-100");
    detailsDialog.classList.remove(
      "-translate-y-28",
      "scale-90",
      "pointer-events-none"
    );
  }
  if (buttonId.includes("exitBtn")) {
    const mainDialog = document.getElementById(`mainDialog${number}`);
    mainDialog.classList.add("hidden", "pointer-events-none");
    mainDialog.classList.remove(
      "fixed",
      "inset-0",
      "grid",
      "h-screen",
      "w-screen",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "backdrop-blur-sm",
      "opacity-100"
    );

    const detailsDialog = document.getElementById(`detailsDialog${number}`);
    detailsDialog.classList.remove("opacity-100", "translate-y-0", "scale-100");

    detailsDialog.classList.add(
      "pointer-events-none",
      "scale-90",
      "-translate-y-28"
    );
  }
  if (buttonId.includes("editbtn")) {
    const editDialogContainer = document.getElementById(
      `editDialogContainer${number}`
    );
    const editDialog = document.getElementById(`editDialog${number}`);
    ("fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm");
    editDialogContainer.classList.remove("hidden", "pointer-events-none");
    editDialogContainer.classList.add(
      "fixed",
      "inset-0",
      "grid",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "backdrop-blur-sm"
    );

    setTimeout(() => {
      editDialogContainer.classList.add("opacity-100");
    }, 100);

    editDialog.classList.add("opacity-100", "translate-y-0", "scale-100");

    editDialog.classList.remove(
      "-translate-y-28",
      "scale-90",
      "pointer-events-none"
    );
  }
  if (buttonId.includes("exitEditBtn")) {
    const editDialogContainer = document.getElementById(
      `editDialogContainer${number}`
    );
    const editDialog = document.getElementById(`editDialog${number}`);
    editDialogContainer.classList.add("hidden", "pointer-events-none");

    editDialogContainer.classList.remove(
      "fixed",
      "inset-0",
      "grid",
      "place-items-center",
      "bg-black",
      "bg-opacity-60",
      "opacity-100",
      "backdrop-blur-sm"
    );

    editDialog.classList.remove("opacity-100", "translate-y-0", "scale-100");

    editDialog.classList.add(
      "-translate-y-28",
      "pointer-events-none",
      "scale-90"
    );
  }
}

var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
});

const historyType = document.getElementById("historyType");
const historyTitle = document.getElementById("historyTitle");
const historyDate = document.getElementById("historyDate");
const historyDescription = document.getElementById("historyDescription");
const historyFormBtn = document.getElementById("historySubmitBtn");

const historyForm = {
  historytype: historyType.value,
  titleofproblem: historyTitle.value,
  dateofproblem: historyDate.value,
  description: historyDescription.value,
};

historyType.addEventListener("change", function () {
  historyForm.historytype = historyType.value;
});

historyTitle.addEventListener("input", function () {
  historyForm.titleofproblem = historyTitle.value;
});

historyDate.addEventListener("input", function () {
  historyForm.dateofproblem = historyDate.value;
});

historyDescription.addEventListener("input", function () {
  historyForm.description = historyDescription.value;
});

async function postHistoryForm() {
  try {
    // Check if all fields in historyForm are filled
    const isFormFilled = Object.values(historyForm).every(value => !!value);

    if (!isFormFilled) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all the fields in the history form!',
      });
      return;
    }

    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 hover:bg-green-700 text-white font-md p-2 rounded",
        cancelButton: "bg-red-500 hover:bg-red-700 text-white font-md p-2 mr-2 rounded",
      },
      buttonsStyling: false,
      showConfirmButton: false, // Hide the default "OK" button
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "This action will add to medical history.",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes, add!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(
            "http://localhost:8008/add_to_medical_history",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(historyForm),
            }
          );
          const data = await response.json();
          console.log(data);
          swalWithTailwindButtons.fire({
            title: "Added!",
            text: "Information has been added to medical history.",
            icon: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Adding to medical history has been cancelled.",
            icon: "error",
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
}


historyFormBtn.addEventListener("click", postHistoryForm);

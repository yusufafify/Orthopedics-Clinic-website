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
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

historyFormBtn.addEventListener("click", postHistoryForm);

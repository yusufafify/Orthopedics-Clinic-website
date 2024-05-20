const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const form = document.getElementById("registerForm");
const name_section = document.getElementById("name_section");
const email_section = document.getElementById("email_section");
const password_section = document.getElementById("password_section");
const age_phone_section = document.getElementById("age_phone_section");
const weight_height_section = document.getElementById("weight_height_section");
const address_section = document.getElementById("address_section");
const gender_section = document.getElementById("gender_section");
const signUpBtn = document.getElementById('signUpBtn');

//input fields
const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const weight = document.getElementById("weight");
const address = document.getElementById("address");
const phone = document.getElementById("phoneNumber");
const height = document.getElementById("height");
const age = document.getElementById("age");
//gender radio button

let currentPage = 1;

function handleNext() {
  if (currentPage === 2) {
    return;
  }
  console.log(firstName.value, lastName.value, email.value, password.value);
  if (!email.value || !password.value || !firstName.value || !lastName.value) {
    const emptyFields = [email, password, firstName, lastName];
    emptyFields.forEach((field) => {
      if (!field.value) {
        field.style.borderColor = "red";
      } else {
        field.style.borderColor = "";
      }
    });
    //check on the format of the email field
    if (email.value) {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.match(emailFormat)) {
        email.style.borderColor = "red";
      } else {
        email.style.borderColor = "";
      }
    }
    return;
  } else {
    const emptyFields = [email, password, firstName, lastName];
    emptyFields.forEach((field) => {
      field.style.borderColor = "";
    });
    if (
      !email.value ||
      !password.value ||
      !firstName.value ||
      !lastName.value
    ) {
      return;
    }
    if (email.value) {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.match(emailFormat)) {
        email.style.borderColor = "red";
        return;
      } else {
        email.style.borderColor = "";
      }
    }
  }
  currentPage++;
  console.log(currentPage);
  step2.classList.add("bg-green-600");
  step2.classList.remove("bg-green-300");

  // Add sliding transition
  form.classList.remove("slide-in-from-left");
  form.classList.add("slide-in-from-right");
  name_section.classList.add("hidden", "-translate-x-[200px]");
  email_section.classList.add("hidden", "-translate-x-[200px]");
  password_section.classList.add("hidden", "-translate-x-[200px]");
  age_phone_section.classList.remove("hidden");
  weight_height_section.classList.remove("hidden");
  weight_height_section.classList.add("grid");

  address_section.classList.remove("hidden");
  gender_section.classList.remove("hidden");
  gender_section.classList.add("grid", "flex");
  setTimeout(() => {
    age_phone_section.classList.remove("translate-x-[200px]");
    weight_height_section.classList.remove("translate-x-[200px]");
    address_section.classList.remove("translate-x-[200px]");
    gender_section.classList.remove("translate-x-[200px]");
  }, 20);
}

function handlePrev() {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  console.log(currentPage);
  step2.classList.remove("bg-green-600");
  step2.classList.add("bg-green-300");
  form.classList.remove("slide-in-from-right");
  form.classList.add("slide-in-from-left");
  name_section.classList.remove("hidden");
  email_section.classList.remove("hidden");
  password_section.classList.remove("hidden");
  age_phone_section.classList.add("hidden", "translate-x-[200px]");
  weight_height_section.classList.add("hidden", "translate-x-[200px]");
  address_section.classList.add("hidden", "translate-x-[200px]");
  gender_section.classList.remove("grid", "flex");
  gender_section.classList.add("hidden", "translate-x-[200px]");

  setTimeout(() => {
    name_section.classList.remove("-translate-x-[200px]");
    email_section.classList.remove("-translate-x-[200px]");
    password_section.classList.remove("-translate-x-[200px]");
  }, 20);
}

function checkInputFields() {
  const inputFields = [email, password, firstName, lastName, weight, address, phone, height, age];
  const allFieldsFilled = inputFields.every(field => field.value.trim() !== '');
  if (allFieldsFilled) {
    signUpBtn.classList.remove('hidden');
  } else {
    signUpBtn.classList.add('hidden');
  }
}

const inputFields = [email, password, firstName, lastName, weight, address, phone, height, age];
inputFields.forEach(field => {
  field.addEventListener('input', checkInputFields);
});

nextBtn.addEventListener("click", handleNext);
prevBtn.addEventListener("click", handlePrev);

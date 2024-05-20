import { generate404 } from "./generate404.js";
import { passwordValidation } from "./passwordValidation.js";

const resetPasswordForm = document.querySelector("#resetPasswordForm");
const resetBody = document.querySelector("#resetBody");

if (!localStorage.getItem("reset_token")) {
  resetBody.innerHTML = generate404();
  resetPasswordForm.style.display = "none";
}

if (localStorage.getItem("reset_email")) {
  const email = localStorage.getItem("reset_email");
  console.log(email);
  const userEmail = document.querySelector("#email");
  userEmail.value = email;
  userEmail.disabled = true;
}

const resetPassword = async (e) => {
  e.preventDefault();
  try {
    if (!localStorage.getItem("reset_token")) {
      resetBody.innerHTML = generate404();
      resetPasswordForm.style.display = "none";
    }

    const password = document.getElementById("new_password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    //disable the email field
    if (!passwordValidation(password, confirmPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please enter the same password in both fields.',
      });
      return;
    }
    const response= await fetch(`http://localhost:8008/reset_password/${localStorage.getItem('reset_token')}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        password:confirmPassword,
      }),

    });
    const data = await response.json();
    console.log(data)
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful',
        text: 'Your password has been reset successfully.',
      });
      localStorage.removeItem("reset_token");
      localStorage.removeItem("reset_email");
      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/client/Login.html";
      }, 1500);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: 'Failed to reset the password. Please try again.',
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong. Please try again later.',
    });
  }
};

resetPasswordForm.addEventListener("submit", resetPassword);

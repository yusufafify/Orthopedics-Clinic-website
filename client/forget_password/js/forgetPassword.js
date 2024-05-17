const forgetPasswordForm = document.getElementById('forgetPasswordForm');



const forgetPassword = async (e) => {
  e.preventDefault();
  
  try {
    const email = document.getElementById('email').value;

    // Check if the email field is filled
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter your email address!',
      });
      return;
    }

    const response = await fetch('http://localhost:8008/forget_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if(response.status === 404) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No user found with this email address!',
      });
      return;
    }
    if (data.reset_token) {
      localStorage.setItem('reset_token', data.reset_token);
      localStorage.setItem('reset_email', email);
      console.log(localStorage.getItem('reset_token'));
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'A password reset email has been sent to your email address.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Failed to send the password reset email. Please try again.',
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
}

forgetPasswordForm.addEventListener('submit', forgetPassword);

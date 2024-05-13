function logout(){
localStorage.removeItem('activeAppointment')
    localStorage.removeItem('token');
    window.location.href ="http://" + window.location.host + "/client/Login/Login.html";
  }
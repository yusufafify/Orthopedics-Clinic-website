function logout(){
    localStorage.removeItem('token');
    window.location.href ="http://" + window.location.host + "/client/Login/Login.html";
  }
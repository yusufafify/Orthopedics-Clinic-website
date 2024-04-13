var sideNav = document.getElementById('sidebar');
var toggleBtn = document.getElementById('sideOpenBtn');
let closeBtn = document.getElementById('sideCloseBtn');
let state=false;
toggleBtn.addEventListener('click', function () {
  if(state){
    sideNav.classList.add('-translate-x-full');
    state=false;}
    else{
      sideNav.classList.remove('-translate-x-full');
      state=true;
    }
});
closeBtn.addEventListener('click', function () {
  if(state){
    sideNav.classList.add('-translate-x-full');
    state=false;}
    else{
      sideNav.classList.remove('-translate-x-full');
      
      state=true;
    }
});
var sideNav = document.getElementById('side-nav');
var toggleBtn = document.getElementById('toggle-btn');
let closeBtn = document.getElementById('close');
let state=false;
toggleBtn.addEventListener('click', function () {
  if(state){
    sideNav.classList.add('hidden');
    sideNav.classList.remove('absolute');
    sideNav.classList.remove('w-[200px]');
    state=false;}
    else{
      sideNav.classList.remove('hidden');
      sideNav.classList.add('absolute');
      sideNav.classList.add('w-[200px]');
      state=true;
    }
});
closeBtn.addEventListener('click', function () {
  if(state){
    sideNav.classList.add('hidden');
    sideNav.classList.remove('absolute');
    sideNav.classList.remove('w-[200px]');
    state=false;}
    else{
      sideNav.classList.remove('hidden');
      sideNav.classList.add('absolute');
      sideNav.classList.add('w-[200px]');
      state=true;
    }
});
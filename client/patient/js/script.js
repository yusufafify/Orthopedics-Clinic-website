var sideNav = document.getElementById('sidebar');
var toggleBtn = document.getElementById('sideOpenBtn');
let closeBtn = document.getElementById('sideCloseBtn');
let navLinks = document.querySelectorAll('#sidebar a');

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

// Add event listener to each nav link
navLinks.forEach((link,index) => {
  link.addEventListener('click', function() {
    // Remove the active class from all links
    navLinks.forEach(link => link.classList.remove('bg-gray-100'));

    // Add the active class to the clicked link
    if(index!==0 && index!==5){
      this.classList.add('bg-gray-100');
    }
  });
});
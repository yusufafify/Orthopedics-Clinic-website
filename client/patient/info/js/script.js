
var sideNav = document.getElementById('sidebar');
var toggleBtn = document.getElementById('sideOpenBtn');
let closeBtn = document.getElementById('sideCloseBtn');
let navLinks = document.querySelectorAll('#sidebar a');
const modal = document.getElementById('modal');
const editInfo = document.getElementById('edit_info');
const body = document.querySelector('body');
const email = document.getElementById('email');
const uploadInput = document.getElementById('upload');
const filenameLabel = document.getElementById('filename');
const imagePreview = document.getElementById('image-preview');
let initialData={}




let state=false;
let modalState=false;

//check on the change in the email input field and console log the change
email.addEventListener('input', function(){
  console.log('email changed');
  console.log('initial email:', initialData.initialEmail);
  console.log('current email:', email.value);
  if(email.value!==initialData.initialEmail){
    console.log('email changed');
  }
  else{
    console.log('email not changed');
  }
});



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




editInfo.addEventListener('click', function () {
  console.log('modal btn clicked');
  console.log(modalState);
  if(!modalState){
    body.classList.add('overflow-hidden');
    modal.classList.remove('pointer-events-none');
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    modalState=true;}
    
});


modal.addEventListener('click', function (e) {
  if(e.target.id === 'modal' && email.value === initialData.initialEmail && document.getElementById('first_name').value === initialData.initialFName && document.getElementById('last_name').value === initialData.initialLName && document.getElementById('phone').value === initialData.initialPhone && document.getElementById('address').value === initialData.initialAddress){
    body.classList.remove('overflow-hidden');
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    modal.classList.add('pointer-events-none');
    modalState=false;
  }
});

console.log(localStorage.getItem('token'));
//fetch function to get user data from the server
fetch('http://localhost:8080/personal_data',{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },

})
.then(response => response.json())
.then(data => {
  
  console.log('data:', JSON.stringify(data) );
  document.getElementById('first_name').value=data.name.split(' ')[0];
  document.getElementById('last_name').value=data.name.split(' ')[1];
  email.value=data.email;
  document.getElementById('phone').value=data.phoneNumber;
 document.getElementById('address').value=data.address;
  document.getElementById('patient_name').innerHTML=data.name + "    -"+ data.age +' years old';
  document.getElementById('patient_email').innerHTML=data.email;
  document.getElementById('patient_phone').innerHTML=data.phoneNumber;
  document.getElementById('patient_address').innerHTML=data.address;
  initialData={
    initialEmail:data.email,
    initialFName:data.name.split(' ')[0],
    initialLName:data.name.split(' ')[1],
    initialPhone:data.phoneNumber,
    initialAddress:data.address,
  }

})
.catch((error) => {
  console.error('Error:', error);
});


// Check if the event listener has been added before
let isEventListenerAdded = false;

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    filenameLabel.textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML =
        `<img src="${e.target.result}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
      imagePreview.classList.remove('border-dashed', 'border-2', 'border-gray-400');
      console.log(reader.result)

      // Add event listener for image preview only once
      if (!isEventListenerAdded) {
        imagePreview.addEventListener('click', () => {
          uploadInput.click();
        });

        isEventListenerAdded = true;
      }
    };
    reader.readAsDataURL(file);
  } else {
    filenameLabel.textContent = '';
    imagePreview.innerHTML =
      `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    imagePreview.classList.add('border-dashed', 'border-2', 'border-gray-400');

    // Remove the event listener when there's no image
    imagePreview.removeEventListener('click', () => {
      uploadInput.click();
    });

    isEventListenerAdded = false;
  }
});

uploadInput.addEventListener('click', (event) => {
  event.stopPropagation();
});
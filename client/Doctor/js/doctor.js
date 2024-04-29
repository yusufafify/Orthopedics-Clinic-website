function openImageModal(image) {
  document.getElementById('modal-image').src = image;
  document.getElementById('modal').classList.remove('hidden');
}

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.remove('opacity-0', 'pointer-events-none');
  }


function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.classList.add('opacity-0', 'pointer-events-none');
  }

  var item = document.getElementById("container1");

  window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) item.scrollLeft += 50;
    else item.scrollLeft -= 50;
  });

  function showInputField(select, inputId) {
    var input = document.getElementById(inputId);
    if (select.value == 'Other') {
      input.classList.remove('hidden');
    } else {
      input.classList.add('hidden');
    }
  }
function openModal(image) {
  document.getElementById('modal-image').src = image;
  document.getElementById('modal').classList.remove('hidden');
}

window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
    document.getElementById('modal').classList.add('hidden');
  }
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }

  var item = document.getElementById("container1");

  window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) item.scrollLeft += 50;
    else item.scrollLeft -= 50;
  });
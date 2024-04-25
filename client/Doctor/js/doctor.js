function openModal(image) {
  document.getElementById('modal-image').src = image;
  document.getElementById('modal').classList.remove('hidden');
}

function openFinalizeModal() {
    document.getElementById('finalizeModal').classList.remove('hidden');
  }

  function openEditCurrentModal() {
    document.getElementById('editCurrentModal').classList.remove('hidden');
  }

  function openCancelCurrentModal() {
    document.getElementById('cancelCurrentModal').classList.remove('hidden');
  }
  
  window.onclick = function(event) {
    if (event.target == document.getElementById('finalizeModal')) {
      document.getElementById('finalizeModal').classList.add('hidden');
    }
  }
  
  function closeFinalizeModal() {
    document.getElementById('finalizeModal').classList.add('hidden');
  }
  function closeCancelCurrentModal() {
    document.getElementById('cancelCurrentModal').classList.add('hidden');
  }
  function closeEditCurrentModal() {
    document.getElementById('editCurrentModal').classList.add('hidden');
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
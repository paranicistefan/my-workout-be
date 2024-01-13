let idToEdit;
function setName(name, id) {
  document.getElementById('editButton').disabled = false;
  document.getElementById('programNameInput').value = name;
  idToEdit = id;
}
function deleteProgram(event, id) {
  event.stopPropagation();
  fetch(`/programs/${id}`, { method: 'DELETE' })
    .then(() => window.location.reload())
    .catch((error) => console.error('Error:', error));
}
function updateProgram(event) {
  event.preventDefault();
  fetch(`/programs/${idToEdit}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: document.getElementById('programNameInput').value,
    }),
  })
    .then(() => window.location.reload())
    .catch((error) => console.error('Error:', error));
}

const addElem = document.getElementById('addProgramExercises');
const editElem = document.getElementById('editProgramExercises');
new Choices(addElem, {
  removeItemButton: true,
  placeholder: true,
  placeholderValue: 'Select your options',
});

const editSelect = new Choices(editElem, {
  removeItemButton: true,
  placeholder: true,
  placeholderValue: 'Select your options',
});

let idToEdit;
function setEditProgram(name, exercises, id) {
  console.log(exercises);
  document.getElementById('editButton').disabled = false;
  document.getElementById('programNameInput').value = name;
  editSelect.removeActiveItems();
  editSelect.setChoiceByValue(exercises.split(','));

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
      programExercises: editSelect.getValue(true).map((choice) => choice),
    }),
  })
    .then(() => window.location.reload())
    .catch((error) => console.error('Error:', error));
}

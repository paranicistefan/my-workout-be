function deleteExercise(event, id) {
  event.stopPropagation();
  fetch(`/exercises/${id}`, { method: 'DELETE' })
    .then(() => window.location.reload())
    .catch((error) => console.error('Error:', error));
}

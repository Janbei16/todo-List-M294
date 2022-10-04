document.addEventListener("DOMContentLoaded", () => {
  const inputTitle = document.getElementById("inputTitle");
  const newTaskForm = document.getElementById("newTaskForm");
  const taskListElement = document.getElementById("table");
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputTitle.value,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  });
});

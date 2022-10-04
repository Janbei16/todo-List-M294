function showTasks(tasks) {
  const taskTable = document.getElementById("table");
  taskTable.replaceChildren();
  tasks.forEach((task) => {
    const taskId = document.createElement("td");
    const taskTitle = document.createElement("td");
    const taskDeleteCell = document.createElement("td");
    const taskEditCell = document.createElement("td");
    const tableColums = document.createElement("tr");
    const tabledelete = document.createElement("button");
    const tableEdit = document.createElement("button");
    //Hier wird die Delete Funktion gemacht
    tabledelete.innerText = "Delete";
    tabledelete.onclick = () => {
      if (confirm("Are you sure you want to delete the task")) {
        fetch(`http://localhost:3000/task/${task.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            loadTasks();
          });
      }
    };

    tableEdit.innerText = "Edit";
    tableEdit.onclick = () => {
      fetch("http://localhost:3000/tasks", {
        method: "Put",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          title: inputTitle.value,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          window.location.reload();
        });
    };

    taskId.innerText = task.id;
    taskTitle.innerText = task.title;

    taskTitle.className = "taskTitle";
    taskTitle.id = task.id;
    taskDeleteCell.append(tabledelete);
    taskEditCell.append(tableEdit);

    taskTable.append(tableColums);
    tableColums.append(taskId, taskTitle, taskDeleteCell, taskEditCell);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function loadTasks() {
  fetch("http://localhost:3000/tasks", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      showTasks(data);
    });
}

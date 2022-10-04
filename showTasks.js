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
    tabledelete.innerText = "🗑️";
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

    // Hier wird die Edit Funktion gemacht

    tableEdit.innerText = "✏️";
    tableEdit.onclick = () => {
      if (confirm("Want you to edit this Task?")) {
        inputTitle.value = task.title;
        inputId.value = task.id;
      }
    };

    // Hier werden die Daten vorbereitet für die übergabe

    taskId.innerText = task.id;
    taskTitle.innerText = task.title;

    taskTitle.className = "taskTitle";
    taskTitle.id = task.id;

    // Hier werden die Daten in Delete und in Edit Cell eingefügt(append)
    taskDeleteCell.append(tabledelete);
    taskEditCell.append(tableEdit);
    taskTable.append(tableColums);
    // Hier wird alles in die Colums gepackt.
    tableColums.append(taskId, taskTitle, taskDeleteCell, taskEditCell);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// Läd die Tasks
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

function updateTask() {
  fetch("http://localhost:3000/tasks", {
    method: "Put",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: inputId.value,
      title: inputTitle.value,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload();
    });
}

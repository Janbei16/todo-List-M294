function showTasks(tasks) {
    const taskTable = document.getElementById("table")
    tasks.forEach((task) => {
        const taskId = document.createElement('td');
        const taskTitle = document.createElement('td');
        const tableColums = document.createElement('tr');


        taskId.innerText = task.id;
        taskTitle.innerText = task.title;

        taskTitle.className = "taskTitle";
        taskTitle.id = task.id;

        taskTable.appendChild(tableColums);
        tableColums.appendChild(taskId);
        tableColums.appendChild(taskTitle);
    })

}

document.addEventListener("DOMContentLoaded", () => {

    const idArray = [];
    const titleArray = [];
    
    
    fetch("http://localhost:3000/tasks", {
        method: 'GET',
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => {
            showTasks(data);
            for (let i = 0; i < data.length; i++) {
                idArray.push(data[i].id);
                titleArray.push(data[i].title);
            }

        }
        );
})
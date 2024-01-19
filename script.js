const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const saveButton = document.getElementById("save-btn");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", addTask);
saveButton.addEventListener("click", saveTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", toggleTaskCompleted);
        newTask.appendChild(checkbox);

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;
        newTask.appendChild(taskContent);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", () => deleteTask(newTask));
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);
        taskInput.value = "";

    }
}

function toggleTaskCompleted() {
    this.parentNode.classList.toggle("completed");
}

function deleteTask(task) {
    const taskText = task.children[1].textContent.trim();
    
    const isSavedTask = getSavedTasks().includes(taskText);
    if (isSavedTask) {
        const confirmation = window.confirm("This task is saved. Are you sure you want to delete it from saved tasks?");
        
        if (!confirmation) {
            return;
        }
    }

    task.remove();
    saveTasks();
    showFeedback("Task deleted successfully!", "red");
}

function getSavedTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}


function saveTasks() {
    const tasks = Array.from(taskList.children)
        .map(task => task.children[1].textContent.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    showFeedback("Tasks saved successfully!", "green");
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        taskList.innerHTML = "";
        tasks.forEach(taskText => {
            const newTask = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", toggleTaskCompleted);
            newTask.appendChild(checkbox);

            const taskContent = document.createElement("span");
            taskContent.textContent = taskText;
            taskContent.addEventListener("click", toggleTaskCompleted);
            newTask.appendChild(taskContent);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            deleteButton.addEventListener("click", () => deleteTask(newTask));
            newTask.appendChild(deleteButton);

            taskList.appendChild(newTask);
        });
    }
}

function showFeedback(message, color) {
    
    const feedbackMessage = document.getElementById("feedback-message");
    feedbackMessage.textContent = message;
    feedbackMessage.style.color = color;

    
    setTimeout(() => {
        feedbackMessage.textContent = "";
    }, 2000);
}

loadTasks();

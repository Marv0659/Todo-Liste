const taskList = document.getElementById("taskList");
const taskStringInput = document.getElementById("taskString");
const quantityInput = document.getElementById("quantity");
const undoButton = document.querySelector("button");
const addTaskBttn = document.querySelector("#addTaskbtn");
const undoBttn = document.querySelector("#undoTaskbtn");

addTaskBttn.addEventListener("click",addTask);
undoBttn.addEventListener("click", undoDeletion);

let tasks = [];
let deletedTasks = [];
let completedTasks = [];

function addTask() {
    const taskString = taskStringInput.value;
    const quantity = quantityInput.value;
     const taskId = tasks.length + 1;

        if (taskString && quantity) {
            tasks.push({ id: taskId, taskString, quantity });
            renderTasks();
            clearInputs();
            }
        }

function undoDeletion() {
     if (deletedTasks.length > 0) {
            const undoneTask = deletedTasks.pop();
            tasks.push(undoneTask);
            tasks.sort((a, b) => a.id - b.id);
            renderTasks();
            }
        }

        function deleteTask(taskId) {
            const taskIndex = tasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                const deletedTask = tasks.splice(taskIndex, 1)[0];
                deletedTasks.push(deletedTask);
                renderTasks();
            }
        }

        function markAsDone(taskId) {
            const taskIndex = tasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                const completedTask = tasks.splice(taskIndex, 1)[0];
                completedTasks.push(completedTask);
                renderTasks();
                renderCompletedTasks();
            }
        }



        

        function clearInputs() {
            taskStringInput.value = "";
            quantityInput.value = "";
        }

        function renderTasks() {
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = `( ${task.id} ), ${task.taskString} | ${task.quantity}`;
                const deleteButton = document.createElement("button");
                const doneButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                doneButton.textContent = "Done";
                doneButton.onclick = () => markAsDone(task.id);
                deleteButton.onclick = () => deleteTask(task.id);
                li.appendChild(deleteButton);
                li.appendChild(doneButton);
                taskList.appendChild(li);
            });
        }

        function renderCompletedTasks() {
            completedTaskList.innerHTML = "";
            completedTasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = `( ${task.id} ), ${task.taskString} | ${task.quantity}`;
                completedTaskList.appendChild(li);
            });
        }
const taskList = document.getElementById("taskList");
const taskStringInput = document.getElementById("taskString");
const quantityInput = document.getElementById("quantity");
const undoButton = document.querySelector("button");

let tasks = [];
let deletedTasks = [];

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

        function clearInputs() {
            taskStringInput.value = "";
            quantityInput.value = "";
        }

        function renderTasks() {
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = `ID: ${task.id}, Task: ${task.taskString}, Quantity: ${task.quantity}`;
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteTask(task.id);
                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        }
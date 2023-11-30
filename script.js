const addTaskBtnText = document.querySelector("#addTaskBtnText");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskTextInput = document.querySelector("#taskTextInput");
const tasksContainer = document.querySelector("#tasksContainer");

const arrayWithTasks = [];

addTaskBtnText.addEventListener('mousedown', function () {
    this.classList.add('animated');
});

addTaskBtnText.addEventListener('animationend', function () {
    this.classList.remove('animated');
});

addTaskBtn.addEventListener('mousedown', function () {
    this.classList.add('animated');
});

addTaskBtn.addEventListener('animationend', function () {
    this.classList.remove('animated');
});

taskTextInput.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 13)
    {
        addTaskBtnText.classList.add('animated');
        addTaskBtnText.addEventListener('animationend', function () {
            this.classList.remove('animated');
        });
        return createTask();
    }
});

function createCheckBtn(containerForTask) {
    containerForTask.insertAdjacentHTML("afterbegin", `
    <input class="checkboxes" type="checkbox"> 
`);
}

function createDeleteBtn(containerForTask) {
    containerForTask.insertAdjacentHTML("beforeend", `
    <div class="deleteBtn" onclick="deleteTaskContainer(event)">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" 
            width="20" height="20" viewBox="0 0 50 50">
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 
                L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 
                L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 
                L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                stroke-width="2"
                fill="none">
            </path>
        </svg>
    </div>
`);
}

function deleteTaskContainer(event) {
    let container = event.target.closest('.containerForTask');

    container.classList.add('containerDeleteAnimation');

    container.addEventListener('animationend', function() {
        container.remove();
    }, { once: true });
}

function createTask() {
    let text = taskTextInput.value;
    if (text.length < 1)
        return;

    let length = arrayWithTasks.length;
    let containerForTask = document.createElement("div");
    containerForTask.className = "containerForTask";

    let task = document.createElement("div");
    task.className = "task";
    task.textContent = taskTextInput.value;

    containerForTask.append(task);
    createCheckBtn(containerForTask);
    createDeleteBtn(containerForTask);

    tasksContainer.append(containerForTask);
    taskTextInput.value = "";
}
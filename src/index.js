import './style.css';

/* 
const addTaskForm = document.querySelector(".addTaskForm");
const addTaskButton = document.querySelector(".addTask-button");
const closeAddTask = document.querySelector(".exitAddTask");

function popupShow() {
    addTaskForm.classList.add("show");
}

function popupExit() {
    addTaskForm.classList.remove("show");
}
addTaskButton.addEventListener('click', () => {
    popupShow();
});

closeAddTask.addEventListener('click', ()=> {
    popupExit();
});
 */

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addTask-button");
const closeButton = document.querySelector(".exitAddTask");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

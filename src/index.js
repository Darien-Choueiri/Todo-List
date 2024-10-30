import './style.css';
import { inbox, displayInbox } from "./inbox.js"
import today from "./today.js"
import week from "./week.js"
import { Task, addTask, myTasks } from "./addTask.js" 

inbox();

//switch between the pages
const inboxBtn = document.querySelector("#inboxBtn");
const todayBtn = document.querySelector("#todayBtn");
const weekBtn = document.querySelector("#weekBtn");

inboxBtn.addEventListener("click", () => {
    inbox();
}); 

todayBtn.addEventListener("click", () => {
    today();
}); 

weekBtn.addEventListener("click", () => {
    week();
}); 

//open and closing popup window for add task form
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addTask-button");
const closeButton = document.querySelector(".exitAddTask");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

//add task
const submit = document.querySelector('form');

submit.addEventListener('submit', (event) => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;
    const task = new Task(title, description, dueDate, priority);
    addTask(task);
    event.preventDefault();
    dialog.close();  
    displayInbox(myTasks);
});


import './style.css';
import { inboxPage, displayInbox } from "./inbox.js"
import { todayPage, displayToday } from "./today.js"
import { weekPage, displayWeek } from "./week.js"
import { Task, addTask, myTasks, removeTask, editTask } from "./addTask.js" 
import { format, eachWeekOfInterval, add, isBefore, nextSunday } from "date-fns"
inboxPage();

//switch between the pages
let page = 1;
const inboxBtn = document.querySelector("#inboxBtn");
const todayBtn = document.querySelector("#todayBtn");
const weekBtn = document.querySelector("#weekBtn");

inboxBtn.addEventListener("click", () => {
    inboxPage();
    page  = 1;
    displayTask(page);
}); 

todayBtn.addEventListener("click", () => {
    todayPage();
    page = 2;
    displayTask(page);
}); 

weekBtn.addEventListener("click", () => {
    weekPage();
    page = 3;
    displayTask(page);
}); 

//open and closing popup window for add task form
const dialog = document.querySelector("dialog");

const showButton = document.querySelector(".addTask-button");
const closeButton = document.querySelector(".exitAddTask");
const closeButtonEdit = document.querySelector('.exitEditTask');

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

closeButtonEdit.addEventListener("click", () => {
    dialogEdit.close();
});

//add task
const submit = document.querySelector('#dialog>form');

submit.addEventListener('submit', (event) => {

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = format(document.querySelector('#dueDate').value.replace(/-/g, '/'), 'MMM dd');
    const priority = document.querySelector('#priority').value;
    const task = new Task(title, description, dueDate, priority, title+description+dueDate+priority);

    addTask(task);
    event.preventDefault();
    dialog.close();  
    displayTask(page);  
});

//display task
const date = new Date();
const today = format(date, 'MMM dd');

const endWeek = format(nextSunday(date), 'MMM dd');

function displayTask(page){
    switch(page){
        case 1:
            displayInbox(myTasks);
            break;
        case 2: 
            displayInbox(myTasks.filter((task) => task.dueDate == today));
            break;
        case 3: 
            displayInbox(myTasks.filter((task) => isBefore(task.dueDate, endWeek)));
    }
}

//remove task
document.addEventListener("click", (e) => {
    const target = e.target.closest(".removeTask");
    
    if(target){
        console.log(target.id);
        removeTask(target.id);
        target.parentNode.remove();
        console.log(myTasks);
    }

});

//edit task
const dialogEdit = document.querySelector("#dialogEdit");

document.addEventListener("click", (e) => {
    const target = e.target.closest(".editTask");
    
    if(target){
        dialogEdit.showModal();
        dialogEdit.value = target.id;
    }
});

const submitEdit = document.querySelector('#dialogEdit>form');

submitEdit.addEventListener('submit', (event) => {
    console.log('submit Edit was clicked');
    console.log(dialogEdit.value);

    const title = document.querySelector('#dialogEdit #title').value;
    const description = document.querySelector('#dialogEdit #description').value;
    const dueDate = format(document.querySelector('#dialogEdit #dueDate').value.replace(/-/g, '/'), 'MMM dd');
    const priority = document.querySelector('#dialogEdit #priority').value;
    const task = new Task(title, description, dueDate, priority, title+description+dueDate+priority);

    
    editTask(task, dialogEdit.value);

    console.log(myTasks);
    event.preventDefault();
    dialogEdit.close();  
    displayTask(page);  
});

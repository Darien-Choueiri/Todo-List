import './style.css';
import { inboxPage, displayInbox } from "./inbox.js"
import { todayPage } from "./today.js"
import { weekPage} from "./week.js"
import { Task, addTask, myTasks, removeTask, editTask } from "./addTask.js" 
import { format, isBefore, isAfter, nextSunday } from "date-fns"
import { myProjects, projectAddTask, createProject, displayProjects, displayProjectItems, removeTaskFromProject, removeProject} from "./projects.js"


let category = 'default';

inboxPage();

//optimization to do: combine the getting of values from a form into a function to avoid replication

displayProjects();

//local storage
(function() { 
    // Saving
    saving();
})();

function saving(){
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
}

//switch between the pages
let page = 1;
const inboxBtn = document.querySelector("#inboxBtn");
const todayBtn = document.querySelector("#todayBtn");
const weekBtn = document.querySelector("#weekBtn");

inboxBtn.addEventListener("click", () => {
    inboxPage();
    page  = 1;
    category = 'default';
    displayTask(page);
}); 

todayBtn.addEventListener("click", () => {
    todayPage();
    page = 2;
    category = 'default';
    displayTask(page);
}); 

weekBtn.addEventListener("click", () => {
    weekPage();
    page = 3;
    category = 'default';
    displayTask(page);
}); 

//open and closing popup window for add task form and edit task form
const dialog = document.querySelector("dialog");

const showButton = document.querySelector(".addTask-button");
const closeButton = document.querySelector(".exitAddTask");
const closeButtonEdit = document.querySelector('.exitEditTask');
const closeAddProject = document.querySelector('.exitAddProject');

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

closeButtonEdit.addEventListener("click", () => {
    dialogEdit.close();
});

closeAddProject.addEventListener("click", () => {
    dialogProject.close();
})
//add task
const submit = document.querySelector('#dialog>form');

submit.addEventListener('submit', (event) => {

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = format(document.querySelector('#dueDate').value.replace(/-/g, '/'), 'MMM dd');
    const priority = document.querySelector('#priority').value;
    const key = title+description+dueDate+priority;
    if (myTasks.find(o => o.key === key)) {
        alert("Task is not unique.");
    } else {
        const task = new Task(title, description, dueDate, priority, key);
        addTask(task);   
        projectAddTask(category, task);
        saving();
    }
    event.preventDefault();
    dialog.close();  
    if (category === 'default'){
        displayTask(page);  
    } else {
        displayProjectItems(category);
    }

});

//display task
const date = new Date();
const lastWeek = format(date.getTime() - 1000*60*60*24*7, 'MMM dd');
const today = format(date, 'MMM dd');

const endWeek = format(nextSunday(date), 'MMM dd');

console.log(`the monday: ${lastWeek}`);
console.log(date);
function displayTask(page){
    switch(page){
        case 1:
            displayInbox(myTasks);
            break;
        case 2: 
            displayInbox(myTasks.filter((task) => task.dueDate == today));
            break;
        case 3: 
            displayInbox(myTasks.filter((task) => isBefore(task.dueDate, endWeek) && isAfter(task.dueDate, lastWeek)));
    }
}

//remove task
document.addEventListener("click", (e) => {
    const target = e.target.closest(".removeTask");
    
    if(target){
        console.log(target.id);
        removeTaskFromProject(category, target.id);
        
        displayProjectItems(category);

        removeTask(target.id);
        saving();
        target.parentNode.remove();
        console.log(myTasks);
    }

});

//edit task
const dialogEdit = document.querySelector("#dialogEdit");

document.addEventListener("click", (e) => {
    const target = e.target.closest(".editTask");
    
    //setting up values of the task onto the form
    if(target){
        dialogEdit.showModal();
        dialogEdit.value = target.id;

        let task = myTasks.find(t => t.key === target.id);

        document.querySelector('#dialogEdit #title').value = task.title;
        document.querySelector('#dialogEdit #description').value = task.description;
        document.querySelector('#dialogEdit #dueDate').value = task.dueDate;
        document.querySelector('#dialogEdit #priority').value = task.priority;
    }
});

//editing task values
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
    //saving();

    console.log(myTasks);
    displayTask(page); 
    
    event.preventDefault();
    dialogEdit.close();  
     
});

//check task viusal identifier only
document.addEventListener("click", (e) => {
    const target = e.target.closest(".checkTask");
    
    if(target){
        target.nextElementSibling.classList.toggle('crossOut');
    }

});

//create a project
const addProject = document.querySelector(".sidebar-projects button");
const dialogProject = document.querySelector("#dialogProject");

addProject.addEventListener("click", () => {
    dialogProject.showModal();
});

const submitProject = document.querySelector('#dialogProject>form');

submitProject.addEventListener("click", (event) => {
     console.log('create project clicked');
    const projectName = document.querySelector('#project').value;
    console.log('project name obtained');
    console.log(projectName);
    createProject(projectName);

    saving();
    event.preventDefault();
    dialogProject.close(); 
    displayProjects();
});


//switch pages for each project
document.addEventListener("click", (e) => {
    const target = e.target.closest(".projectSelect");
    
    if(target){
        console.log(`button wrok ${target.innerHTML}`);
        
        const project = target.innerHTML;
        category = project;

        document.querySelector(".main-title").innerHTML = project.charAt(0).toUpperCase() + project.slice(1);

        displayProjectItems(category);
    }
});

//delete projects 
document.addEventListener("click", (e) => {
    const target = e.target.closest(".projectDelete");
    
    if(target){
        console.log(`button wrok ${target.innerHTML}`);
        
        const project = target.previousSibling.innerHTML;
        category = project;

        removeProject(category);
        saving();
        displayProjects();
        //send display page to inbox if there are no projects
        if (myProjects.length === 0){
            inboxPage();
            page  = 1;
            category = 'default';
            displayTask(page);
        }
    }
});

import './style.css';
import inbox from "./inbox.js"
import today from "./today.js"
import week from "./week.js"

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

//open and closing sidebar 
const sidebarButton = document.querySelector(".sidebar-title > button");
const sidebar = document.querySelector(".sidebar");


sidebarButton.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebarButton.classList.toggle("collapsed");
});

import { myTasks } from "./addTask.js"

function inboxPage() {
    const title = document.querySelector(".main-title");
    title.textContent = "Inbox";
};

const display = document.querySelector('#tasks');

function displayInbox(tasks) {
    display.innerHTML = '';
    tasks.forEach(function (task){
        const checkbox = document.createElement('input');
        const section = document.createElement('div');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const dueDate = document.createElement('div');
        const priority = document.createElement('div');
        
        title.innerHTML = task.title;
        description.innerHTML = task.description;
        dueDate.innerHTML = task.dueDate;
        priority.innerHTML = task.priority;

        checkbox.type = 'checkbox';
        checkbox.name = 'checkbox';
        checkbox.id = `${task.title + task.description + task.dueDate + task.priority}`
        section.classList.add('task');

        
        section.appendChild(checkbox);
        section.appendChild(title);
        section.appendChild(dueDate);
        display.appendChild(section);
    });
}

export { inboxPage, displayInbox };
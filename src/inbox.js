import { myTasks } from "./addTask.js"

function inbox() {
    const title = document.querySelector(".main-title");
    title.textContent = "Inbox";
};

const display = document.querySelector('#tasks');

function displayInbox() {
    display.innerHTML = '';
    myTasks.forEach(function (task){
        const section = document.createElement('div');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const dueDate = document.createElement('div');
        const priority = document.createElement('div');

        title.innerHTML = task.title;
        description.innerHTML = task.description;
        dueDate.innerHTML = task.dueDate;
        priority.innerHTML = task.priority;

        section.classList.add('task');

        section.appendChild(title);
        section.appendChild(description);
        section.appendChild(dueDate);
        section.appendChild(priority);

        display.appendChild(section);
    });
}

export { inbox, displayInbox };
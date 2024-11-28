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
        const edit = document.createElement('button');
        const remove = document.createElement('button');
        

        edit.innerHTML = 'edit';
        remove.innerHTML = 'delete';
        title.innerHTML = task.title;
        description.innerHTML = task.description;
        dueDate.innerHTML = task.dueDate;
        priority.innerHTML = task.priority;

        
        edit.classList.add('editTask');
        remove.classList.add('removeTask');
        checkbox.type = 'checkbox';
        checkbox.name = 'checkbox';

        edit.id = task.key;
        remove.id = task.key;
        
        section.classList.add('task');

        
        section.appendChild(checkbox);
        section.appendChild(title);
        section.appendChild(dueDate);
        section.appendChild(edit);
        section.appendChild(remove);

        display.appendChild(section);
    });
}

export { inboxPage, displayInbox };
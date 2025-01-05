import { removeTaskFromProject } from "./projects.js" 

//add task
let myTasks = JSON.parse(localStorage.getItem("mytasks") || "[]");

class Task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.key = title+description+dueDate+priority;
    }
}

function addTask(task) {
    myTasks.push(task);
    console.log(myTasks);
}

function removeTask(task){
    let pos = myTasks.findIndex(t => t.key === task);
    myTasks.splice(pos, 1);
}

function editTask(task, oldTask){
    let pos = myTasks.findIndex(x => x.key === oldTask);
    myTasks[pos] = task;

}

export { Task, addTask, myTasks, removeTask, editTask };



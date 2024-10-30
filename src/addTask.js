//add task
const myTasks = [];

class Task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function addTask(task) {
    myTasks.push(task);
    console.log(myTasks);
}

export { Task, addTask, myTasks };



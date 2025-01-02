import { displayInbox } from "./inbox.js"

let myProjects= [];

class Project {
    constructor(title){
        this.title = title;
        this.tasks = [];
    }
};

const first = new Project("default");
myProjects.push(first);
console.log(myProjects);

function projectAddTask(project, task) {
    let s = myProjects.find(o => o.title === project);
    s.tasks.push(task);
}

function createProject(name) {
    if (name.length === 0) {
        alert("Project name can not be blank.");
    }
    else if(myProjects.find(o => o.title === name)) {
        alert("Project name already in use.");
    } else {
        const project = new Project(name);
        myProjects.push(project);
    }
};

const projectSection = document.querySelector('.sidebar-projects > ul');

function displayProjects(){
    projectSection.innerHTML = "";
    myProjects.forEach((project) => {
        console.log(project.title);
        const projectDisplay = document.createElement('li');
        const projectBtn = document.createElement('button');
        projectBtn.innerHTML = project.title;
        projectBtn.classList.add('projectSelect');
        projectDisplay.append(projectBtn);
        projectSection.append(projectDisplay);  
    });
}

function displayProjectItems(category){
    const project = myProjects.find(o => o.title === category);
    displayInbox(project.tasks);
};

function removeTaskFromProject(category, task) {
    const p = myProjects.findIndex(o => o.title === category);
    const s = myProjects[p].tasks.findIndex(o => o.key === task);
    myProjects[p].tasks.splice(s, 1); 
};

export {myProjects, projectAddTask, createProject, displayProjects, displayProjectItems, removeTaskFromProject}

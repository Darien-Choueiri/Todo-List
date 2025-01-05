import { displayInbox } from "./inbox.js"

let myProjects= JSON.parse(localStorage.getItem("myProjects") || "[]");

class Project {
    constructor(title){
        this.title = title;
        this.tasks = [];
    }
};

if (myProjects.length === 0){
    const first = new Project("default");
    myProjects.push(first);
    console.log(myProjects);
}

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
        const deleteProject = document.createElement('button');

        deleteProject.classList.add('projectDelete');
        projectBtn.innerHTML = project.title;
        deleteProject.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
         height="18px" viewBox="0 -960 960 960" width="18px" fill="current 
         color"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 
         56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
        projectBtn.classList.add('projectSelect');

        projectDisplay.append(projectBtn);
        projectDisplay.append(deleteProject);
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

function removeProject(category){
    const p = myProjects.findIndex(o => o.title === category);
    myProjects.splice(p, 1);
}

export {myProjects, projectAddTask, createProject, displayProjects, displayProjectItems, removeTaskFromProject, removeProject}

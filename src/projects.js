let myProjects= [];

class Project {
    constructor(title){
        this.title = title;
        this.tasks = [];
    }
};

const first = new Project("default");
myProjects.push(first);

function projectAddTask(project) {
    project.tasks.push(task);
}

function projectPage() {
    const title = document.querySelector(".main-title");
    title.textContent = "Week";
};

function createProject(name) {
    const project = new Project(name);
    myProjects.push(project);
};

const projectSection = document.querySelector('.sidebar-projects > ul');

function displayProjects(){
    
    myProjects.forEach((project) => {
        console.log(project.title);
        const projectDisplay = document.createElement('li');
        projectDisplay.innerHTML = project.title;
        projectSection.append(projectDisplay);  
    });
}



export {Project, myProjects, projectAddTask, createProject, displayProjects}

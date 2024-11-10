import { DOM } from "./DOM";
import { main } from "./main";
import projectIcon from "../../assets/images/project.png";
import closeIcon from "../../assets/images/close.png";

export function projects() {

  const myProjects = [];
  let currentProject;

  const projectListCon = DOM.projectListCon;
  const addProjectBtn = DOM.addProjectBtn;
  const projectForm = DOM.projectForm;
  const projectInput = DOM.projectInput;
  const cancelBtn = DOM.formBtns.cancelBtn;
  const mainCon = DOM.mainCon
  const mainProjectCon = DOM.mainProjectCon
  const projectTitle = DOM.projectTitle
  let myTask = main.myTask;

  //event listener for add project button
  addProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();

    addProjectBtn.style.display = "none";
    projectForm.style.display = "grid";
    projectInput.focus();
  });

  //event listener for form input, triggers while typing
  projectInput.addEventListener("input", () => {
    projectInput.setCustomValidity("");
  });

  //event listener "submit" for form 
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm)
    const formEntries = Object.fromEntries(formData.entries());    
  
    const isDuplicate = myProjects.some(project => {
      if(project.trim().toLowerCase() === formEntries.projectName.trim().toLowerCase()){
        return true;
      }
    });

    if(isDuplicate) {
      projectInput.setCustomValidity("Project already exist!!");
      projectInput.reportValidity();
      return;
    }

    myProjects.push(formEntries.projectName);
    renderListOfProjects();
    projectForm.style.display = "none";
    addProjectBtn.style.display = "flex";
    projectForm.reset();

    if(myProjects.length > 0){
      const lastProject = myProjects[myProjects.length - 1]
      const projectElement = document.querySelectorAll(".my-project-element-container");
      const lastProjectElement = projectElement[projectElement.length - 1];
      
      currentProject = lastProject;
      console.log(currentProject);
      
      main.displayProjectToMain(currentProject, lastProjectElement);
    }
  
   
    console.log(myProjects);
    
  });

  //event listener for form cancel button
  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();

    projectForm.style.display = "none";
    addProjectBtn.style.display = "flex"
    projectForm.reset();
  });


  function renderListOfProjects() {
    projectListCon.innerHTML = "";

    myProjects.forEach((project,index) => {
      const myProjectEl = document.createElement("div");
      const taskNameCon = document.createElement("div");
      const removeBtn = document.createElement("button");
      const removeBtnIconEl = document.createElement("img");
      const projectIconEl = document.createElement("img");

      projectIconEl.src = projectIcon; 
      removeBtnIconEl.src = closeIcon
      removeBtn.appendChild(removeBtnIconEl);
      myProjectEl.classList.add("my-project-element-container");
      taskNameCon.classList.add("my-project-element")
      projectIconEl.classList.add("project-icon");
      removeBtnIconEl.classList.add("close-icon");

      taskNameCon.textContent = project
      
      myProjectEl.append(projectIconEl, taskNameCon, removeBtn);
      projectListCon.appendChild(myProjectEl);
  
      
      

      //event listener for remove project button
      removeBtn.addEventListener("click", (event) => {
        event.preventDefault();

        myProjects.splice(index, 1);
        renderListOfProjects();
    
        //if a project is remove then the task that have name of the project will be remove also
        console.log("myTask before:", myTask);
        myTask = myTask.filter(task => task.projectName !== project)
        console.log("myTask after:", myTask);
        
        if(myProjects.length > 0) {
          const lastProject = myProjects[myProjects.length - 1]
          const projectElement = document.querySelectorAll(".my-project-element-container");
          const lastProjectElement = projectElement[projectElement.length - 1];
          
          currentProject = lastProject;
          console.log(currentProject);
          
          main.displayProjectToMain(currentProject, lastProjectElement);
        }else {
          currentProject = null;
          mainCon.removeChild(mainProjectCon)
        }
       

      });

      //display the project to main
      taskNameCon.addEventListener("click", () => {
        currentProject = project
        main.displayProjectToMain(project, myProjectEl);

        console.log("From clicked project element",currentProject);
      });

    }); 
  }


  return {
    myProjects,
    getCurrentProject: () => currentProject 
  }
}

export const sidebarProject = projects();
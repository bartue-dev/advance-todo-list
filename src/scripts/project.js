import { createDOM } from "./DOM";
import { createMain } from "./main";
import { sidebarStatus } from "./status";
import { handlersFunctions } from "./handlers";
import projectIcon from "../../assets/images/project.png";
import closeIcon from "../../assets/images/close.png";

export const sidebarProject = (() => {
  const myProjects = JSON.parse(localStorage.getItem("project")) || [];
  let myTask = createMain.myTask;
  let currentProject;

  function projectState() {
    const currentProjectEl = localStorage.getItem("viewStatus");
    //if(currentProjectEl !== null){
      const projectElements = document.querySelectorAll(".my-project-element");

      let i = 0
      while (i < projectElements.length) {
        if(projectElements[i].textContent === currentProjectEl){
          projectElements[i].click();
          break;
        }
        i++
      }
    //}
  }

  const projectListCon = createDOM.projectListCon;
  const addProjectBtn = createDOM.addProjectBtn;
  const projectForm = createDOM.projectForm;
  const projectInput = createDOM.projectInput;
  const cancelBtn = createDOM.formBtns.cancelBtn;
  const mainCon = createDOM.mainCon
  const mainProjectCon = createDOM.mainProjectCon


  const noProjectMessage = document.createElement("div");
  noProjectMessage.classList.add("no-project-message")
  noProjectMessage.textContent = "Your project list is empty. Time to create a new one"
  mainCon.appendChild(noProjectMessage);
  

 // renderListOfProjects();

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
      
      createMain.displayProjectToMain(currentProject, lastProjectElement);
    }
  
    if(mainCon.contains(sidebarStatus.statusName)){
      mainCon.removeChild(sidebarStatus.statusName)
    }

    if(mainCon.contains(handlersFunctions.emptyMessageCon)){
      handlersFunctions.emptyMessageCon.style.display = "none"
    }

  
    handlersFunctions.saveProjectToLocalStorage(myProjects);
   
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
        removeTaskFromProject(project);
        console.log("myTask after:", myTask);
        
        //update the state of the project. If project remove it will display the last project name in the main and also all of its tasks
        if(myProjects.length > 0) {
          const lastProject = myProjects[myProjects.length - 1]
          const projectElement = document.querySelectorAll(".my-project-element-container");
          const lastProjectElement = projectElement[projectElement.length - 1];
          
          currentProject = lastProject;
          console.log(currentProject);
          
          createMain.displayProjectToMain(currentProject, lastProjectElement);
        }
        //if the myProject.length is 0 then it removes the mainProjectElement from the main container
        else if(myProjects.length === 0) {
          currentProject = null;
          mainCon.removeChild(mainProjectCon);
          noProjectMessage.style.display = "block"

        }
       
        handlersFunctions.saveProjectToLocalStorage(myProjects);
        handlersFunctions.saveTaskToLocalStorage(myTask)


      });

      //display the project to main
      taskNameCon.addEventListener("click", () => {
        currentProject = project
        createMain.displayProjectToMain(project, myProjectEl);

        const containers = {
          tomorrowListTaskCon: createMain.tomorrowListTaskCon,
          todayListCon: createMain.todayListCon,
          completedListTaskCon: createMain.completedListTaskCon
        }

        Object.values(containers).forEach(container => {
          if(mainCon.contains(container)){
            mainCon.removeChild(container)
          }
        })

        if(mainCon.contains(sidebarStatus.statusName)){
          mainCon.removeChild(sidebarStatus.statusName)
        }

        if(mainCon.contains(handlersFunctions.emptyMessageCon)){
          handlersFunctions.emptyMessageCon.style.display = "none"
        }

        localStorage.setItem("viewStatus", project)
      });


    }); 

    handlersFunctions.saveProjectToLocalStorage(myProjects);
    handlersFunctions.saveTaskToLocalStorage(myTask)

  }

  //remove task if the project is remove
  function removeTaskFromProject(project) {    
    let i = 0;
    while(i < myTask.length){
      if(myTask[i].projectName === project){
        myTask.splice(i,1)
      }
      i++
    }
  }


  return {
    myProjects,
    getCurrentProject: () => currentProject, 
    renderListOfProjects,
    projectState
  }
})();

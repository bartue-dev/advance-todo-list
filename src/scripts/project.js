import { DOM } from "./DOM";
import projectIcon from "../../assets/images/project.png";
import closeIcon from "../../assets/images/close.png";
import { main } from "./main";

export function projects() {

  const myProjects = [];
  let currentProject;

  const projectListCon = DOM.projectListCon;
  const addProjectBtn = DOM.addProjectBtn;
  const projectForm = DOM.projectForm;
  const projectInput = DOM.projectInput;
  const cancelBtn = DOM.formBtns.cancelBtn;

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
  

    console.log(myProjects);
    
  });

  //event listener for form cancel button
  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();

    projectForm.style.display = "none";
    addProjectBtn.style.display = "flex"
    projectForm.reset();
  });


  //event listener for project remove button
  function handleRemoveProjectBtn(event, index) {
    event.preventDefault();

    myProjects.splice(index, 1);
    renderListOfProjects();
    projectForm.reset();
  }


  function renderListOfProjects() {
    projectListCon.innerHTML = "";

    myProjects.forEach((project,index) => {
      const myProjectEl = document.createElement("div");
      const removeBtn = document.createElement("button");
      const removeBtnIconEl = document.createElement("img");
      const projectIconEl = document.createElement("img");

      projectIconEl.src = projectIcon; 
      removeBtnIconEl.src = closeIcon
      removeBtn.appendChild(removeBtnIconEl);
      myProjectEl.classList.add("my-project-element");
      projectIconEl.classList.add("project-icon");
      removeBtnIconEl.classList.add("close-icon");
      
      myProjectEl.append(projectIconEl,project, removeBtn);
      projectListCon.appendChild(myProjectEl);

      removeBtn.addEventListener("click", (event) => handleRemoveProjectBtn(event, index));

      //display the project to main
      myProjectEl.addEventListener("click", () => {
        currentProject = project
        main.displayProjectToMain(project, myProjectEl)
      });

    }); 
  }


  return {
    myProjects,
    getCurrentProject: () => currentProject 
  }
}

export const sidebarProject = projects();
import projectIcon from "../../../assets/images/project.png"
import closeIcon from "../../../assets/images/close.png"


export class ProjectsDom {
  static myProjects = [];

  constructor(sidebar) {
    this.sidebar = sidebar;
    this.projectsCon = document.createElement("div");
    this.projectsCon.classList.add("projects-container");

    this.addProjectsBtn = null;

    this.projectForm = null;
    this.projectInput = null;

    this.projectListCon = null;

  }

  displayProject() {
    const h1 = document.createElement("h1");
    h1.textContent = "Projects";

    this.addProjectsBtn = document.createElement("button");
    this.addProjectsBtn.classList.add("add-project-button");
    const addIcon = document.createElement("div");

    addIcon.classList.add("add-icon");
    addIcon.textContent = "+";

    //list of project container
    this.projectListCon = document.createElement("div");
    this.projectListCon.classList.add(".project-list-container");

    this.addProjectsBtn.appendChild(addIcon);
    this.addProjectsBtn.append("Add project");
    this.projectsCon.appendChild(h1);
    this.projectsCon.appendChild(this.projectListCon);
    this.projectsCon.appendChild(this.addProjectsBtn);
    this.sidebar.appendChild(this.projectsCon);

    //event listener for add project button (+)
    this.addProjectsBtn.addEventListener("click", (event) => {
      this.handleAddProjectBtn(this.addProjectsBtn,event)
    });
  }

  form(){

    this.projectForm = document.createElement("form");
    this.projectForm.classList.add("project-form"); 
    this.projectInput = document.createElement("input");
    const formCancelProjectBtn = document.createElement("button");
    const formAddProjectBtn = document.createElement("button");

    this.projectInput.type = "text";
    this.projectInput.name = "projectName";
    this.projectInput.id = "project-input";
    this.projectInput.placeholder = "Create project";
    this.projectInput.required = true;

    formCancelProjectBtn.classList.add("cancel-button");
    formCancelProjectBtn.textContent = "Cancel";
    formAddProjectBtn.textContent = "Add project";
    formAddProjectBtn.type = "submit";
    this.projectForm.appendChild(this.projectInput);
    this.projectForm.appendChild(formCancelProjectBtn);
    this.projectForm.appendChild(formAddProjectBtn);

    //event listener for input trigger while typing
    this.projectInput.addEventListener('input', () => {
      // Clear the custom validity when the user starts typing
      this.projectInput.setCustomValidity('');
    });

    //event listener for form add project button
    this.projectForm.addEventListener("submit", (event) => this.handleSubmitForm(event));
    
    //event listener for form cancel button
    formCancelProjectBtn.addEventListener("click", (event) => this.handleCancelBtn(event));
  }

  //event listener method for add project button
  handleAddProjectBtn(addProjectsBtn,event) { 
    event.preventDefault();
  
    addProjectsBtn.style.display = "none";
    this.projectsCon.insertBefore(this.projectForm, this.projectsCon.children[2]);
    this.projectForm.style.display = "grid";
    this.projectInput.focus();
  }

  

  //method to submit form, callback function for form submit event listener
  handleSubmitForm(event) {
    event.preventDefault();

    //take the value in the form
    const formData = new FormData(this.projectForm);

    //convert the form values in to object
    const formEntries = Object.fromEntries(formData.entries());

    console.log(ProjectsDom.myProjects);
    console.log(formEntries);

    const isDuplicate = ProjectsDom.myProjects.some(project => {
      if(project.projectName.trim().toLowerCase() === formEntries.projectName.trim().toLowerCase()) {
        return true;
      }
    });

    if(isDuplicate){
      console.log("value exist");
      this.projectInput.setCustomValidity("Project Exist!");
      this.projectInput.reportValidity();
      return;
    }

    this.addNewProject(formEntries);
    //ProjectsDom.myProjects.push(formEntries);
    this.renderListProjects();
    this.projectForm.style.display = "none";
    this.addProjectsBtn.style.display = "flex"
  
    this.projectForm.reset();
    
  }

  //method to cancel form, callback function for cancel button event listener
  handleCancelBtn(event) {
    event.preventDefault();

    this.projectForm.style.display = "none";
    this.addProjectsBtn.style.display = "flex"
    
    return;
  }

    //create array to push all the project as a list
    //push after the form is submit
    //loop through the project array to manipulate each project

  //method to push the new project into the array
  addNewProject(newProject) {
    ProjectsDom.myProjects.push(newProject)
  }

  //method to render the list of project into the DOM
  renderListProjects() {
    this.projectListCon.innerHTML = ""; 

    ProjectsDom.myProjects.forEach((project,index) => {
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
      
      myProjectEl.append(projectIconEl,project.projectName, removeBtn);
      this.projectListCon.appendChild(myProjectEl);

      //event listener for remove button
      removeBtn.addEventListener("click", (event) => {
        this.handleRemoveProjectBtn(event, index)
      });
    }); 
    
  }

  //method to remove a project from project list, callback function for remove button event listener
  handleRemoveProjectBtn(event, index) {
    event.preventDefault();

    ProjectsDom.myProjects.splice(index, 1);
    this.renderListProjects(); 
  } 
}




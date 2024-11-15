import todayImage from "../../assets/images/today.png";
import tomorrowImage from "../../assets/images/tomorrow.png";
import completedImage from "../../assets/images/successful.png";
import logoImage from "../../assets/images/logo.png";



export const createDOM = (() => {
 //header-------------------------------
 const headerCon = document.querySelector("header");

 const logo = document.createElement("img");
 logo.classList.add("header-logo");
 logo.src = logoImage;

 const appName = document.createElement("h1");
 appName.textContent = "ToDoList";

 headerCon.appendChild(logo);
 headerCon.appendChild(appName);

 //sidebar---------------------------------
 const sidebarCon = document.querySelector(".sidebar");

 //upper part of the side bar ------------------------
 const statusCon = document.createElement("div");
 statusCon.classList.add("status-container");

 //create an object for creating the button and use it to append each to status container
 const statusBtns = {
   today: createStatusBtns(todayImage, "Today"),
   tomorrow: createStatusBtns(tomorrowImage, "Tomorrow"),
   completed: createStatusBtns(completedImage, "Completed")
 }

 //take the value of the statusBtns object and append each to status container
 Object.values(statusBtns).forEach(btn => {
   statusCon.appendChild(btn);
 });

 sidebarCon.appendChild(statusCon);

 //function for creating the button and img element and use it to statusBtns obj to generate 3 buttons
 function createStatusBtns(image, text) {
   const btn = document.createElement("button");
   const icon = document.createElement("img");

   icon.src = image;
   btn.appendChild(icon);
   btn.append(text);
   //return button so the obj would return a button then append to status container
   return btn;
 }

 
 //projects DOM (bottom part of the sidebar) -----------------------------------

 //project container
 const projectsCon = document.createElement("div");
 projectsCon.classList.add("projects-container");

 //title------------------------------------
 const h1 = document.createElement("h1");
 h1.textContent = "Projects";

 //add project button-----------------------
 const addProjectBtn = document.createElement("button");
 addProjectBtn.classList.add("add-project-button");

 const projectListCon = document.createElement("div");
 projectListCon.classList.add("project-list-container");

 const addIcon = document.createElement("div");
 addIcon.classList.add("add-icon");
 addIcon.textContent = "+";

 addProjectBtn.appendChild(addIcon);
 addProjectBtn.append("Add project");

 //project form----------------------------
 const projectForm = document.createElement("form");
 projectForm.classList.add("project-form"); 

 const projectInput = document.createElement("input");

 const formBtns = {
   cancelBtn: createFormBtns("Cancel", "button", "cancel-button"),
   addBtn: createFormBtns("Add project", "submit", null),
 }

 function createFormBtns(text, type, className) {
   const btn = document.createElement("button");
   btn.textContent = text;

   if(type !== null || type === "button") {
     btn.type = type;
   }

   if(className !== null) {
     btn.classList.add(className);
   }

   return btn
 }

 projectInput.type = "text";
 projectInput.name = "projectName";
 projectInput.id = "project-input";
 projectInput.placeholder = "Create project";
 projectInput.required = true;
 projectInput.maxLength = 17;


 projectForm.appendChild(projectInput);

 Object.values(formBtns).forEach(btn => {
   projectForm.appendChild(btn);
 });

 projectsCon.appendChild(h1);
 projectsCon.appendChild(projectListCon);
 projectsCon.appendChild(projectForm);
 projectsCon.appendChild(addProjectBtn);
 sidebarCon.appendChild(projectsCon);

 //main
 const mainCon = document.querySelector("main");
 const mainProjectCon = document.createElement("div");
 const projectTitle = document.createElement("h1");
 const taskCon = document.createElement("div");
 const createTaskBtn = document.createElement("button");
 const createTaskIcon = document.createElement("div");


 mainProjectCon.classList.add("main-project-container");
 taskCon.classList.add("task-container");
 projectTitle.classList.add("project-title");

 createTaskIcon.textContent = "+";
 createTaskBtn.textContent = "Add task";
 createTaskIcon.classList.add("create-task-icon")
 createTaskBtn.classList.add("create-task-button");
 createTaskBtn.appendChild(createTaskIcon);

 mainProjectCon.appendChild(projectTitle);
 mainProjectCon.appendChild(taskCon);
 mainProjectCon.appendChild(createTaskBtn);


 //task form
 const taskForm = document.createElement("form");
 const taskBtnCon = document.createElement("div");

 const formInputs = {
   taskNameLabel: createInputs("label"),
   taskName: createInputs("input"),
   taskDescriptionLabel: createInputs("label"),
   taskDescription: createInputs("textarea"),
   taskDateLabel: createInputs("label"),
   taskDate: createInputs("input"),
   taskPriorityLabel: createInputs("label"),
   taskPriority: createInputs("select"),
   cancelTaskBtn: createInputs("button"),
   addTaskBtn: createInputs("button"),
 }

 function createInputs(element) {
   const inputs = document.createElement(element);

   return inputs;
 }



 formInputs.taskNameLabel.for = "task-name";
 formInputs.taskDescriptionLabel.for = "task-description";
 formInputs.taskDateLabel.for = "task-date";
 formInputs.taskPriorityLabel.for = "task-priority";

 formInputs.taskPriorityLabel.classList.add("task-priority");

 formInputs.taskNameLabel.textContent = "Task name";
 formInputs.taskDescriptionLabel.textContent = "Description";
 formInputs.taskDateLabel.textContent = "Date";
 formInputs.taskPriorityLabel.textContent = "Priority";


 taskForm.classList.add("task-form");
 formInputs.taskName.type = "text";
 formInputs.taskName.placeholder = "* Create Task";
 formInputs.taskName.name = "taskName";
 formInputs.taskName.required = true;
 formInputs.taskName.id = "task-name";

 formInputs.taskDescription.placeholder = "Description";
 formInputs.taskDescription.required = true;
 formInputs.taskDescription.name = "taskDescription";
 formInputs.taskDescription.classList.add("description");
 formInputs.taskDescription.id = "task-description";

 formInputs.taskDate.type = "date";
 formInputs.taskDate.name = "taskDate";
 formInputs.taskDate.id = "task-date";



 formInputs.cancelTaskBtn.type = "button";
 formInputs.cancelTaskBtn.textContent = "Cancel";
 formInputs.addTaskBtn.type = "submit";
 formInputs.addTaskBtn.textContent = "Add task";


 formInputs.taskPriority.name = "taskPriority";
 formInputs.taskPriority.id = "task-priority";


 const opt = {
   notPriority: createSelectOption("Not a priority", "Not a priority"),
   low: createSelectOption("Low", "Low"),
   medium: createSelectOption("Medium", "Medium"),
   high: createSelectOption("High", "High"),
 }

 Object.values(opt).forEach(task => {
   formInputs.taskPriority.appendChild(task);
 });

 function createSelectOption(text, value) {
   const opt = document.createElement("option");

   opt.textContent = text;
   opt.value = value;
   return opt
 }

 Object.values(formInputs).forEach(input => {
   taskForm.appendChild(input);
 });

 taskBtnCon.classList.add("task-button-container");
 taskBtnCon.appendChild(formInputs.cancelTaskBtn);
 taskBtnCon.appendChild(formInputs.addTaskBtn);
 taskForm.appendChild(taskBtnCon);

 





 //footer

 return {
   statusBtns,
   addProjectBtn,
   projectListCon,
   projectsCon,
   projectForm,
   projectInput,
   formBtns,
   mainCon,
   taskForm,
   createTaskBtn,
   formInputs,
   projectTitle,
   mainProjectCon,
   taskCon,
   sidebarCon
 }
})();








import deleteImage from "../../assets/images/delete.png";
import editImage from "../../assets/images/edit.png";
import arrowImage from "../../assets/images/next.png"
import { DOM  } from "./DOM";
import { format, parseISO, isValid, compareAsc } from "date-fns"
import { sidebarProject } from "./project";

export function createMain() {

  const myTask = [];

  const mainCon = DOM.mainCon;
  const taskForm = DOM.taskForm;
  const createTaskBtn = DOM.createTaskBtn;
  const taskFormCancelBtn = DOM.formInputs.cancelTaskBtn;
  const taskFormAddBtn = DOM.formInputs.addTaskBtn;
  const projectTitle = DOM.projectTitle;
  const mainProjectCon = DOM.mainProjectCon;
  const taskCon = DOM.taskCon;
  let currentTaskId;
  let isEditBtn = true;
  let taskId = 0;
  


  //function to display the project to main/export to project js
  function displayProjectToMain(project, myProjectEl) {
    document.querySelectorAll(".my-project-element").forEach(content => {
      content.classList.remove("active");
    });

    myProjectEl.classList.add("active");

    projectTitle.textContent = project;
    mainCon.appendChild(mainProjectCon);

    //render the task list every time a project is clicked
    renderTaskList()
  }

  //create task button (+)
  createTaskBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    dialogForm.showModal();   
    console.log("current task Id",currentTaskId);
    
    if(isEditBtn) {
      DOM.formInputs.addTaskBtn.textContent = "Add task"
    }
    taskForm.reset();
  });

  //dialog box for form
  const dialogForm = document.createElement("dialog");
  dialogForm.classList.add("dialog-form");
  dialogForm.appendChild(taskForm);
  mainCon.appendChild(dialogForm)

  //submit the task form data
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(taskForm);
    const formEntries = Object.fromEntries(formData.entries());
    
    if(taskFormAddBtn.textContent === "Add task"){
      const taskData = {
        ...formEntries,
        projectName: sidebarProject.getCurrentProject(),
        taskId: taskId++,
      }
      myTask.push(taskData);
     
    }else {
      const taskIndex = myTask.findIndex(t => t.taskId === currentTaskId)

      myTask[taskIndex] = {
        ...formEntries,
      projectName: sidebarProject.getCurrentProject(),
        taskId: currentTaskId,
      }
  }
  console.log("my Task array:",myTask);
  renderTaskList();
  taskForm.reset();
  
  dialogForm.close();
    
  });
  

  //cancel task button from form
  taskFormCancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialogForm.close();
  });

  //create a dialog for task details
  const dialogElements = {
    taskDetailsDialog: createEl("dialog"),
    taskDialogTitle: createEl("h1"),
    detailsCon: createEl("div"),
  }

  dialogElements.taskDetailsDialog.classList.add("task-details-dialog"); 
  dialogElements.detailsCon.classList.add("details-container");
  dialogElements.taskDialogTitle.textContent = "Task Details";

  closeDialogScreen(dialogElements.taskDetailsDialog);

  const detailsElements = {
    myTaskName: createEl("h1"),
    taskNameDialog: createEl("h2"),
    myDescription: createEl("h1"),
    taskDescription: createEl("h2"),
    myDate: createEl("h1"),
    taskDate: createEl("h2"),
    myPriority: createEl("h1"),
    taskPriority: createEl("h2"),
    myTaskStatus: createEl("h1"),
    taskStatus: createEl("h2"),
  }

  detailsElements.myTaskName.textContent = "Task"
  detailsElements.myDescription.textContent = "Description"
  detailsElements.myDate.textContent = "Date"
  detailsElements.myPriority.textContent = "Priority"
  detailsElements.myTaskStatus.textContent = "Status"

  Object.values(detailsElements).forEach(elements => {
    dialogElements.detailsCon.appendChild(elements);
  });

  dialogElements.taskDetailsDialog.appendChild(dialogElements.taskDialogTitle);
  dialogElements.taskDetailsDialog.appendChild(dialogElements.detailsCon); 

  mainCon.appendChild(dialogElements.taskDetailsDialog);

  const overDueText = document.createElement("div")
  overDueText.textContent = "over-due"
  overDueText.classList.add("overdue-text");
  dialogElements.detailsCon.prepend(overDueText)

  //render the task list to the DOM!
  function renderTaskList(){

    //filtered the myTask array to return a specific tasks base on project/project name
    const filteredTask = myTask.filter(task => task.projectName === sidebarProject.getCurrentProject());

    //avoid duplicates when render the each task
    taskCon.innerHTML = "";  

    //loop through the filtered task to display it to the DOM with the specified project
    filteredTask.forEach(task => {

      //format the date using the date fns library
      const inputDate = task.taskDate;  
      const parsedDate  = parseISO(inputDate);
      let formattedDate;

      if(isValid(parsedDate)){  
        formattedDate = format(parsedDate, "MMM dd, yyyy");
      }

      const taskElements = {
        taskEl: createEl("div"),
        taskNameWrapper: createEl("div"),
        taskCheckBox: createEl("input"),
        taskName: createEl("h2"),
        taskBtnCon: createEl("div"),
      }

      taskElements.taskEl.classList.add("task-item");
      taskElements.taskBtnCon.classList.add("taskEl-button-container");
      taskElements.taskName.classList.add("task-title-name");
      taskElements.taskNameWrapper.classList.add("task-name-wrapper");

      taskElements.taskCheckBox.type = "checkbox";
      taskElements.taskCheckBox.name = "isTaskDone";
      taskElements.taskCheckBox.value = "done";

      
      //display the task name
      taskElements.taskName.textContent = task.taskName;

      const taskBtnIcons = {
        deleteIcon: createEl("img"),
        editIcon: createEl("img"),
        arrowIcon: createEl("img"),
      }

      taskBtnIcons.deleteIcon.src = deleteImage;
      taskBtnIcons.editIcon.src = editImage;
      taskBtnIcons.arrowIcon.src= arrowImage;

      const taskBtnElements = {
        deleteTaskBtn: createEl("button"),
        editTaskBtn: createEl("button"),
        openDialogBtn: createEl("button"),
      }

      Object.values(taskBtnElements).forEach(elements => {
        taskElements.taskBtnCon.append(elements);
      });

      taskBtnElements.deleteTaskBtn.appendChild(taskBtnIcons.deleteIcon);
      taskBtnElements.editTaskBtn.appendChild(taskBtnIcons.editIcon);
      taskBtnElements.openDialogBtn.appendChild(taskBtnIcons.arrowIcon);

      taskElements.taskNameWrapper.append(taskElements.taskCheckBox, taskElements.taskName)
      taskElements.taskEl.appendChild(taskElements.taskNameWrapper);
      taskElements.taskEl.appendChild(taskElements.taskBtnCon);

      taskCon.appendChild(taskElements.taskEl);

      let currentDate = new Date().toJSON().slice(0, 10)
      const isOverDue = compareAsc(task.taskDate, currentDate)
     

      if(isOverDue === -1) {
        overDueText.style.display = "block"
        taskElements.taskName.style.color = "#dc2626";
      }else{
        overDueText.style.display = "none"
      }
      
     
      //open dialog button event listener
      taskBtnElements.openDialogBtn.addEventListener("click", (event) => {
        event.preventDefault();

        detailsElements.taskNameDialog.textContent = task.taskName;
        detailsElements.taskDescription.textContent = task.taskDescription;
        detailsElements.taskDate.textContent =  formattedDate ? formattedDate : "No Date";
        detailsElements.taskPriority.textContent = task.taskPriority;
        detailsElements.taskStatus.textContent = task.isTaskDone === true ? "Done" : "On going"

        dialogElements.taskDetailsDialog.showModal();
      });

      //delete task button/icon. Delete base on index
      taskBtnElements.deleteTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();

        //use findIndex method to original array and filtered array using the id to get the its INDEX 
        const toDeleteTaskIndex = myTask.findIndex(deleteTask => deleteTask.taskId === task.taskId);
        console.log("Delete task Index:", toDeleteTaskIndex);
        
        myTask.splice(toDeleteTaskIndex, 1)
        renderTaskList(); 
        console.log(myTask);
      });
      
      //event listener for edit task button
      taskBtnElements.editTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();
  
        currentTaskId = task.taskId;

        DOM.formInputs.taskName.value = task.taskName;
        DOM.formInputs.taskDescription.value = task.taskDescription;
        DOM.formInputs.taskDate.value = task.taskDate;
        DOM.formInputs.taskPriority.value = task.taskPriority;

        if(isEditBtn){
          DOM.formInputs.addTaskBtn.textContent = "Update task"
        }      

        dialogForm.showModal();       
      });

      //event listener for checkbox input
      taskElements.taskCheckBox.addEventListener("click", () => {

        currentTaskId = task.taskId;

        const taskIndex = myTask.findIndex(task => task.taskId === currentTaskId);

      if(taskElements.taskCheckBox.checked === true ){
        taskElements.taskName.style.textDecoration = "line-through";
        taskElements.taskName.style.opacity = "0.5"
        taskElements.taskName.style.color = "black";

        overDueText.style.display = "none"

        myTask[taskIndex].isTaskDone = true; 

      }else if (taskElements.taskCheckBox.checked === false && isOverDue === -1) {
        taskElements.taskName.style.color = "#dc2626";
        taskElements.taskName.style.textDecoration = "none";
        taskElements.taskName.style.opacity = "1"

        overDueText.style.display = "block"

        myTask[taskIndex].isTaskDone = false; 

      }else {
        taskElements.taskName.style.textDecoration = "none";
        taskElements.taskName.style.opacity = "1"
        overDueText.style.display = "none"


        myTask[taskIndex].isTaskDone = false; 
      }

      console.log("task Index",myTask[taskIndex]);
      });

    
      

    });
     
  }

  //reuseable function for creating an element
  function createEl(element) {
    const myElement = document.createElement(element);

    return myElement
  }

  //reusable function to close dialog when clicked outside
  function closeDialogScreen(dialog){
    dialog.addEventListener("click", e => {
      const dialogDimensions = dialog.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close()
      }
    });
  }

  function tomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)

    let tomorrowFormatted = format(tomorrow, "yyyy-MM-dd");

    return tomorrowFormatted
  }
   

  return {
    displayProjectToMain,
  }
  
}

export const main = createMain();

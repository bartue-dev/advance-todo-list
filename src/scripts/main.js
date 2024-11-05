import deleteImage from "../../assets/images/delete.png";
import editImage from "../../assets/images/edit.png";
import arrowImage from "../../assets/images/next.png"
import { DOM  } from "./DOM";
import { format, parseISO, isValid } from "date-fns"
import { sidebarProject } from "./project";

export function createMain() {

  const myTask = [];

  const mainCon = DOM.mainCon;
  const taskForm = DOM.taskForm;
  const createTaskBtn = DOM.createTaskBtn;
  const taskFormCancelBtn = DOM.formInputs.cancelTaskBtn;
  const projectTitle = DOM.projectTitle;
  const mainProjectCon = DOM.mainProjectCon;
  const taskCon = DOM.taskCon;


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


    console.log("CREATE TASK BUTTON!");
    
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


      const taskData = {
        ...formEntries,
        projectName: sidebarProject.getCurrentProject(),
      }
      myTask.push(taskData);

     
      renderTaskList();
      taskForm.reset();
      
      dialogForm.close();
      
    });
  

  //cancel task button from form
  taskFormCancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialogForm.close();
  });

  //close the dialog when clicked outside
 closeDialogScreen(dialogForm);

  function renderTaskList(){

    //filtered the myTask array to return a specific tasks base on project/project name
    const filteredTask = myTask.filter(task => task.projectName === sidebarProject.getCurrentProject());

    taskCon.innerHTML = "";  

    //loop through the filtered task to display it to the DOM with the specified project
    filteredTask.forEach((task, index) => {

      //format the date using the date fns library
      const inputDate = task.taskDate;  
      const parsedDate  = parseISO(inputDate);
      let formattedDate;

      if(isValid(parsedDate)){  
        formattedDate = format(parsedDate, "MMM dd, yyyy");
      }


      const dialogElements = {
        taskDetailsDialog: createEl("dialog"),
        taskDialogTitle: createEl("h1"),
        detailsCon: createEl("div"),
      }

      dialogElements.detailsCon.innerHTML = "";

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
      }

      detailsElements.myTaskName.textContent = "Task"
      detailsElements.taskNameDialog.textContent = task.taskName;
      detailsElements.myDescription.textContent = "Description"
      detailsElements.taskDescription.textContent = task.taskDescription;
      detailsElements.myDate.textContent = "Date"
      detailsElements.taskDate.textContent =  formattedDate ? formattedDate : "No Date";
      detailsElements.myPriority.textContent = "Priority"
      detailsElements.taskPriority.textContent = `Priority: ${task.taskPriority}`;

      const taskElements = {
        taskEl: createEl("div"),
        taskTitle: createEl("h2"),
        taskBtnCon: createEl("div"),
      }

      taskElements.taskEl.classList.add("task-item");
      taskElements.taskBtnCon.classList.add("taskEl-button-container");
      taskElements.taskTitle.textContent = task.taskName;

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

      dialogElements.taskDetailsDialog.appendChild(dialogElements.taskDialogTitle);
      dialogElements.taskDetailsDialog.appendChild(dialogElements.detailsCon); 

      taskElements.taskEl.appendChild(taskElements.taskTitle);
      taskElements.taskEl.appendChild(taskElements.taskBtnCon);

      Object.values(detailsElements).forEach(elements => {
        dialogElements.detailsCon.appendChild(elements);
      });

      mainCon.appendChild(dialogElements.taskDetailsDialog)
      taskCon.appendChild(taskElements.taskEl)
     
      taskBtnElements.openDialogBtn.addEventListener("click", (event) => {
        event.preventDefault();
        dialogElements.taskDetailsDialog.showModal();
      });

      taskBtnElements.deleteTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();

        filteredTask.splice(index, 1)
        myTask.splice(index, 1);
        renderTaskList();

        console.log("This is delete task button!");
        console.log(filteredTask)
        console.log(myTask);
        
        
      });
      

      function createEl(element) {
        const myElement = document.createElement(element);

        return myElement
      }
    });
  }

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
   

  return {
    displayProjectToMain,
  }
  
}

export const main = createMain();

import deleteImage from "../../assets/images/delete.png";
import editImage from "../../assets/images/edit.png";
import arrowImage from "../../assets/images/next.png"
import { compareAsc, format, parseISO, isValid } from "date-fns"
import { createDOM } from "./DOM";
import { createMain } from "./main";

export const handlersFunctions = (() => {
  let currentTaskId;

  const mainCon = createDOM.mainCon
  //const currentTaskId = createMain.getCurrentTaskId();


  //const dialogForm = createMain.dialogForm

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

  function displayTask({task, myTask, isEditBtn, dialogForm, container} ) {
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

     container.appendChild(taskElements.taskEl);

     const overDueText = document.createElement("div")
     overDueText.textContent = "over-due"
     overDueText.classList.add("overdue-text");

     const isOverDue = handleDateOverdue(inputDate);  
     
     if( isOverDue === -1 ) {
     
       taskElements.taskBtnCon.prepend(overDueText);

       taskElements.taskName.style.color = "#dc2626";
     }else if(isNaN(isOverDue)) {
       taskElements.taskName.style.color = "black";
     }
     else{
       taskElements.taskName.style.color = "black";
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
       createMain.renderTaskList(); 
       console.log(myTask);

       saveTaskToLocalStorage(myTask)

     });
     
     //event listener for edit task button
     taskBtnElements.editTaskBtn.addEventListener("click", (event) => {
       event.preventDefault();
 
       currentTaskId = task.taskId;
       console.log(currentTaskId);
       

       createDOM.formInputs.taskName.value = task.taskName;
       createDOM.formInputs.taskDescription.value = task.taskDescription;
       createDOM.formInputs.taskDate.value = task.taskDate;
       createDOM.formInputs.taskPriority.value = task.taskPriority;

       if(isEditBtn){
         createDOM.formInputs.addTaskBtn.textContent = "Update task"
       }      

       dialogForm.showModal();       

       saveTaskToLocalStorage(myTask)

      });

     //event listener for checkbox input
     taskElements.taskCheckBox.addEventListener("click", () => {

          currentTaskId = task.taskId;

          const taskIndex = myTask.findIndex(task => task.taskId === currentTaskId);

        if(taskElements.taskCheckBox.checked === true ){
          taskElements.taskName.style.textDecoration = "line-through";
          taskElements.taskName.style.opacity = "0.5"
          taskElements.taskName.style.color = "black";
        
          Object.values(taskBtnElements).slice(1,2).forEach(btn => {
            btn.disabled = true
            btn.style.opacity = "0.5"
          });

          overDueText.style.display = "none"

          myTask[taskIndex].isTaskDone = true; 

        }else if (taskElements.taskCheckBox.checked === false && isOverDue === -1) {
          taskElements.taskName.style.color = "#dc2626";
          taskElements.taskName.style.textDecoration = "none";
          taskElements.taskName.style.opacity = "1"

          overDueText.style.display = "block"

          Object.values(taskBtnElements).slice(1,2).forEach(btn => {
            btn.disabled = false
            btn.style.opacity = "1"
          });

          myTask[taskIndex].isTaskDone = false; 

        }else {
          taskElements.taskName.style.textDecoration = "none";
          taskElements.taskName.style.opacity = "1"

          Object.values(taskBtnElements).forEach(btn => {
            btn.disabled = false
            btn.style.opacity = "1"
          });


          myTask[taskIndex].isTaskDone = false; 
        }

        console.log("task Index",myTask[taskIndex]);

        saveTaskToLocalStorage(myTask);
      });

    //remain the state of the check box element and style if the checkbox is true otherwise normal styling
    if(task.isTaskDone === true){
      taskElements.taskName.style.textDecoration = "line-through";
      taskElements.taskName.style.opacity = "0.5"
      taskElements.taskName.style.color = "black";
      taskElements.taskCheckBox.checked = true
    
      Object.values(taskBtnElements).slice(1,2).forEach(btn => {
        btn.disabled = true
        btn.style.opacity = "0.5"
      });

      overDueText.style.display = "none"

    }else {
      taskElements.taskName.style.textDecoration = "none";
      taskElements.taskName.style.opacity = "1"
      taskElements.taskCheckBox.checked = false

      Object.values(taskBtnElements).slice(1,2).forEach(btn => {
        btn.disabled = false
        btn.style.opacity = "1"
      });
    }
     

    saveTaskToLocalStorage(myTask)

  }



  function handleDateOverdue(inputDate) {
    let currentDate = new Date().toJSON().slice(0, 10)
    //return 1 if the first date is after the second, -1 if the first date is before the second or 0 if dates are equal.
    const isOverDue = compareAsc(inputDate, currentDate)

    return isOverDue
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

   //reuseable function for creating an element
   function createEl(element) {
    const myElement = document.createElement(element);

    return myElement
  }

  const emptyMessageCon = document.createElement("div");
    emptyMessageCon.classList.add("empty-container");
    mainCon.appendChild(emptyMessageCon);

  function emptyMessage(list, statusName) {
    
    switch(statusName.textContent){
      case "TODAY":
        emptyMessageCon.textContent = "You don't have any tasks scheduled for today. Take a break!"
        break;
      case "TOMORROW":
        emptyMessageCon.textContent = "Nothing on the schedule for tomorrow. Time to plan ahead!"
        break;
      case "COMPLETED":
        emptyMessageCon.textContent = "Your completed tasks list is empty. Time to cross some items off your list."
        break;
    }

    if(list.length > 0){
      emptyMessageCon.style.display = "none"
    }else{
      emptyMessageCon.style.display = "flex"
    }
  }

  function saveProjectToLocalStorage(myProject) {
    localStorage.setItem("project", JSON.stringify(myProject));
  }

  function saveTaskToLocalStorage(myTask) {
    localStorage.setItem("task", JSON.stringify(myTask));
  }



  return {
    getCurrentTaskId: () => currentTaskId,
    closeDialogScreen,
    displayTask,
    handleDateOverdue,
    emptyMessage,
    emptyMessageCon,
    saveProjectToLocalStorage,
    saveTaskToLocalStorage

  }
})()
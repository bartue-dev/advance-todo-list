import { createDOM  } from "./DOM";
import { format} from "date-fns"
import { sidebarProject } from "./project";
import { sidebarStatus } from "./status";
import { handlersFunctions } from "./handlers";


export const createMain = (() => {
  const myTask = JSON.parse(localStorage.getItem("task")) || [];
  let isEditBtn = true;
  let taskId = 0;

  const mainCon = createDOM.mainCon;
  const taskForm = createDOM.taskForm;
  const createTaskBtn = createDOM.createTaskBtn;
  const taskFormCancelBtn = createDOM.formInputs.cancelTaskBtn;
  const taskFormAddBtn = createDOM.formInputs.addTaskBtn;
  const projectTitle = createDOM.projectTitle;
  const mainProjectCon = createDOM.mainProjectCon;
  const taskCon = createDOM.taskCon;
  const statusBtns = createDOM.statusBtns


  //function to display the project to main/export to project js
  function displayProjectToMain(project, myProjectEl) {
    document.querySelectorAll(".my-project-element-container").forEach(element => {
      element.classList.remove("active");
    });

    myProjectEl.classList.add("active");

    projectTitle.textContent = project;
    mainCon.appendChild(mainProjectCon);

    Object.values(statusBtns).forEach(btn => {
      btn.removeAttribute("class")
    });

    //render the task list every time a project is clicked
    renderTaskList();

    handlersFunctions.saveTaskToLocalStorage(myTask)
  }

  //create task button (+)
  createTaskBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    dialogForm.showModal();   
    
    if(isEditBtn) {
      taskFormAddBtn.textContent = "Add task"
    }
    taskForm.reset();

    console.log(myTask);
    
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
      console.log(handlersFunctions.getCurrentTaskId())
      const taskIndex = myTask.findIndex(t => t.taskId === handlersFunctions.getCurrentTaskId())

      console.log("Update task button:", taskIndex);
      

      myTask[taskIndex] = {
        ...formEntries,
        projectName: sidebarProject.getCurrentProject(),
        taskId: handlersFunctions.getCurrentTaskId(),
      }
  }
    console.log("my Task array:",myTask);
    renderTaskList();
    taskForm.reset();
    
    dialogForm.close();

    handlersFunctions.saveTaskToLocalStorage(myTask)

    
  });
  

  //cancel task button from form
  taskFormCancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialogForm.close();
  });

 



  //render the task list to the DOM!
  function renderTaskList(){

    //filtered the myTask array to return a specific tasks base on project/project name
    const filteredTask = myTask.filter(task => task.projectName === sidebarProject.getCurrentProject());

    //avoid duplicates when render each task
    taskCon.innerHTML = "";  

    //loop through the filtered task to display it to the DOM with the specified project
    filteredTask.forEach(task => {

     handlersFunctions.displayTask({
      task: task, 
      myTask: myTask,
      isEditBtn: isEditBtn,
      dialogForm: dialogForm,
      container: taskCon
    });


    });
     
  }

  const tomorrowListTaskCon = document.createElement("div");
  tomorrowListTaskCon.classList.add("tomorrow-list-container");

  function renderTomorrowTask() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)


    let tomorrowDate = format(tomorrow, "yyyy-MM-dd");


    tomorrowListTaskCon.innerHTML = "";

    const filteredTask = myTask.filter(task => task.taskDate === tomorrowDate);

    handlersFunctions.emptyMessage(filteredTask, sidebarStatus.statusName);


    filteredTask.forEach((task, index) => {

      handlersFunctions.displayTask({
        task: task,
        myTask: myTask,
        isEditBtn: isEditBtn,
        dialogForm: dialogForm,
        container:tomorrowListTaskCon,
        })
      
    });
    
  }

  const todayListCon = document.createElement("div");
  todayListCon.classList.add("today-list-container")

  function renderTodayTask() {
    let currentDate = new Date().toJSON().slice(0, 10)


    todayListCon.innerHTML = "";

    const filteredTask = myTask.filter(task => task.taskDate === currentDate) ;

    handlersFunctions.emptyMessage(filteredTask, sidebarStatus.statusName);

    filteredTask.forEach(task => {

      handlersFunctions.displayTask({
        task: task,
        myTask: myTask,
        isEditBtn: isEditBtn,
        dialogForm: dialogForm,
        container: todayListCon,
        });

    });

  }

  const completedListTaskCon = document.createElement("div");
  completedListTaskCon.classList.add("completed-list-container")

  function renderCompletedTask() {

    completedListTaskCon.innerHTML = "";

    const filteredTask = myTask.filter(task => task.isTaskDone === true);

    handlersFunctions.emptyMessage(filteredTask, sidebarStatus.statusName);


    filteredTask.forEach(task => {

      handlersFunctions.displayTask({
        task: task,
        myTask: myTask,
        isEditBtn: isEditBtn,
        dialogForm: dialogForm,
        container: completedListTaskCon,
        });

      
    });
    console.log("Completed task:",filteredTask)
  }

 

  

  
   

  return {
    displayProjectToMain,
    myTask,
    renderTaskList,
    renderTomorrowTask,
    tomorrowListTaskCon,
    renderTodayTask,
    todayListCon,
    renderCompletedTask,
    completedListTaskCon,
  }
})();

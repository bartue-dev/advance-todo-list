import { createDOM } from "./DOM";
import { createMain } from "./main";
import { sidebarProject } from "./project";


export const sidebarStatus = (() => {
  const statusBtns = createDOM.statusBtns
 
  function statusBtnsState() {
    if(localStorage.getItem("viewStatus") === "today"){
      statusBtns.today.click()
    }else if(localStorage.getItem("viewStatus") === "tomorrow"){
      statusBtns.tomorrow.click();
    }else if(localStorage.getItem("viewStatus") === "completed"){
      statusBtns.completed.click();
    }
    return;
  }

  const mainCon = createDOM.mainCon
  const mainProjectCon = createDOM.mainProjectCon;
        
  const statusName = document.createElement("h1");
  statusName.classList.add("status-name");


  //event listener for today task button
  statusBtns.today.addEventListener("click", (event)=> {
    event.preventDefault();

    const todayName = "TODAY";

    statusName.textContent = todayName
    mainCon.appendChild(statusName)


    document.querySelectorAll(".my-project-element-container").forEach(content => {
      content.classList.remove("active");
    });

    Object.values(statusBtns).forEach(btn => {
      btn.removeAttribute("class");
    });

    statusBtns.today.classList.add("active");

    createMain.renderTodayTask();
    mainCon.appendChild(createMain.todayListCon);

    
    if(mainCon.contains(mainProjectCon)){
      mainCon.removeChild(mainProjectCon);
    }
    if(mainCon.contains(createMain.tomorrowListTaskCon)){
      mainCon.removeChild(createMain.tomorrowListTaskCon);
    }
    if (mainCon.contains(createMain.completedListTaskCon) ) {
      mainCon.removeChild(createMain.completedListTaskCon)
    } 
    
    localStorage.setItem("viewStatus", "today");
  })
    
  //event listener for tomorrow task button
  statusBtns.tomorrow.addEventListener("click", (event) => {
    event.preventDefault();   

    const tomorrowName = "TOMORROW"

    statusName.textContent = tomorrowName;
    mainCon.appendChild(statusName);

    document.querySelectorAll(".my-project-element-container").forEach(content => {
      content.classList.remove("active");
    });

    Object.values(statusBtns).forEach(btn => {
      btn.removeAttribute("class");
    });

    statusBtns.tomorrow.classList.add("active");

    createMain.renderTomorrowTask();
    mainCon.appendChild(createMain.tomorrowListTaskCon);

    if(mainCon.contains(mainProjectCon)){
      mainCon.removeChild(mainProjectCon);
    }
    if(mainCon.contains(createMain.todayListCon)){
      mainCon.removeChild(createMain.todayListCon);
    }
    if(mainCon.contains(createMain.completedListTaskCon)) {
      mainCon.removeChild(createMain.completedListTaskCon)
    }


    localStorage.setItem("viewStatus", "tomorrow");

  });

  //event listener for completed task button
  statusBtns.completed.addEventListener("click", (event) => {
    event.preventDefault();

    const completedName = "COMPLETED";

    statusName.textContent = completedName;

    mainCon.appendChild(statusName);

    document.querySelectorAll(".my-project-element-container").forEach(content => {
      content.classList.remove("active");
    });

    Object.values(statusBtns).forEach(btn => {
      btn.removeAttribute("class");
    });

    statusBtns.completed.classList.add("active");

    createMain.renderCompletedTask();
    mainCon.appendChild(createMain.completedListTaskCon);

    if(mainCon.contains(mainProjectCon)){
      mainCon.removeChild(mainProjectCon);
    }
    if(mainCon.contains(createMain.todayListCon)){
      mainCon.removeChild(createMain.todayListCon);
    }
    if(mainCon.contains(createMain.tomorrowListTaskCon)) {
      mainCon.removeChild(createMain.tomorrowListTaskCon)
    }

    localStorage.setItem("viewStatus", "completed");

  });



 


  return {
    statusName,
    statusBtnsState
  }

})()

import { DOM } from "./DOM";



export function status() {

const statusBtns = DOM.statusBtns
const mainCon = DOM.mainCon
const mainProjectCon = DOM.mainProjectCon

  //test event listener ---------------------------------------
  Object.values(statusBtns).forEach(btn => {
    btn.addEventListener("click", (event) => { 
      event.preventDefault();
  
      document.querySelectorAll(".my-project-element").forEach(content => {
        content.classList.remove("active");
      });

      Object.values(statusBtns).forEach(btn => {
        btn.removeAttribute("class");
      });

      btn.classList.add("active");
  
      if(mainCon.contains(mainProjectCon)){
        mainCon.removeChild(mainProjectCon);
      }else {
        console.log("Main project container not exist yet!");
        
      }
    });
  
  });
}

export const sidebarStatus = status();
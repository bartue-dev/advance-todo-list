import todayImage from "../../../assets/images/today.png";
import tomorrowImage from "../../../assets/images/tomorrow.png";
import completedImage from "../../../assets/images/successful.png";


export class StatusDom {
  constructor(sidebar) {
    this.sidebar = sidebar;
    this.statusCon = document.createElement("div");
    this.statusCon.classList.add("status-container");
  }

  displayStatus() {
    const todayBtn = document.createElement("button");
    const tomorrowBtn = document.createElement("button");
    const completedBtn = document.createElement("button");

    const todayIcon = document.createElement("img");
    const tomorrowIcon = document.createElement("img");
    const completedIcon = document.createElement("img");

    todayIcon.src = todayImage;
    tomorrowIcon.src = tomorrowImage;
    completedIcon.src = completedImage;

    todayBtn.appendChild(todayIcon);
    tomorrowBtn.appendChild(tomorrowIcon);
    completedBtn.appendChild(completedIcon);
    todayBtn.append("Today");
    tomorrowBtn.append("Tomorrow");
    completedBtn.append("Completed");
    this.statusCon.appendChild(todayBtn);
    this.statusCon.appendChild(tomorrowBtn);
    this.statusCon.appendChild(completedBtn);
    this.sidebar.appendChild(this.statusCon);
  }
}

//html reference
/* <div class="status-container">
<button>
  <img src="../assets/images/today.png" alt="">
  Today
</button>
<button>
  <img src="../assets/images/tomorrow.png" alt="">
  Tomorrow
</button>
<button>
  <img src="../assets/images/successful.png" alt="">
  Completed
</button>
</div> */
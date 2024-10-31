import { ProjectsDom } from "../scripts/sidebar/projectsDOM.js";
import { StatusDom } from "./sidebar/statusDOM.js";

export class SideBar {
  constructor() {
    this.sideBarCon = document.querySelector(".sidebar");
    this.statusDom = new StatusDom(this.sideBarCon);
    this.projectDom = new ProjectsDom(this.sideBarCon);
  }

  displaySideBar() {
    this.statusDom.displayStatus();
    this.projectDom.displayProject();
    this.projectDom.form();
  }
}
import logoImage from "../../assets/images/logo.png";

export class Header {
  constructor() {
    this.headerCon = document.querySelector("header");
  }

  displayHeader() {
    const logo = document.createElement("img");
    logo.classList.add("header-logo");
    logo.src = logoImage;
    logo.alt = "This is logo"

    const appName = document.createElement("h1");
    appName.textContent = "tasknest";

    this.headerCon.appendChild(logo);
    this.headerCon.appendChild(appName);
    
  }
}

export class Footer {
  constructor() {
    this.footerCon = document.querySelector("footer");
  }

  displayFooter() {
    const h1 = document.createElement("h1");
    h1.textContent = "This is footer!";

    this.footerCon.appendChild(h1);
  }
}
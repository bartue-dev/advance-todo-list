import "../styles/general.css";
import "../styles/header.css";
import "../styles/sidebar.css";
import "../styles/footer.css";
import "../styles/main.css";
import { Footer } from "./footer.js";
import { Header } from "./header.js";
import { SideBar } from "./sidebar.js";
import { Main } from "./main.js";

const header = new Header();
header.displayHeader();

const sidebar = new SideBar();
sidebar.displaySideBar();

const main = new Main();
main.displayMain();

const footer = new Footer();
footer.displayFooter();



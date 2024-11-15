import "./styles/general.css";
import "./styles/header.css";
import "./styles/sidebar.css";
import "./styles/footer.css";
import "./styles/main.css";
import { sidebarProject } from "./scripts/project";
import { createMain } from "./scripts/main";
import { sidebarStatus } from "./scripts/status";


sidebarProject.renderListOfProjects();
sidebarProject.projectState();
createMain.renderTaskList();
sidebarStatus.statusBtnsState();


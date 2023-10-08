import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//this line is for test
const gameName = "Zhuo's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

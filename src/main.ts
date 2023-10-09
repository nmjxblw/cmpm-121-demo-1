import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//this line is for test
const gameName = "Zhuo's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const emoji_buttom = document.createElement("buttom");
emoji_buttom.innerHTML = "😃";
let counter: number = 0;
emoji_buttom.addEventListener("click", () => {
  counter++;
  emoji_buttom.innerHTML = `😃+${counter}`;
});
app.append(emoji_buttom);

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//this line is for test
const gameName = "Zhuo's game";

document.title = gameName;

//step1
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//step2
const emoji_buttom = document.createElement("buttom");
emoji_buttom.innerHTML = "😃";
let counter: number = 0;
function counter_add() {
  counter++;
  emoji_buttom.innerHTML = `😃+${counter}`;
}
emoji_buttom.addEventListener("click", counter_add);
app.append(emoji_buttom);

//step3
const auto_click_emoji_buttom = setInterval(counter_add, 1000);
console.log(auto_click_emoji_buttom);

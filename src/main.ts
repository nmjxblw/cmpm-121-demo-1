import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let growth_rate = 0;

//this line is for test
const gameName = "Zhuo's game";

document.title = gameName;

//step1
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//step2
const emoji_buttom = document.createElement("buttom");
emoji_buttom.innerHTML = "👍";
let counter: number = 0;
function counter_add() {
  counter++;
  emoji_buttom.innerHTML = `👍+${counter}`;
}
emoji_buttom.addEventListener("click", counter_add);
app.append(emoji_buttom);

//step3
const auto_click_emoji_buttom = setInterval(counter_add, 1000);
console.log(auto_click_emoji_buttom);

//step4
clearTimeout(auto_click_emoji_buttom);
function counter_add_by_frame(time: number) {
  counter += (growth_rate * time) / 1000;
  emoji_buttom.innerHTML = `👍+${counter.toFixed(4)}`;
}

let current_time: number;
function step(stamptime: number) {
  if (current_time === undefined) {
    current_time = stamptime;
  }
  const diff = stamptime - current_time;
  current_time = stamptime;
  counter_add_by_frame(diff);
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

//step5
const new_line = document.createElement("br");
app.append(new_line);
const add_growth_rate_buttom = document.createElement(
  "buttom",
) as HTMLButtonElement;
add_growth_rate_buttom.disabled = true;
const price: number = 10;
const growth_rate_per_sec: number = 1;
add_growth_rate_buttom.innerHTML = `-${price} 👍 -> 1 👍 /s `;
add_growth_rate_buttom.addEventListener("click", () => {
  add_growth_rate_buttom.disabled = counter >= price ? false : true;
  if (!add_growth_rate_buttom.disabled) {
    counter -= price;
    growth_rate += growth_rate_per_sec;
  }
});
app.append(add_growth_rate_buttom);

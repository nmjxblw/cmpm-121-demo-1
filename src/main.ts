import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let money: number = 0;
let money_text: string = `<em style="font-family:'Courier New';">You have ${money.toFixed(
  2,
)} 💰</em>`;
let growth_rate: number = 0;
let growth_rate_text: string = `<em style="font-family:'Courier New';">Growth rate is ${growth_rate.toFixed(
  2,
)} 💰 /s</em>`;

//this line is for test
const gameName: string = `The Rise of the City`;
document.title = gameName;

//shortcut function
function new_line() {
  const new_line = document.createElement("br");
  app.append(new_line);
}

//step1
const header = document.createElement("h2");
header.innerHTML = `<em style="font-family:'Comic Sans MS';">${gameName}</em>`;
app.append(header);

const money_header = document.createElement("h5");
money_header.innerHTML = money_text;

app.append(money_header);

//step2
const emoji_button = document.createElement("button") as HTMLButtonElement;
emoji_button.innerHTML = `<em>click to get 1 💰</em><br/>
<span style="font-size:10px;font-family:'Comic Sans MS';">It's the start of everything.</span>`;

emoji_button.addEventListener("mousedown", () => {
  money++;
});
app.append(emoji_button);

const growth_rate_header = document.createElement("h5");
growth_rate_header.innerHTML = growth_rate_text;
new_line();
app.append(growth_rate_header);

//step3
const auto_click_emoji_button = setInterval(() => {
  money++;
}, 1000);

//step4
clearTimeout(auto_click_emoji_button);
function money_add_by_frame(time: number) {
  money += (growth_rate * time) / 1000;
}

let current_time: number;
function step(stamptime: number) {
  if (current_time === undefined) {
    current_time = stamptime;
  }
  const diff = stamptime - current_time;
  current_time = stamptime;
  money_add_by_frame(diff);
  money_text = `<em style="font-family:'Courier New';">You have ${money.toFixed(
    2,
  )} 💰</em>`;
  money_header.innerHTML = money_text;
  growth_rate_text = `<em style="font-family:'Courier New';">Growth rate is ${growth_rate.toFixed(
    2,
  )} 💰 /s</em>`;
  growth_rate_header.innerHTML = growth_rate_text;
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

//step5

// new_line();
// const add_growth_rate_button = document.createElement(
//   "button",
// ) as HTMLButtonElement;

// const first_price: number = 10;
// const first_growth_rate_per_sec: number = 0.1;
// add_growth_rate_button.innerHTML = `costs ${first_price} 💰 to get ${first_growth_rate_per_sec} 💰 per second `;
// add_growth_rate_button.addEventListener("click", () => {
//   if (!add_growth_rate_button.disabled) {
//     money -= first_price;
//     growth_rate += first_growth_rate_per_sec;
//   }
// });
// setInterval(() => {
//   add_growth_rate_button.disabled = money < first_price;
// });
// app.append(add_growth_rate_button);

//step6
//shortcut function for creating a button
interface button_config {
  emoji?: string;
  name?: string;
  description?: any;
  price: number;
  growth_rate: number;
}
function create_growth_button(button_config: button_config) {
  const new_button: HTMLButtonElement = document.createElement(
    "button",
  ) as HTMLButtonElement;
  let purchase_time: number = 0;
  let current_price: number = button_config.price;
  new_button.disabled = true;
  new_button.hidden = true;
  function update_inner_text() {
    new_button.innerHTML = `<em>
    <span style="font-size:15px;font-family:'Comic Sans MS';">${
      button_config.name
    } ${button_config.emoji}:${purchase_time}</span><br/>
    <span style="font-size:13px;font-family:'Courier New';">costs ${current_price.toFixed(
      2,
    )} 💰 to get ${button_config.growth_rate} 💰 /sec</span></em><br/>
    <span style="font-size:10px;font-family:'Comic Sans MS';">${
      button_config.description
    }</span>`;
  }
  update_inner_text();
  setInterval(() => {
    new_button.disabled = money < current_price;
    if (new_button.hidden && !new_button.disabled) {
      new_button.hidden = false;
    }
  });
  new_button.addEventListener("mousedown", () => {
    if (!new_button.disabled) {
      money -= current_price;
      purchase_time++;
      current_price *= 1.15;
      growth_rate += button_config.growth_rate;
      update_inner_text();
    }
  });
  return new_button;
}
//step 8
// const my_frist_button = create_growth_button({
//   emoji: "🐄",
//   name: "Farm",
//   description: "It can bring very little income to your city.",
//   price: 10,
//   growth_rate: 0.1,
// });
// const my_second_button = create_growth_button({
//   emoji: "🚂",
//   name: "Transportation",
//   description: "Everything is on track!",
//   price: 100,
//   growth_rate: 2.0,
// });
// const my_third_button = create_growth_button({
//   emoji: "💵",
//   name: "Bank",
//   description: "Money becomes money!",
//   price: 1000,
//   growth_rate: 50.0,
// });
// app.append(my_frist_button);
// app.append(my_second_button);
// app.append(my_third_button);

//step 9
const button_array: button_config[] = [
  {
    emoji: "🐄",
    name: "Farm",
    description: "It can bring very little income to your city.",
    price: 10,
    growth_rate: 0.1,
  },
  {
    emoji: "🚂",
    name: "Transportation",
    description: "Everything is on track!",
    price: 100,
    growth_rate: 2.0,
  },
  {
    emoji: "💵",
    name: "Bank",
    description: "Money becomes money!",
    price: 1000,
    growth_rate: 50.0,
  },
  // {
  //   emoji: "🏠",
  //   name: "House",
  //   description: "The more population the more wealth.",
  //   price: 10000,
  //   growth_rate: 1500.0,
  // },
  // {
  //   emoji: "🗿",
  //   name: "Spectacle",
  //   description: "Your city is renowned far and wide.",
  //   price: 100000,
  //   growth_rate: 50000.0,
  // },
];
let button_count = 0;
button_array.forEach((element) => {
  button_count++;
  const new_button = create_growth_button(element);
  app.append(new_button);
  if (button_count % 4 == 3) {
    new_line();
  }
});

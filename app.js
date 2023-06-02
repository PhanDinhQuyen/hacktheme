//Create Canvas
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "canvas");
const noscript = document.getElementsByTagName("noscript")[0];
//Add canvas to body
document.body.insertBefore(canvas, noscript);

const ctx = canvas.getContext("2d");

let cw = this.innerWidth;
let ch = this.innerHeight;
//Get data from file json then push to this array
const charArr = [];
//Get data
(async function getData() {
  const data = await fetch("data/data.json").then((res) => res.json());
  data.dataChar.map((e) => charArr.push(e));
})();
let maxCharCount = 500;

const fallingCharArr = [];

let fontSize = 14;
// Somethings....
let maxColumns = cw / fontSize;

let frames = 0;
canvas.width = cw;
canvas.height = ch;
//Create class

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))];
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    ctx.fillStyle = "rgba(0,255,0)";
    ctx.font = fontSize + "px san-serif";
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}

let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, cw, ch);
  for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
};
//Wait 100ms
setTimeout(() => update(), 100);

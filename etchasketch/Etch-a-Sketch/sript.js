const DEFAULT_COLOR = "#3071a 9";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

const sketch = document.querySelector(".sketch-area");
const size_label = document.querySelector("#sketch_size");
const edge_size = document.querySelector("#edge_size");
const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelector("#colorBtn");
const randomBtn = document.querySelector("#randomBtn");
const eraseBtn = document.querySelector("#eraseBtn");
const clearBtn = document.querySelector("#clearBtn");

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;

document.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

edge_size.addEventListener("input", () => {
  size_label.textContent = `${edge_size.value} x ${edge_size.value}`;
  currentSize = edge_size.value;
  reRenderGrid();
});
colorBtn.onclick = () => setCurrentMode("color");
randomBtn.onclick = () => setCurrentMode("random");
eraseBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => {
  clearGrid();
  renderGrid();
  if (currentMode === "eraser") setCurrentMode("color");
};

function reRenderGrid() {
  clearGrid();
  renderGrid();
}

function renderGrid() {
  sketch.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  sketch.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
  for (let i = 0; i < currentSize * currentSize; i++) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid-Element");
    gridElement.addEventListener("mousedown", changeColor);
    gridElement.addEventListener("mouseover", changeColor);
    sketch.appendChild(gridElement);
  }
}
sketch.addEventListener("contextmenu", (event) => {
    event.preventDefault();
 });
function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "random") {
    let randomR = Math.floor(Math.random() * 257);
    let randomB = Math.floor(Math.random() * 257);
    let randomG = Math.floor(Math.random() * 257);
    e.target.style.backgroundColor = `rgb(${randomR},${randomB},${randomG})`;
  } else if (currentMode === "color")
    e.target.style.backgroundColor = currentColor;
  else if (currentMode === "eraser") e.target.style.backgroundColor = "#fefefe";
}

function activateButton(newMode) {
  if (currentMode === "random") {
    randomBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraseBtn.classList.remove("active");
  }

  if (newMode === "random") {
    randomBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraseBtn.classList.add("active");
  }
}

function clearGrid() {
  sketch.innerHTML = "";
}
window.onload = () => {
  renderGrid();
  activateButton(DEFAULT_MODE);
};

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
let currentExp = "";
let memory = 0;

// --- Local Storage History ---
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// Insert value
function insert(value) {
  currentExp += value;
  expressionDisplay.textContent = currentExp;
}

// Delete last char
function deleteChar() {
  currentExp = currentExp.slice(0, -1);
  expressionDisplay.textContent = currentExp;
}

// Clear all
function clearAll() {
  currentExp = "";
  expressionDisplay.textContent = "";
  resultDisplay.textContent = "0";
}

// Calculate result
function calculate() {
  try {
    const result = eval(currentExp);
    if (isNaN(result)) throw Error;
    resultDisplay.textContent = result;
    addToHistory(currentExp, result);
    currentExp = result.toString();
  } catch {
    resultDisplay.textContent = "Error";
  }
}

// Factorial
function factorial() {
  try {
    const num = eval(currentExp);
    if (num < 0) throw Error;
    const fact = num === 0 ? 1 : Array.from({ length: num }, (_, i) => i + 1).reduce((a, b) => a * b);
    resultDisplay.textContent = fact;
    addToHistory(`${num}!`, fact);
    currentExp = fact.toString();
  } catch {
    resultDisplay.textContent = "Error";
  }
}

// --- Memory functions ---
function memoryAdd() {
  memory += parseFloat(resultDisplay.textContent) || 0;
}
function memorySubtract() {
  memory -= parseFloat(resultDisplay.textContent) || 0;
}
function memoryRecall() {
  insert(memory.toString());
}
function memoryClear() {
  memory = 0;
}

// --- History functions ---
function addToHistory(expr, res) {
  history.push({ expr, res });
  localStorage.setItem("calcHistory", JSON.stringify(history));
}
function showHistory() {
  const panel = document.getElementById("history");
  const list = document.getElementById("historyList");
  panel.classList.toggle("active");
  list.innerHTML = history.map(h => `<div>${h.expr} = <b>${h.res}</b></div>`).join("");
}
function clearHistory() {
  history = [];
  localStorage.removeItem("calcHistory");
  document.getElementById("historyList").innerHTML = "";
}

// --- Theme toggle ---
document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// --- Keyboard support ---
document.addEventListener("keydown", e => {
  if (/[0-9+\-*/().]/.test(e.key)) insert(e.key);
  else if (e.key === "Enter") calculate();
  else if (e.key === "Backspace") deleteChar();
  else if (e.key === "Escape") clearAll();
});

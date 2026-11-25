// script.js – Calculator logic with beginner‑friendly comments
// ------------------------------------------------------------
// This file is responsible for handling user interactions, updating the
// display, and performing the arithmetic operations.

// Grab the display element where numbers and results are shown
const display = document.getElementById('display');

// Variables to keep track of the current input and the previous value
let currentInput = '';
let previousInput = '';
let operator = null;

// Helper function to update the calculator screen
function updateDisplay() {
  // Show the current input; if empty, default to 0
  display.value = currentInput || '0';
}

// Clear all state – triggered by the "AC" button
function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

// Delete the last character (like a backspace) – triggered by "DEL"
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// When a digit or decimal point is pressed
function appendDigit(digit) {
  // Prevent multiple leading zeros (e.g., "00")
  if (digit === '0' && currentInput === '0') return;

  // Ensure only a single decimal point per number
  if (digit === '.' && currentInput.includes('.')) return;

  // If we just performed a calculation, start fresh
  if (operator === null && previousInput && currentInput === '') {
    previousInput = '';
  }

  currentInput += digit;
  updateDisplay();
}

// Store the chosen operator (+, -, *, /)
function chooseOperator(op) {
  if (currentInput === '' && previousInput === '') return; // nothing to operate on
  if (currentInput === '' && previousInput) {
    // Change the operator if user presses a different one before entering a new number
    operator = op;
    return;
  }
  if (previousInput) {
    // Chain calculations (e.g., 2 + 3 * 4)
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

// Perform the calculation when "=" is pressed
function calculate() {
  if (!operator || currentInput === '' || previousInput === '') return;
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      // Gracefully handle division by zero
      if (b === 0) {
        alert('Cannot divide by zero');
        clearAll();
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  // Store result as the new current input for further operations
  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

// ------------------------------------------------------------------
// Event delegation: listen for clicks on the button container and act
// according to the button's data-action attribute.
// ------------------------------------------------------------------
document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.matches('button')) return; // ignore clicks outside buttons

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  switch (action) {
    case 'clear':
      clearAll();
      break;
    case 'delete':
      deleteLast();
      break;
    case 'digit':
      appendDigit(value);
      break;
    case 'operator':
      chooseOperator(value);
      break;
    case 'equals':
      calculate();
      break;
    default:
      break;
  }
});

// Initialise the display when the page loads
updateDisplay();

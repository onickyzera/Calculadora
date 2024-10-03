const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = undefined;

function updateDisplay(value) {
  display.value = value;
}

function handleNumber(num) {
  if (currentInput.length < 10) {
    currentInput += num;
    updateDisplay(currentInput);
  }
}

function handleOperation(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Erro' : prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString().substring(0, 10);
  operation = undefined;
  previousInput = '';
  updateDisplay(currentInput);
}

function clearAll() {
  currentInput = '';
  previousInput = '';
  operation = undefined;
  updateDisplay('');
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    const value = button.textContent;

    switch (action) {
      case 'number':
        handleNumber(value);
        break;
      case 'operation':
        handleOperation(value);
        break;
      case 'calculate':
        calculate();
        break;
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteLast();
        break;
    }
  });
});

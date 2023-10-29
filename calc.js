const numberButtons = document.querySelectorAll('[class^="btn-number-s"]');
const operationButtons = document.querySelectorAll('[class^="btn-operation-s"]');
const btnEqual = document.querySelector('[class^="btn-equal-s"]');
const btnDel = document.querySelector('#del');
const btnReset = document.querySelector('#reset');
const numberDisplayed = document.querySelector('#numberDisplayed');
let firstValue = 0;
let secondValue = 0;
let firstValueSet = false;
let secondValueSet = false;
let secondValueFirstInput = false;
let operationsTriggered = false;
let resultsTriggered = false;
let equalTriggered = false;
let decimalEntered = false;

numberButtons.forEach((button)=> {
  button.onclick = () => getBtnValue(button.innerHTML);
});
operationButtons.forEach((button)=> {
  button.onclick = () => triggerOperation(button.innerHTML);
});
btnEqual.onclick = () => triggerOperation(btnEqual.innerHTML);
btnReset.onclick = () => resetDisplay();
btnDel.onclick = () => deleteLastNumber();

const operationQueue = [];

function getBtnValue(value) {
  console.log(secondValueFirstInput, 'secondValueFirstInput')
  switch(value) {
    //decimal insertion regulation
    case '.':
      switch(firstValueSet) {
        case false:
          if (!decimalEntered && numberDisplayed.innerHTML === '0' && !equalTriggered) {
            updateDisplay('0.');
          } else if (!decimalEntered && numberDisplayed.innerHTML !== '0' && !equalTriggered) {
            updateDisplay(value);
          } else if (!decimalEntered && equalTriggered) {
            updateDisplay('0.');
          }
          decimalEntered = true;
        break;
        case true:
          if (!decimalEntered && numberDisplayed.innerHTML === '0' && !equalTriggered && secondValueFirstInput) {
            secondValueFirstInput = false;
            updateDisplay('0.');
          } else if (!decimalEntered && numberDisplayed.innerHTML !== '0' && !equalTriggered && !secondValueFirstInput) {
            updateDisplay(value);
          }  else if (!decimalEntered && equalTriggered) {
            updateDisplay('0.');
          }
          decimalEntered = true;
        break;
      }
      break;
      //0 inesertion if it is the first value inserted
      case '0':
        if ((numberDisplayed.innerHTML === '0' && !firstValue) || (secondValueFirstInput)) {
          decimalEntered = true;
          updateDisplay('0.');
        } else {
          updateDisplay(value);
        }
      break;
      default:        
        console.log('!= 0')
        updateDisplay(value);
      break;
    }      
  }
//both setFirstValue and setSecondValue are called by triggerOperation()
function setFirstValue() {
  firstValue = Number(numberDisplayed.innerHTML);
  firstValueSet = true;
  secondValueFirstInput = true;
  console.log(firstValueSet, 'firstValueSet', decimalEntered, 'decimalEntered')
}
function setSecondValue() {
  secondValue = Number(numberDisplayed.innerHTML);
}
//called by getBtnValue()
function updateDisplay(value) {
  console.log(decimalEntered, 'decimalEntered in update')
  if (equalTriggered || secondValueFirstInput) {
    numberDisplayed.innerHTML = '';
    if (secondValueFirstInput) {
      secondValueFirstInput = false;
    }
    if (equalTriggered) {
      equalTriggered = false;
    }    
  }
  if (numberDisplayed.innerHTML === '0' && !secondValueFirstInput) {
    numberDisplayed.innerHTML = value;
  } else {
    numberDisplayed.innerHTML += value;
  }  
}

function triggerOperation(type) {    
  decimalEntered = false;
  console.log(decimalEntered, 'decimalEntered')
  if (!firstValueSet) {
    setFirstValue();
    if (operationQueue.length === 0) {
      operationQueue.push(type);
    }  
  } else if (firstValueSet) {
    setSecondValue();
    operationResult(operationQueue[0], type);
  }      
}

function operationResult(type, nextType) {
  operationQueue.pop();
  if (nextType !== '=') {
    operationQueue.push(nextType);
  }
  switch (type) {
    case '+':
      firstValue = sum(firstValue, secondValue);
      secondValue = 0;
      secondValueSet = false;
      if (firstValue.length > 12) {
        firstValue = formatNumber(firstValue);
        numberDisplayed.innerHTML = firstValue;
      } else {
        numberDisplayed.innerHTML = firstValue;
      }    
    break;
    case '-':
      firstValue = subtraction(firstValue, secondValue);
      secondValue = 0;
      secondValueSet = false;
      if (firstValue.length > 12) {
        firstValue = formatNumber(firstValue);
        numberDisplayed.innerHTML = firstValue;
      } else {
        numberDisplayed.innerHTML = firstValue;
      } 
    break;
    case 'x':
      firstValue = multiply(firstValue, secondValue);
      secondValue = 0;
      secondValueSet = false;
      if (firstValue.length > 12) {
        firstValue = formatNumber(firstValue);
        numberDisplayed.innerHTML = firstValue;
      } else {
        numberDisplayed.innerHTML = firstValue;
      } 
    break;
    case '/':
      firstValue = divide(firstValue, secondValue);
      secondValue = 0;
      secondValueSet = false;
      if (firstValue.length > 12) {
        firstValue = formatNumber(firstValue);
        numberDisplayed.innerHTML = firstValue;
      } else {
        numberDisplayed.innerHTML = firstValue;
      } 
    break;
  }
  if (nextType === '=') {
    firstValue = 0;
    firstValueSet = false;
    equalTriggered = true;
  }
    operationsTriggered = false;
    resultsTriggered = false;
}

function sum(value1, value2) {
  let result = value1 + value2;
  if (Number.isInteger(result)) {
    return result;
  } else {
    return result.toFixed(2);
  }
}
function subtraction(value1, value2) {
  return value1 - value2;
}
function multiply(value1, value2) {
  let result = value1 * value2;
  if (Number.isInteger(result)) {
    return result;
  } else {
    return result.toFixed(2);
  }
}
function divide(value1, value2) {
  let result = value1 / value2;
  if (Number.isInteger(result)) {
    return result;
  } else {
    return result.toFixed(2);
  }
}
function formatNumber(number, maxDigits = 12) {
  // convert number into a string
  const numStr = number.toString();

  // check if the number is an integer
  const hasDecimal = numStr.includes('.');

  if (numStr.length <= maxDigits) {
    // Se il numero ha meno o un numero di cifre uguale al limite, restituiscilo com'è
    //if the number of digits is less or equal to maxDigits, return it as it is
    return numStr;
  } else {
    // Se il numero ha più cifre del limite
    //if the number of digits is higher than maxDigits
    if (hasDecimal) {
      // if it is decimal
      const [integerPart, decimalPart] = numStr.split('.');
      const remainingDigits = maxDigits - decimalPart.length - 1; // -1 per il punto decimale
      const truncatedDecimal = decimalPart.slice(0, remainingDigits);
      return `${integerPart}.${truncatedDecimal}e+${decimalPart.length}`;
    } else {
      // if it is an integer
      const integerPart = numStr.slice(0, maxDigits - 1);
      return `${integerPart}e+${numStr.length - 1}`;
    }
  }
}
function deleteLastNumber() {  
  if (numberDisplayed.innerHTML.length > 1) {
    numberDisplayed.innerHTML = numberDisplayed.innerHTML.slice(0, -1);
  } else {
    numberDisplayed.innerHTML = '0';
  }
}
function resetDisplay() {
  numberDisplayed.innerHTML = '0';
  firstValue = 0;
  secondValue = 0;
  firstValueSet = false;
  secondValueSet = false;
  operationQueue.pop();
  operationsTriggered = false;
  resultsTriggered = false;
  equalTriggered = false;
  decimalEntered = false;
}
# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference

### Links

- Solution URL: [Add solution URL here](here on GitHub)
- Live Site URL: [Add live site URL here](https://www.yaripiras.it)

## My process

### Built with

- JavaScript
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

I started setting the html, following a picture drawn on paper and already having the css in mind.
I decided to approach the project with grid and flex-box.
Then I started planning the JavaScript part.
I decided to split the code in 2 files: one, calc.js, for the operations and the other one for the styles changes.
The hard part of calc.js was about the decimal numbers, and in particular the insertion of the dot. You can see that in the getBtnValue(value) function.
Here follows some code snippet:


```css
.btn-number-s1, .btn-operation-s1 {
    background-color: hsl(30, 25%, 89%);
    color: hsl(221, 14%, 31%);
    box-shadow: inset 0px -3px 0px 0px hsl(28, 16%, 65%);
  }
```
```js
//the formatNumber function forces the result not to be longer than 12 digits
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

//the function setStyle set the preferred user's style
function setStyle(currentStyle) { 
    let currentStyleIndex = 0; 
    const main = document.querySelectorAll('main');
    const styleBar = document.querySelectorAll("[class^='style-bar-s']");
    const displayView = document.querySelectorAll("[class^='display-view-s']");
    const buttonsDisplay = document.querySelectorAll("[class^='buttons-display-s']");
    const btnNumber = document.querySelectorAll("[class^='btn-number-s']");
    const btnAction = document.querySelectorAll("[class^='btn-action-s']");
    const btnOperation = document.querySelectorAll("[class^='btn-operation-s']");
    const btnDouble1 = document.querySelectorAll("[class^='btnDouble1-s']");
    const btnDouble2 = document.querySelectorAll("[class^='btnDouble2-s']");
    const btnEqual = document.querySelectorAll("[class^='btn-equal-s']");
    const elementsToChange = [
        main, 
        styleBar, 
        displayView, 
        buttonsDisplay, 
        btnNumber, 
        btnAction, 
        btnOperation, 
        btnDouble1,
        btnDouble2,
        btnEqual
    ]
    switch(currentStyle) {
        case 'style1':
            currentStyleIndex = 0;
            document.querySelector('#style1').checked = true;
        break;
        case 'style2':
            currentStyleIndex = 1;
            document.querySelector('#style2').checked = true;
        break;
        case 'style3':
            currentStyleIndex = 2;
            document.querySelector('#style3').checked = true;
        break;
    }
    for (const elements of elementsToChange) {
        for (const element of elements) {
            element.className = '';
        }
    }
    applyStyles(main, styles.mainClass[currentStyleIndex]);
    applyStyles(styleBar, styles.styleBarClass[currentStyleIndex]);
    applyStyles(displayView, styles.displayViewClass[currentStyleIndex]);
    applyStyles(buttonsDisplay, styles.buttonDisplayClass[currentStyleIndex]);
    applyStyles(btnNumber, styles.btnNumberClass[currentStyleIndex]);
    applyStyles(btnAction, styles.btnActionClass[currentStyleIndex]);
    applyStyles(btnOperation, styles.btnOperationClass[currentStyleIndex]);
    applyStyles(btnDouble1, styles.btnDouble1Class[currentStyleIndex]);
    applyStyles(btnDouble2, styles.btnDouble2Class[currentStyleIndex]);
    applyStyles(btnEqual, styles.btnEqualClass[currentStyleIndex]);

    setPreferredStyle(currentStyle);    
} //end setStyle

function applyStyles(elements, styleClass) {
    for (const element of elements) {
        element.classList.add(styleClass);
    }
}
```

### Continued development

I should add a control not to add more digits than 12 on input

### Useful resources

- [w3schools](https://www.w3schools.com/) - This helped me for quick css reference.
- [Mozilla Resources for developers](https://developer.mozilla.org/en-US/) - This helped me for deep concepts, for instance I read something about styling <input type="range"> (and I chose not to go along with it).

## Author

- Website - [Yari Piras](https://www.yaripiras.it)
- Frontend Mentor - [@Arboricum](https://www.frontendmentor.io/profile/Arboricum)
- LinkedInd - [Yari Piras](https://www.linkedin.com/in/yari-piras-3300b31a4/)



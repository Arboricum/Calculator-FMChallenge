const styles = {
    "mainClass": ["main-s1", "main-s2", "main-s3"],
    "styleBarClass": ["style-bar-s1", "style-bar-s2", "style-bar-s3"],
    "displayViewClass": ["display-view-s1", "display-view-s2", "display-view-s3"],
    "buttonDisplayClass": ["buttons-display-s1", "buttons-display-s2", "buttons-display-s3"],
    "btnNumberClass": ["btn-number-s1", "btn-number-s2", "btn-number-s3"],
    "btnActionClass": ["btn-action-s1", "btn-action-s2", "btn-action-s3"],
    "btnOperationClass": ["btn-operation-s1", "btn-operation-s2", "btn-operation-s3"],
    "btnDouble1Class": ["btnDouble1-s1", "btnDouble1-s2", "btnDouble1-s3"],
    "btnDouble2Class": ["btnDouble2-s1", "btnDouble2-s2", "btnDouble2-s3"],
    "btnEqualClass": ["btn-equal-s1", "btn-equal-s2", "btn-equal-s3"],
}

function setStartStyle() {
    let startStyle = localStorage.getItem('preferredStyleSet');
    if (startStyle) {
        setStyle(startStyle);
    }
}

setStartStyle();

function getSelectedStyle(value) {
    let currentStyle = value;
    setStyle(currentStyle);
}

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

function setPreferredStyle(currentStyle) {
    localStorage.setItem('preferredStyleSet', currentStyle);
}
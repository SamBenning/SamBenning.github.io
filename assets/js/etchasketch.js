const mainContainer = document.querySelector('div.mainContainer');
const resSlider = document.querySelector('div.resSlider');
const resReadout = document.querySelector('.resReadout');
const resRange = document.querySelector('#resRange');
const resetBtn = document.querySelector('button.resetBtn');
const blackBtn = document.querySelector('button.blackBtn');
const greyBtn = document.querySelector('button.greyBtn');
const rgbBtn = document.querySelector('button.rgbBtn');

let currentMode;

const drawSketcher = (size) => {

    for (i = 0; i < size; i++) {

        const subContainer = document.createElement('div');
        subContainer.classList.add('etchRow');
        const percentHeight = (1 / size) * 100;
        subContainer.style.height = percentHeight.toString() + '%';
        mainContainer.appendChild(subContainer);

        for (j = 0; j < size; j++) {

            const square = document.createElement('div');
            square.classList.add('square');
            const percentWidth = (1 / size) * 100;
            square.style.width = percentWidth.toString() + '%';
            square.style.backgroundColor = 'white';
            subContainer.appendChild(square);
        }
    }
}

const getCurrentRows = () => {
    return document.querySelectorAll('.etchRow');
}

const getCurrentSquares = () => {
    return document.querySelectorAll('.square')
}

const deleteSketcher = () => {
    const rows = getCurrentRows();
    const squares = getCurrentSquares();
    squares.forEach(square => square.remove());
    rows.forEach(row => row.remove());
}

const resetSketcher = () => {
    const allSquares = getCurrentSquares();
    allSquares.forEach(square => {
        square.style.backgroundColor = 'white';
    })
}

const findFill = () => {
    if (currentMode == greyMode) {
        return greyFill;
    } else if (currentMode == rgbMode) {
        return rgbFill;
    } else {
        return blackFill;
    }
}

function blackFill(e) {
    e.target.style.backgroundColor = 'black';
}

function greyFill(e) {
    let currBackgroundColor = e.target.style.backgroundColor;  
    let currBackgroundString = '';
    if (currBackgroundColor.length >= 12) {
        currBackgroundString = currBackgroundColor.slice(0, 12);
    }
    if (currBackgroundColor == 'rgb(0, 0, 0)') {
        e.target.style.backgroundColor = currBackgroundColor;
    } else if (currBackgroundString != 'rgba(0, 0, 0') {
        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; 
    } else {
        let rgbaValues = currBackgroundColor.slice(5, currBackgroundColor.length - 1);
        let currGreyLevel = rgbaValues.slice(rgbaValues.length - 3);
        backgroundColor = 'rgba(0, 0, 0, ' + (parseFloat(currGreyLevel) + 0.1).toString() + ')';
        e.target.style.backgroundColor = backgroundColor;
    }
}

function rgbFill(e) {
    let randRed = Math.floor(Math.random() * 256);
    let randGreen = Math.floor(Math.random() * 256);
    let randBlue = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = 'rgb(' + randRed.toString() + ', ' + randGreen.toString() + ', ' + randBlue.toString() + ')';
}

const blackMode = () => {
    const squares = getCurrentSquares();
    squares.forEach(square => square.removeEventListener('mouseover', findFill()));
    currentMode = blackMode;
    squares.forEach(square => square.addEventListener('mouseover', blackFill));
}

const greyMode = () => {
    const squares = getCurrentSquares();
    squares.forEach(square => square.removeEventListener('mouseover', findFill()));
    currentMode = greyMode;
    squares.forEach(square => square.addEventListener('mouseover', greyFill));
}

const rgbMode = () => {
    const squares = getCurrentSquares();
    squares.forEach(square => square.removeEventListener('mouseover', findFill()));
    currentMode = rgbMode;
    squares.forEach(square => square.addEventListener('mouseover', rgbFill))
}

resetBtn.addEventListener('click', resetSketcher);

resSlider.addEventListener('mouseup', () => {
    deleteSketcher();
    drawSketcher(resRange.value);
    currentMode();
});

resSlider.addEventListener('input', () => {
    const res = resRange.value;
    resReadout.textContent = "Resolution: " + res + " x " + res;
})

blackBtn.addEventListener('click', blackMode);
greyBtn.addEventListener('click', greyMode);
rgbBtn.addEventListener('click', rgbMode);

currentMode = blackMode;
drawSketcher(resRange.value);
currentMode();
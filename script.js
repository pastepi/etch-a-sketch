const root = document.documentElement;
const container = document.querySelector('.main__container__div');
const sketchTile = document.createElement('div');
sketchTile.classList.add('tile');
sketchTile.setAttribute('id', 'tile');
const rangeOutput = document.getElementById("outputRange");

const buttons = document.querySelectorAll('.toggle');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('buttontoggled');
    })
})

// Inital board size

let tileAmount = 16;


const rangeInput = document.getElementById('inputRange');

function handleInputChange(e) { // Redrawing on input[range] change
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    drawGameBoard(e.target.value);

    const boardTiles = document.querySelectorAll('#tile');
    if (gridFlag) { // Grid handling (grid stays on/off, same as before redrawing)
        boardTiles.forEach((tile) => {
            tile.style.border = "1px solid black";
        })
    } else {
        boardTiles.forEach((tile) => {
            tile.style.border = "none";
        })
    }
}

function handleSliderBarChange(e) { // Slider - visual handler
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    } 
    
    let snappedVal = Math.round((target.value/target.step) * target.step);
    const min = target.min;
    const max = target.max;
    const val = snappedVal;
    e.target.value = snappedVal;

    rangeOutput.textContent = e.target.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}


 // Change board on mouse button release
rangeInput.addEventListener('mouseup', handleInputChange);

 // Slider bar changes on input
rangeInput.addEventListener('input', handleSliderBarChange);

// Board inactive at start
let activeTile = 0;


const drawColor = (colorPattern) => {

    if (colorFlag === 0) {
        return "rgb(0, 0, 0)";
    } else if (colorFlag === 1) {
        if (!colorPattern) {
            return 'hsl(0, 0%, 90%)';
        } else {
            return darkenColor(colorPattern);
        }
    } else if (colorFlag === 2) {
        return randomRGB();
    }
}

// Coloring funcs

const darkenColor = (colorRGB) => {
    if (colorRGB) {
        let rgbR = colorRGB.match(/(?<=\()[0-9]{1,3}(?=\,)/g);
        let rgbG = colorRGB.match(/(?<= )[0-9]{1,3}(?=\,)/g);
        let rgbB = colorRGB.match(/[0-9]{1,3}(?=\)$)/g);
    
        colorHSL = rgbToHsl(rgbR[0], rgbG[0], rgbB[0]);

        return `hsl(${colorHSL[0] * 360}, ${colorHSL[1] * 100}%, ${(colorHSL[2] - 0.1) * 100}%)`;
    }
}


const randomRGB = () => {
    let randomR = Math.floor(Math.random() * 255);
    let randomG = Math.floor(Math.random() * 255);
    let randomB = Math.floor(Math.random() * 255);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}
   
// Creating the board func

const drawGameBoard = (boardSize) => {
    
    container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize**2; i++) {
        let clonedTile = sketchTile.cloneNode();
        clonedTile.addEventListener('click', (e) => {
            e.target.style.backgroundColor = drawColor(e.target.style.backgroundColor);
            if (activeTile) {
                removeHoverDetect();
                activeTile = 0;
            } else {
                addHoverDetect();
                activeTile = 1;
            }
        })
        container.appendChild(clonedTile);
    }
}

// Drawing initial board

drawGameBoard(tileAmount);


const onHover = (e) => {
    e.target.style.backgroundColor = drawColor(e.target.style.backgroundColor);
}

const addHoverDetect = () => {
    const boardTiles = document.querySelectorAll('#tile');
    boardTiles.forEach((tile) => {
        tile.addEventListener('mouseover', onHover)
    })
}

const removeHoverDetect = () => {
    const boardTiles = document.querySelectorAll('#tile');
    boardTiles.forEach((tile) => {
        tile.removeEventListener('mouseover', onHover)
    })
}

const clearBoard = () => {
    const boardTiles = document.querySelectorAll('#tile');
    if (activeTile) { removeHoverDetect(); activeTile = 0}
    boardTiles.forEach((tile) => {
        tile.style.backgroundColor = "rgba(255, 255, 255, 1)";
    })
}

const btnClear = document.getElementById("clearBtn");
btnClear.addEventListener('click', clearBoard);


// Toggles

const toggleGrid = () => {
    const boardTiles = document.querySelectorAll('#tile');
    if (gridFlag) {
        boardTiles.forEach((tile) => {
            tile.style.border = "none";
            gridFlag = 0;
        })
    } else {
        boardTiles.forEach((tile) => {
            tile.style.border = "1px solid black";
            gridFlag = 1;
        })
    }
}



let gridFlag = 0;
const btnToggleGrid = document.getElementById("gridToggle");
btnToggleGrid.addEventListener('click', toggleGrid);

let colorFlag = 0;
const btnDarken = document.getElementById("darkenToggle");
btnDarken.addEventListener('click', () => {
    if (colorFlag === 0) {
        colorFlag = 1;
    } else if (colorFlag === 1) {
        colorFlag = 0;
    } else if (colorFlag === 2) {
        buttons.forEach((btn) => {
            if (btnDarken !== btn && btnToggleGrid !== btn) {
                btn.classList.toggle('buttontoggled');
            }
        })
        colorFlag = 1;
    }
});

const btnRGB = document.getElementById("rgbToggle");
btnRGB.addEventListener('click', () => {
    if (colorFlag === 0) {
        colorFlag = 2;
    } else if (colorFlag === 1) {
        buttons.forEach((btn) => {
            if (btnRGB !== btn && btnToggleGrid !== btn) {
                btn.classList.toggle('buttontoggled');
            }
        })
        colorFlag = 2;
    } else if (colorFlag === 2) {
        colorFlag = 0;
    }
})


// RGB to HSL convert func

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}




// let resizeBoard = (boardSize) => {
    
//     if (tileAmount > boardSize) {
//         clearBoard();
//         container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
//         container.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

//         for (let i = 0; i < (tileAmount**2 - boardSize**2); i++) {
//             let removedNode = container.removeChild(container.lastChild);
//             delete removedNode;
//         }
//         tileAmount = boardSize;
        
//     } else if (tileAmount < boardSize) { 
//         clearBoard();  

//         container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
//         container.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`; 

//         for (let i = 0; i < (boardSize**2 - tileAmount**2); i++) {
//             let clonedTile = sketchTile.cloneNode();
//             clonedTile.addEventListener('click', (e) => {
//                 e.target.style.backgroundColor = drawColor;
//                 if (activeTile) {
//                     removeHoverDetect();
//                     activeTile = 0;
//                 } else {
//                     addHoverDetect();
//                     activeTile = 1;
//                 }
//             })
//             container.appendChild(clonedTile);
//         }

//         tileAmount = boardSize;

//     } else {
//         return;
//     }
// }


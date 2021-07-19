const root = document.documentElement;
const container = document.querySelector('.main__container__div');
const sketchTile = document.createElement('div');
sketchTile.classList.add('tile');
sketchTile.setAttribute('id', 'tile');
const rangeOutput = document.getElementById("outputRange");

let countercheck = 0;

let tileAmount = 16;


const rangeInput = document.getElementById('inputRange');

function handleInputChange(e) {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    drawGameBoard(e.target.value);

    const boardTiles = document.querySelectorAll('#tile');
    if (gridFlag) {
        boardTiles.forEach((tile) => {
            tile.style.border = "1px solid black";
        })
    } else {
        boardTiles.forEach((tile) => {
            tile.style.border = "none";
        })
    }
}

function handleSliderBarChange(e) {
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

rangeInput.addEventListener('mouseup', handleInputChange);
rangeInput.addEventListener('input', handleSliderBarChange)

let activeTile = 0;
let drawColor = '#000';



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


let drawGameBoard = (boardSize) => {
    

    container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize**2; i++) {
        let clonedTile = sketchTile.cloneNode();
        clonedTile.addEventListener('click', (e) => {
            e.target.style.backgroundColor = drawColor;
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

drawGameBoard(tileAmount);



let onHover = (e) => {
    e.target.style.backgroundColor = drawColor;
}

let addHoverDetect = () => {
    const boardTiles = document.querySelectorAll('#tile');
    boardTiles.forEach((tile) => {
        tile.addEventListener('mouseover', onHover)
    })
}

let removeHoverDetect = () => {
    const boardTiles = document.querySelectorAll('#tile');
    boardTiles.forEach((tile) => {
        tile.removeEventListener('mouseover', onHover)
    })
}

let clearBoard = () => {
    const boardTiles = document.querySelectorAll('#tile');
    if (activeTile) { removeHoverDetect(); activeTile = 0}
    boardTiles.forEach((tile) => {
        tile.style.backgroundColor = "#fff";
    })
}

let toggleGrid = () => {
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

const btnClear = document.getElementById("clearBtn");
btnClear.addEventListener('click', clearBoard);

let gridFlag = 0;
const btnToggleGrid = document.getElementById("gridToggle");
btnToggleGrid.addEventListener('click', toggleGrid);

const buttons = document.querySelectorAll('.toggle');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('buttontoggled');
    })
})


let body = document.body;
let board = [8,8];
let startPos = '0,4';
let gameState = [];
let pieces = {
    rook:{
        name:'rook',
        moves:{horizontal:true, vertical:true, diagonal: false, lShape: false, jump: false, distance: Infinity}
    },
    bishop:{
        name:'bishop',
        moves:{horizontal:false, vertical:false, diagonal: true, lShape: false, jump: true, distance: Infinity}
    },
    knight:{
        name:'knight',
        moves:{horizontal:false, vertical:false, diagonal: false, lShape: true, jump: true, distance: Infinity}
    },
    king:{
        name:'king',
        moves:{horizontal:true, vertical:true, diagonal: true, lShape: false, jump: false, distance: 1}
    },
    queen:{
        name:'queen',
        moves:{horizontal:true, vertical:true, diagonal: true, lShape: false, jump: false, distance: Infinity}
    }
}

// create the initial board
for(let i = 0; i < board[0]; i++){
    let col = `<div class='col'>`
    gameState.push([])
    for(let j = 0; j < board[1]; j++){
        col += (`<div onclick=clicked(${i},${j}) class='tile' id=${i},${j}></div>`);
        gameState[i].push({type:'floor', clicked: false});
    }
    col+=`</div>`
    body.innerHTML += col;
}

gameState[0][7] = {
    type: pieces['rook'].name,
    clicked: false,
    x: 0,
    y: 7
};
gameState[1][7] = {
    type: pieces['bishop'].name,
    clicked: false,
    x: 1,
    y: 7
};
gameState[2][7] = {
    type: pieces['knight'].name,
    clicked: false,
    x: 2,
    y: 7
};
gameState[3][7] = {
    type: pieces['king'].name,
    clicked: false,
    x: 3,
    y: 7
};
gameState[4][7] = {
    type: pieces['queen'].name,
    clicked: false,
    x: 4,
    y: 7
};
gameState[5][7] = {
    type: pieces['knight'].name,
    clicked: false,
    x: 5,
    y: 7
};
gameState[6][7] = {
    type: pieces['bishop'].name,
    clicked: false,
    x: 6,
    y: 7
};
gameState[7][7] = {
    type: pieces['rook'].name,
    clicked: false,
    x: 7,
    y: 7
};

gameState.forEach((column, i) => {
    column.forEach((tile, j) => {
        document.getElementById(`${i},${j}`).innerHTML === 'floor' ? gameState[i][j].type : '';
    });
})

function clicked(x,y){
    // get the tile data
    highlight(x,y)
    showMoves(gameState[x][y])
}

function highlight(x,y){
    
    let current = gameState[x][y];
    current.clicked = true;
    gameState.forEach((col, i) => {
        col.forEach((tile, j) => {
            document.getElementById(`${i},${j}`).style.borderColor = 'magenta';

            if(tile === current){
                document.getElementById(`${i},${j}`).style.borderColor = 'red';
            }
        })
    })
}

function showMoves(piece){
        if(/\d/.test(piece.type)){
        return;
    }

    if(piece.type === 'queen' || piece.type ==='rook'){
        gameState.forEach((col, y) => {
            col.forEach((tile, x) => {
                if(y === piece.y || x === piece.x){
                    document.getElementById(`${x},${y}`).style.borderColor = 'green';
                }
            })
        })
    }

    if(piece.type === 'bishop' || piece.type ==='queen'){
        gameState.forEach((col, y) => {
            col.forEach((tile, x) => {
                if(Math.abs(y-piece.y) === Math.abs(x-piece.x)){
                    document.getElementById(`${x},${y}`).style.borderColor = 'green';
                }
            })
        })
    }

    if(piece.type === 'knight'){
        console.log('knight')
        gameState.forEach((col, y) => {
            col.forEach((tile, x) => {
                if(    x === piece.x+1 && y === piece.y+2 
                    || x === piece.x+2 && y === piece.y+1 
                    || x === piece.x-2 && y === piece.y-1
                    || x === piece.x-1 && y === piece.y-2
                    || x === piece.x+2 && y === piece.y-1
                    || x === piece.x+1 && y === piece.y-2
                    || x === piece.x-2 && y === piece.y+1
                    || x === piece.x-1 && y === piece.y+2
                    ){
                    document.getElementById(`${x},${y}`).style.borderColor = 'green';
                }
            })
        })
    }

    if(piece.type === 'king'){
        gameState.forEach((col, y) => {
            col.forEach((tile, x) => {
                if(Math.abs(piece.x - x) === 1 || Math.abs(piece.y - y) === 1){
                    if(Math.abs(y-piece.y) === Math.abs(x-piece.x)){
                        document.getElementById(`${x},${y}`).style.borderColor = 'green';
                    }
                }
            })
        })
    }
    if(piece.type === 'king'){
        gameState.forEach((col, y) => {
            col.forEach((tile, x) => {
                if((y === piece.y && Math.abs(piece.x-x) === 1) || (x === piece.x && Math.abs(piece.y-y) == 1)){
                    document.getElementById(`${x},${y}`).style.borderColor = 'green';
                }
            })
        })
    }
}
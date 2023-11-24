"use strict";

let gameBoard = [[],
                 [],
                 []];

let totalMoves = 0;

const play = (column, row, symbol) =>{
    if(column > 2 || column < 0 || row > 2 || row < 0 || gameBoard[column][row]!= undefined) console.log("imposible move");
    else{
       gameBoard[column][row] = symbol;
       totalMoves++;
       checkResult();
    }
}

const checkResult = () =>{
    for(let i = 0; i < 3; i++){
        if(gameBoard[i][0] === "X" && gameBoard[i][1] === "X" && gameBoard[i][2] === "X") console.log("Player 1 wins");  //Check horizontal lines
        else if((gameBoard[i][0] === "O" && gameBoard[i][1] === "O" && gameBoard[i][2] === "O")) console.log("Player 1 wins");  //Check horizontal lines
        
        else if (gameBoard[0][i] === "X" && gameBoard[1][i] === "X" && gameBoard[2][i] === "X") console.log("Player 1 wins"); //Check vertical lines
        else if (gameBoard[0][i] === "O" && gameBoard[1][i] === "O" && gameBoard[2][i] === "O") console.log("Player 2 wins"); //Check vertical lines
    }

    if(gameBoard[0][0] === "X" && gameBoard[1][1] === "X" && gameBoard[2][2] === "X") console.log("Player 1 wins"); //Check first cross line
    else if(gameBoard[0][0] === "O" && gameBoard[1][1] === "O" && gameBoard[2][2] === "O") console.log("Player 2 wins"); //Check first cross line

    else if(gameBoard[2][0] === "X" && gameBoard[1][1] === "X" && gameBoard[0][2] === "X") console.log("Player 1 wins"); //Check second cross line
    else if(gameBoard[2][0] === "O" && gameBoard[1][1] === "O" && gameBoard[0][2] === "O") console.log("Player 2 wins"); //Check second cross line
    
    if(totalMoves === 9) console.log("Draw");
    console.log(gameBoard);
}

"use strict";

let gameBoard = [[],
                 [],
                 []];

let totalMoves = 0;
let currentPlayer = "X";

const play = (column, row, squareClass) =>{
    if(column > 2 || column < 0 || row > 2 || row < 0 || gameBoard[column][row]!= undefined) console.log("imposible move");
    else{
        gameBoard[column][row] = currentPlayer;
        totalMoves++;
        document.querySelector(`.${squareClass}`).textContent = currentPlayer;
        if(currentPlayer === "X") currentPlayer = "O";
        else currentPlayer = "X";
        checkResult();
    }
}

const checkResult = () =>{
    const RESULT = document.querySelector(".result");
    const GAME_BOARD = document.querySelector(".game-board");
    for(let i = 0; i < 3; i++){
        if(gameBoard[i][0] === "X" && gameBoard[i][1] === "X" && gameBoard[i][2] === "X"){
            RESULT.textContent = "Result: Player 1 (X) wins";  //Check horizontal lines
            GAME_BOARD.style.pointerEvents = "none";
        } 
        else if((gameBoard[i][0] === "O" && gameBoard[i][1] === "O" && gameBoard[i][2] === "O")){
            RESULT.textContent = "Result: Player 2 (O) wins";  //Check horizontal lines
            GAME_BOARD.style.pointerEvents = "none";
        } 
        
        else if (gameBoard[0][i] === "X" && gameBoard[1][i] === "X" && gameBoard[2][i] === "X"){ //Check vertical lines
            RESULT.textContent = "Result: Player 1 (X) wins"; 
            GAME_BOARD.style.pointerEvents = "none";
        } 
        else if (gameBoard[0][i] === "O" && gameBoard[1][i] === "O" && gameBoard[2][i] === "O"){ //Check vertical lines
            RESULT.textContent = "Result: Player 2 (O) wins"; 
            GAME_BOARD.style.pointerEvents = "none";
        } 
    }

    if(gameBoard[0][0] === "X" && gameBoard[1][1] === "X" && gameBoard[2][2] === "X"){ //Check first cross line
        RESULT.textContent = "Result: Player 1 (X) wins"; 
        GAME_BOARD.style.pointerEvents = "none";
    } 
    else if(gameBoard[0][0] === "O" && gameBoard[1][1] === "O" && gameBoard[2][2] === "O"){ //Check first cross line
        RESULT.textContent = "Result: Player 2 (O) wins"; 
        GAME_BOARD.style.pointerEvents = "none";
    } 

    else if(gameBoard[2][0] === "X" && gameBoard[1][1] === "X" && gameBoard[0][2] === "X"){ //Check second cross line
        RESULT.textContent = "Result: Player 1 (X) wins"; 
        GAME_BOARD.style.pointerEvents = "none";
    } 
    else if(gameBoard[2][0] === "O" && gameBoard[1][1] === "O" && gameBoard[0][2] === "O"){ //Check second cross line
        RESULT.textContent = "Result: Player 2 (O) wins"; 
        GAME_BOARD.style.pointerEvents = "none";
    } 
    
    if(totalMoves === 9){
        RESULT.textContent = "Result: Draw";
        GAME_BOARD.style.pointerEvents = "none";
    }
}

//Make design
//Select who can start
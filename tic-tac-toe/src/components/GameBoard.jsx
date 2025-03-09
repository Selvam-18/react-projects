import { useState } from "react";

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ]; 


export default function GameBoard ({onSelect, board}) {

//     let gameBoard = initialGameBoard;

//    for(const turn of turns) {
//     const { square, player } = turn;
//     const { row, col } = square;

//     gameBoard[row][col] = player;
//    }

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectedSquare (rowIndex, colIndex) {
    //     setGameBoard( (previousGameBoard) => { 
    //         //Since array, objects are reference types, change them in memory lays place for any bugs
    //         //To avoid that, we create recreate the basic array, and do manipulation in that
    //         const updatedGameBoard = [...previousGameBoard.map( (nestedArray) => [...nestedArray])];
    //         updatedGameBoard[rowIndex][colIndex] = playerSymbol; //Instead of explicitly updating values, we now use state,
    //         //and we updating the values based on the player's symbol (which is changed in every click)
    //         return updatedGameBoard;
    //     });

    //     onSelect(); //Funciton that switches X to O. It has to be executed as every time the button is clicked!
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => 
                        <li key={colIndex}> 
                            <button onClick={ () => onSelect(rowIndex, colIndex)}
                            disabled={playerSymbol!== null} > {playerSymbol} </button>
                        </li>)}
                    </ol>
                </li>)}
        </ol>
    )
}
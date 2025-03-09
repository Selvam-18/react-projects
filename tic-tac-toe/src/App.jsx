import { useState } from "react";
import Player from "./components/Players.jsx"
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import Gameover from "./components/Gameover.jsx";
import {WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]; 

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveActivePlayer (gamerTurns) {
    let currentPlayer = 'X';

    if(gamerTurns.length > 0 && gamerTurns[0].player === 'X'){
      currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveWinner  (gameBoard, playersName) {
  let winner;

  for(const winCombination of WINNING_COMBINATIONS) {
    let firstSquareSymbol = gameBoard[winCombination[0].row][winCombination[0].column];
    let secondSquareSymbol = gameBoard[winCombination[1].row][winCombination[1].column];
    let thirdSquareSymbol = gameBoard[winCombination[2].row][winCombination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playersName[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard (gameTurns) {
  let gameBoard = [...initialGameBoard.map( array => [...array])];

  for(const turn of gameTurns) {
   const { square, player } = turn;
   const { row, col } = square;

   gameBoard[row][col] = player;
  }
  return gameBoard;
}



function App() {
  const [playersName, setPlayersName]= useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  let currentPlayer = deriveActivePlayer(gameTurns)
  //const [isActive, setIsActive] = useState('X');
  //We can make use of the turns array to set the current player

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playersName);

  //This below action is defined in function deriveGameBoard
  {// let gameBoard = [...initialGameBoard.map( array => [...array])];

  // for(const turn of gameTurns) {
  //  const { square, player } = turn;
  //  const { row, col } = square;

  //  gameBoard[row][col] = player;
  // }
  }
  //This below action is defined in function deriveWinner
  {// let winner;

  // for(const winCombination of WINNING_COMBINATIONS) {
  //   let firstSquareSymbol = gameBoard[winCombination[0].row][winCombination[0].column];
  //   let secondSquareSymbol = gameBoard[winCombination[1].row][winCombination[1].column];
  //   let thirdSquareSymbol = gameBoard[winCombination[2].row][winCombination[2].column];

  //   if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
  //     winner = playersName[firstSquareSymbol];
  //   }
  // }}
  }

  const draw = gameTurns.length === 9 && !winner;

  function handlePlayerSymbol (rowIndex, colIndex) {
    // setIsActive( (currentSymbol) => 
    //   currentSymbol === 'X' ? 'O' : 'X'
    // )
    setGameTurns ( (prevGameTurn) => {
      // let currentPlayer = 'X';

      // if(prevGameTurn.length > 0 && prevGameTurn[0].player === 'X'){
      //   currentPlayer = 'O';
      // }
      //The above logic is replaced using helper function defined above the App component

      let currentPlayer = deriveActivePlayer(prevGameTurn);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
         ...prevGameTurn ];
      console.log(currentPlayer);
      console.log(prevGameTurn)
      return updatedTurns;
    });
  }

  function handleRestart (){
    setGameTurns([]);
  }

  function handlePlayerNameChange (symbol, newName) {
    setPlayersName( prevPlayers => {
      console.log(prevPlayers);
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    }
    );
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol='X' 
            playerTurn={currentPlayer === 'X'} 
            onChangeName={handlePlayerNameChange} 
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol='O' 
            playerTurn={currentPlayer === 'O'} 
            onChangeName={handlePlayerNameChange} 
          />
        </ol>
        {(winner || draw) && <Gameover winner={winner} onRematch={handleRestart}/>}
        <GameBoard onSelect={handlePlayerSymbol} board={gameBoard}/>
      </div>
        <Log turns={gameTurns}/>
    </main>
  )
}

export default App;

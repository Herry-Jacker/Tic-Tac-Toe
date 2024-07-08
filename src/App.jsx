import { useState } from "react"
import GameBoard from "./component/GameBoard"
import GameOver from './component/GameOver'
import Player from "./component/Player"
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./wining-combination";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [ null, null, null],
  [ null, null, null],
  [ null, null, null],
];

// To update gameBoard when gameTurn is changed
const driveGameBoard = (gameTurn) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];
  for( const turn of gameTurn ) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

// To get active player
const driveActivePlayer = (gameTurn) => {
  let currPlayer = 'X';
  if(gameTurn.length > 0 && gameTurn[0].player == currPlayer ) {
    currPlayer = "O";
  }
  return currPlayer;
}

// To check winner
const driveWinner = (gameBoard) => {
  let winner;
  for( const combination of WINNING_COMBINATIONS ) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol ) {
      winner = firstSquareSymbol;
    }
  }
  return winner;
}

function App() {
  const [ gameTurn, setGameTurn ] = useState([]);
  const [ players, setPlayers ] = useState(PLAYERS);
  const activePlayer = driveActivePlayer(gameTurn);
  const gameBoard = driveGameBoard(gameTurn);
  const winner = driveWinner(gameBoard);
  const hasDraw = gameTurn.length == 9 && !winner;

// To reMatch
  const handleRematch = () => {
    setGameTurn([]);
  }

// To update player name
  const handleChangePlayerName = (key, updatedName) => {
    setPlayers(pervPlayers => {
      const updatedPlayers = pervPlayers;
      updatedPlayers[key] = updatedName;
      return updatedPlayers;
    })
  }

// On playing and select square
  const handleSelectSquare = ( rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      const currPlayer = driveActivePlayer(prevTurn);
      const updateTurn = [
        { square: { row: rowIndex, col: colIndex}, player: currPlayer},
        ...prevTurn,
      ];

      return updateTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            name={players["X"]} 
            symbol="X" 
            isActive={ activePlayer === 'X'}
            updatePlayerName={handleChangePlayerName}
          />
          <Player 
            name={players["O"]}
            symbol="O" 
            isActive={ activePlayer === 'O'} 
            updatePlayerName={handleChangePlayerName}
          />
        </ol>
        { (winner || hasDraw) && <GameOver reMatch={handleRematch} winner={players[winner]}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App

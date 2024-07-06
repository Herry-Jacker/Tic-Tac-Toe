import { useState } from "react"
import GameBoard from "./component/GameBoard"
import GameOver from './component/GameOver'
import Player from "./component/Player"
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./wining-combination";

const initialGameBoard = [
  [ null, null, null],
  [ null, null, null],
  [ null, null, null],
];

const driveActivePlayer = (gameTurn) => {
  let currPlayer = 'X';

  if(gameTurn.length > 0 && gameTurn[0].player == currPlayer ) {
    currPlayer = "O";
  }

  return currPlayer;
}

let winner;

function App() {
  const [ gameTurn, setGameTurn ] = useState([]);
  // const [ hasWinner, setHasWinner ] = useState(false);
  const activePlayer = driveActivePlayer(gameTurn);
  
  let gameBoard = initialGameBoard;
  for( const turn of gameTurn ) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  

  for( const combination of WINNING_COMBINATIONS ) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurn.length == 9 && !winner;

  const handleSelectSquare = ( rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      const currPlayer = driveActivePlayer(prevTurn)
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
          <Player name="Player1" symbol="X" isActive={ activePlayer === 'X'} />
          <Player name="Player2" symbol="O" isActive={ activePlayer === 'O'} />
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App

import { useState } from "react"
import GameBoard from "./component/GameBoard"
import Player from "./component/Player"
import Log from "./Log";

function App() {
  
  const [ activePlayer, setActivePlayer ] = useState('X');
  const [ gameTurn, setGameTurn ] = useState([]);

  const handleSelectSquare = ( rowIndex, colIndex) => {
    setActivePlayer(curPlayer => curPlayer === 'X' ? 'O' : 'X');
    setGameTurn((prevTurn) => {
      let currPlayer = 'X';

      if(prevTurn.length > 0 && prevTurn[0].player == currPlayer ) {
        currPlayer = "O";
      }
      
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
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn} />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App

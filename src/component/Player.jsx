import { useState } from "react";

const Player = ({name, symbol, isActive, updatePlayerName }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ player, setPlayer ] = useState(name);

// component by condition of editting
    let PlayerName = isEditing ? <input 
        type="text" 
        value={player}
        onChange={(event) => setPlayer(event.target.value) }
        required/> : <span className="player-name">{player}</span>;

    const handleClick = () => {
        isEditing ? updatePlayerName(symbol, player) : null;
        setIsEditing((prev) => !prev);
    }

    return (
        <li className={ isActive ? 'active' : undefined }>
            <span className="player">
                {PlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button
                onClick={handleClick}
            >
                { isEditing ? "Save" : "Edit" }
            </button>
        </li>
    )
}

export default Player;
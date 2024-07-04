import { useState } from "react";

const Player = ({name, symbol}) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ player, setPlayer ] = useState(name);

    let PlayerName = isEditing ? <input 
        type="text" 
        value={player}
        onChange={(event) => setPlayer(event.target.value) }
        required/> : <span>{player}</span>;

    const handleClick = () => {
        setIsEditing((prev) => !prev)
    }

    return (
        <li className="player">
            <span>
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
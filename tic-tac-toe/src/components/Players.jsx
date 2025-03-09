import { useState } from "react";

export default function Players({initialName, symbol, playerTurn, onChangeName}) {

    const [playerName, setPlayerName] = useState(initialName);

    const [isEditing, setIsEditing] = useState(false);

    function handleButtonClick() {
        setIsEditing( (editing) => !editing);

        if(isEditing) {
            onChangeName(symbol, playerName)
            console.log(playerName);
        }
    }

    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value); 
    }
    
    let playerNameInput = <span className="player-name">{playerName}</span>;
    
    if(isEditing) {
        playerNameInput = <input className="player" name="player-name" required value={playerName} onChange={handleChange}/>
    }

    return (
        <li className={playerTurn ? 'active' : undefined}>
            <span>
                {playerNameInput}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonClick} >{!isEditing ? 'Edit': 'Save'}</button>
        </li>
    )
}
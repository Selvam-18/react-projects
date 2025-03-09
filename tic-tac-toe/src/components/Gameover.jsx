export default function Gameover ({winner, onRematch}) {
    return (
        <div id="game-over">
            <h2>GAME OVER!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>Match Draw!</p>}
            <p><button onClick={onRematch}>Rematch!</button></p>
        </div>
    )
}
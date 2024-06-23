import './UI.css'

export default function UI(props: { gameOver: boolean, resetGame: () => void, score: number }) {
  return <div className="ui">
    <div>
      <h1>Snake Game</h1>
      <p>Use the arrow keys to move the snake</p>
      <p>Don't hit the walls or yourself</p>
    </div>
    <div className='score'>
      <h2>Score: {props.score}</h2>
    </div>
    {props.gameOver && <button className='reset' onClick={props.resetGame}>Game Over! Click here to play again</button>}
  </div>
}
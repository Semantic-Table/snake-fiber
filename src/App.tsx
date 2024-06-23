import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { Vector3 } from 'three'
import './App.css'
import Apple from './Apple'
import Board from './Board'
import Snake from './Snake'
import UI from './UI'

function App() {

  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [snakePosition, setSnakePosition] = useState<[number, number][]>([[5, 5]])
  const [applePosition, setApplePosition] = useState<[number, number]>([2, 2])

  const resetGame = () => {
    setGameOver(false)
    setSnakePosition([[5, 5]])
    setApplePosition([2, 2])
    setScore(0)
  }

  return (
    <>
      <UI gameOver={gameOver} resetGame={resetGame} score={score} />
      <Canvas camera={{ position: new Vector3(0, 10, 5) }}>
        {/* <OrbitControls /> */}
        <ambientLight />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Board />
        <Snake gameOver={gameOver} snakePosition={snakePosition} setSnakePosition={setSnakePosition} setGameOver={setGameOver} applePosition={applePosition} setApplePosition={setApplePosition} score={score} setScore={setScore} />
        <Apple applePosition={applePosition} setApplePosition={setApplePosition} />
      </Canvas>
    </>
  )
}

export default App

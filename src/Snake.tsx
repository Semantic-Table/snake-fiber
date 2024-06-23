import { useFrame } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { clamp } from "three/src/math/MathUtils.js"

export default function Snake(props: {
  snakePosition: [number, number][],
  applePosition: [number, number],
  gameOver: boolean,
  setSnakePosition: (position: [number, number][]) => void,
  setApplePosition: (position: [number, number]) => void,
  setGameOver: (gameOver: boolean) => void,
  setScore: (score: number) => void,
  score: number
}) {
  const { setSnakePosition, setApplePosition, setGameOver, applePosition } = props
  const [time, setTime] = useState(0)
  const [direction, setDirection] = useState<[number, number]>([1, 0])

  const handleMove = () => {
    const newPosition: [number, number] = [props.snakePosition[0][0] + direction[0], props.snakePosition[0][1] + direction[1]]

    // boundary check
    if (newPosition[0] < 0 || newPosition[0] > 9 || newPosition[1] < 0 || newPosition[1] > 9) {
      console.log('hit wall');
      setGameOver(true)
      return
    }

    // self collision check
    if (props.snakePosition.slice(1).some((position) => position[0] === newPosition[0] && position[1] === newPosition[1])) {
      console.log('hit self');
      setGameOver(true)
      return
    }

    // eat apple check
    if (newPosition[0] === applePosition[0] && newPosition[1] === applePosition[1]) {
      setSnakePosition([newPosition, ...props.snakePosition])
      // generate new apple position not on the snake

      let newApplePosition: [number, number]
      do {
        newApplePosition = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
      } while (props.snakePosition.some((position) => position[0] === newApplePosition[0] && position[1] === newApplePosition[1]))

      setApplePosition(newApplePosition)
      props.setScore(props.score + 1)
      return
    }

    // move snake
    const snakePosition = [newPosition, ...props.snakePosition]
    snakePosition.pop()



    // update position
    setSnakePosition(snakePosition)
  }


  const handleKeyDown = (e: KeyboardEvent) => {
    
    switch (e.key) {
      case 'ArrowUp':
        setDirection([0, -1])
        break
      case 'ArrowDown':
        setDirection([0, 1])
        break
      case 'ArrowLeft':
        setDirection([-1, 0])
        break
      case 'ArrowRight':
        setDirection([1, 0])
        break
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
  }, [])


  useFrame((state, delta) => {
    setTime((time) => time + delta)
    
    
    if (time > clamp(0.5 - (props.score / 100), 0.1, 0.5) && !props.gameOver) {
      console.log(time);
      
      handleMove()
      setTime(0)
    }
  })

  const getDirection = (): number => {

    if (direction[0] === 1 && direction[1] === 0) {
      return 0

    }

    if (direction[0] === -1 && direction[1] === 0) {

      return Math.PI
    }

    if (direction[0] === 0 && direction[1] === 1) {
      return -Math.PI / 2
    }

    if (direction[0] === 0 && direction[1] === -1) {
      return Math.PI / 2
    }

    return 0

  }

  return <>
    {props.snakePosition.map((position, index) =>
    (
      <group key={index} position={[position[0] - 4.5, 0.5, position[1] - 4.5]} rotation={[0, getDirection(), 0]}>
        {index === 0 ? <>
          <mesh position={[0.5, 0, 0.2]}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh position={[0.5, 0, -0.2]}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.91, 0.91, 0.91]} />
            <meshStandardMaterial color="#FF69B4" />
          </mesh>
        </> : null}
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color="pink" />
        </mesh>
      </group>))}

  </>
}
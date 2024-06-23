
export default function Apple(props: { applePosition: [number, number], setApplePosition: (position: [number, number]) => void }) {
  const { setApplePosition, applePosition } = props


  return <>
    <mesh position={[applePosition[0] - 4.5, 0.2, applePosition[1] - 4.5]}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial color='#6fb072' />
    </mesh>
  </>
}
export default function Board() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#915753" />

        {Array(11).fill(0).map((_, i) => (
          <mesh key={i} position={[-5 + i, 0, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 10]} />
            <meshStandardMaterial color="#947472" />
          </mesh>
        ))}

        {Array(11).fill(0).map((_, i) => (
          <mesh key={i} position={[0, -5 + i, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 10]} />
            <meshStandardMaterial color="#947472" />
          </mesh>
        ))}

      </mesh>
    </>
  )
}
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {Scene} from './Model'
import { Suspense } from "react";
import { OrbitControls,Html } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {



  const [startPlay, setStartPlay] = useState(false);

  function Loader() {
    //const { progress } = useProgress()
    //return <Html center style={{ color: 'white' }}>{progress} % loaded</Html>
    return <Html center style={{ color: 'white' }}>loading...</Html>
  }

  function changePlay() {
    if (startPlay === false) {
      setStartPlay(true)
    } else {
      setStartPlay(false)
    }
    //setStartPlay(true);
  }
  return (
    <Canvas>
      <OrbitControls/>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/*<Box position={[-1.2, 0, 0]} />*/}
      {/*<Box position={[1.2, 0, 0]} />*/}
      <Suspense fallback={<Loader />}>
      <Scene play={changePlay}  ifPlay={startPlay}/>
      </Suspense>
    </Canvas>
  )
}
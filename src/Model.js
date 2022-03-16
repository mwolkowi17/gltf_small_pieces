import { useLoader,useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three'


export function Scene(props) {
  const gltf = useLoader(GLTFLoader, '/kruszarka_szczekowa1_wer15_scena3.gltf')
  const gltfcopy = useMemo(() => gltf.scene.clone(), [gltf.scene])
  const mixer = useRef();

  useEffect(() => {
    if (gltf) {
      mixer.current = new THREE.AnimationMixer(gltfcopy)
      const action = mixer.current.clipAction(gltf.animations[0])
      //console.log(gltf.animations)
      if (props.ifPlay) {
        //console.log('played');
        action.play()
      }


    }
  }, [gltf, gltfcopy, props.ifPlay])

  useFrame((state, delta) => {
    mixer.current?.update(delta)
  })

  return (
    <>
      <primitive object={gltfcopy} scale={[0.8,0.8,0.8]} position={[0,0,0]} onClick={props.play}  />
    </>
  )
}
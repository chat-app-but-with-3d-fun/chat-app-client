// import React from 'react';
// import { Canvas, useLoader, useFrame } from "@react-three/fiber";
// import { Html, OrbitControls, Text } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const Lights = () => {
//   return (
//     <>
//       <ambientLight intensity={0.3} />

//       <directionalLight position={[10, 10, 5]} intensity={1} />

//       <spotLight intensity={1.3} position={[10, 0, 0]} color="red"  />
//     </>
//   );
// };

// const  Model = () =>  {
//   const gltf = useLoader(GLTFLoader, '/scene.gltf');
//   // console.log(gltf)
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.y  += 0.01));

//   return (
//     <mesh ref={mesh}>
//       <primitive position={[0, 0, 1]} object={gltf.scene} scale={15} />
//     </mesh>
//   );
// };

// const HTMLContent = () => {
//   return (
//     <group position={[-1, 0.5, 2]}>
//       <Html  >
//         <h1>When life gives you lemons....</h1>
//         <p>...leave us a blog post. Just be nice.</p>
//       </Html>
//     </group>
//   );
// };

// const Hello = () => {
//   const mesh = useRef(null);
//   const [active, setActive] = useState(false)

//   useFrame(() => { mesh.current.rotation.y -= 0.009;
//     // textRef.current.rotation.x += 0.005;
//   });
//   return (
//     <Text onClick={(e) => setActive(!active)} scale={active ? 15 : 10} color={active? 'black' : '#1b5f56'} anchorX="center" anchorY="middle" ref={mesh}>
//       BLOG ME IF YOU CAN
//     </Text>
//   );
// };

const Dashboard = () => {
  return (
    <div>
      
    </div>
  )
}

export default Dashboard

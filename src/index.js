import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ParamChild from './features/components/paramChild';
import { useUpdate } from 'react-three-fiber'

const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        {/* <Route path="/:id" component={ParamChild} /> */}
      </Switch>
    </Router>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);







// ----------------------------- OLD HOME CODE --------------------------------------------------------------
// function Box(){
//   return (
//     <mesh>
//       <boxBufferGeometry attach='geometry' />
//       <meshLambertMaterial attach='material' color='hotpink' />
//     </mesh>
//   )
// }

// // function Plane(){
// //   return(
// //     <mesh position={[0, 2, 0]} rotation={[-Math.PI/2, 0, 0]}>
// //       <planeBufferGeometry attach='geometry' args={[100,100]} />
// //       <meshLambertMaterial attach='material' color='lightblue' />
// //     </mesh>
// //   )
// // }

// export default function Home(){
//   return (
//     <>
//     <div>
//       welcome to koko!
//     </div>
//     <Canvas style={{width: '100%' , height: '100%' }}>
//       <color attach='background' args={'black'}/>
//       <OrbitControls />
//       <Stars fade />
//       <ambientLight intensity={1} />
//       <spotLight position={[10, 15, 10]} angle={0.3} />
//       <Box />
//       {/* <Plane /> */}
//     </Canvas>
//     </>

    
//   )
// }


// ---------------------- REACT THREE FIBER TUTORIAL --------------------------------------------------
// function Scene(){
//   const colorMap = useLoader(TextureLoader, 'Pegasus_normal.png')
//   return(
//     <>
//       <ambientLight intensity={0.2} />
//       <directionalLight />
//       <mesh>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshStandardMaterial />
//       </mesh>
//     </>
//   )
// }

// export default function Home(){
//   return(
//     <Canvas>
//       <Suspense fallback={null}>
//         <Scene />
//       </Suspense>
//     </Canvas>
//   )
// }
// ---------------------------------------------------------------------------------------------------

// const Lights = () =>
// {
//   return (
//     <>
//       <ambientLight intensity={0.3} />

//       <directionalLight position={[10, 10, 5]} intensity={1} />

//       <spotLight intensity={1.3} position={[10, 0, 0]} color="red"  />
//     </>
//   );
// };

// const  Model = () =>  {
//   const gltf = useLoader(GLTFLoader, 'highpoly_baseColor.jpg');
//   // console.log(gltf)
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.y  += 0.01));

//   return (
//     <mesh ref={mesh}>
//       <primitive position={[0, 0, 1]} object={gltf.scene} scale={15} />
//     </mesh>
//   );
// };

// const Hello = () => {
//   const mesh = useRef(null);
//   const [active, setActive] = useState(false)

//   useFrame(() => { mesh.current.rotation.y -= 0.006;

//   });
//   return (
//     <Text 
//     // onClick={(e) => setActive(!active)} 
//     scale={active ? 15 : 10} color={active? 'black' : '#1b5f56'} anchorX="center" anchorY="middle" ref={mesh}>
//       Koko
//     </Text>
//   );
// };
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


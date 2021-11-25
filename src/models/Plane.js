import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas,  useLoader, useFrame, primitive } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, Stars, useAnimations, useGLTF } from '@react-three/drei';
// import { usePlane } from "@react-three/cannon"
// import { useSpring, animated } from '@react-spring/three'

export default function Plane(props){
    return(
  
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" {...props} args={[50, 50]} />
        <meshStandardMaterial attach="material" color="slategrey" />
      </mesh>
    )
  }
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Hadrien59 (https://sketchfab.com/Hadrien59)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/robot-playground-59fc99d8dcb146f3a6c16dbbcc4680da
title: Robot Playground
*/

import React, { useRef, Suspense } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/robot/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)
  

  useEffect(() => {
    actions['Take 001'].play()
          setTimeout(() => {
          actions['Take 001'].stop()
        }, 6000)

    }, [])

  console.log('ROBOT ', group)
  return (
    <Suspense fallback={null}>
    <group ref={group} {...props} dispose={null} >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* <group scale={1.88}> */}
          <group scale={1}>
            <group position={[0.33, 0, -0.1]} rotation={[-Math.PI, -0.14, -Math.PI]} scale={0.99}>
              <group rotation={[0, 0.88, 0]}>
                <group position={[-4.63, 14.29, 1.99]}>
                  <group position={[4.63, -4.89, -1.99]} rotation={[0.01, 0, 0.01]} scale={1.18}>
                    <group position={[-0.35, -0.12, -0.32]} scale={0}>
                      <mesh geometry={nodes.pPlatonic3_holo1_0.geometry} material={nodes.pPlatonic3_holo1_0.material} />
                    </group>
                    <group position={[0.22, 0.11, 0]} rotation={[-Math.PI, -1.46, Math.PI]}>
                      <group position={[0.04, 0.75, 0.25]}>
                        <group position={[-0.03, -10.24, -0.04]} rotation={[0, Math.PI / 4, 0]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh12_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh12_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]}>
                              <group rotation={[0.49, 0, 0]} scale={3.17}>
                                <group scale={2.08}>
                                  <mesh
                                    geometry={nodes.pSuperShape2_holo1_0.geometry}
                                    material={nodes.pSuperShape2_holo1_0.material}
                                  />
                                </group>
                                <group scale={2.08}>
                                  <mesh
                                    geometry={nodes.pSuperShape3_holo1_0.geometry}
                                    material={nodes.pSuperShape3_holo1_0.material}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, -10.24, -0.04]} rotation={[0, Math.PI / 2, 0]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh19_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh19_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]}>
                              <group rotation={[0.32, -0.66, 1.52]} scale={2.05}>
                                <mesh
                                  geometry={nodes.pGear1_holo1_0.geometry}
                                  material={nodes.pGear1_holo1_0.material}
                                />
                                <mesh
                                  geometry={nodes.pGear2_holo1_0.geometry}
                                  material={nodes.pGear2_holo1_0.material}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, -10.24, -0.04]} rotation={[-Math.PI, Math.PI / 4, Math.PI]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh18_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh18_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]}>
                              <group position={[0, 0.03, 0]} rotation={[0.48, 0.1, 0]} scale={2.37}>
                                <mesh
                                  geometry={nodes.pHelix1_holo1_0.geometry}
                                  material={nodes.pHelix1_holo1_0.material}
                                />
                                <mesh
                                  geometry={nodes.pHelix2_holo1_0.geometry}
                                  material={nodes.pHelix2_holo1_0.material}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, -10.24, -0.04]} rotation={[-Math.PI, 0, -Math.PI]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh17_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh17_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]}>
                              <group position={[-0.25, 1.1, -0.4]} rotation={[-0.18, -0.67, 0.27]} scale={1.55}>
                                <group scale={[5.26, 7.64, 5.26]}>
                                  <mesh
                                    geometry={nodes.pPyramid1_holo1_0.geometry}
                                    material={nodes.pPyramid1_holo1_0.material}
                                  />
                                </group>
                                <group scale={[5.57, 8.09, 5.57]}>
                                  <mesh
                                    geometry={nodes.pPyramid2_holo1_0.geometry}
                                    material={nodes.pPyramid2_holo1_0.material}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, -10.24, -0.04]} rotation={[-Math.PI, -Math.PI / 4, -Math.PI]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh16_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh16_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]}>
                              <group rotation={[0.22, 0.16, 0.93]} scale={1.89}>
                                <mesh
                                  geometry={nodes.pTorus2_holo1_0.geometry}
                                  material={nodes.pTorus2_holo1_0.material}
                                />
                                <mesh
                                  geometry={nodes.pTorus1_holo1_0.geometry}
                                  material={nodes.pTorus1_holo1_0.material}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, -10.24, -0.04]} rotation={[0, -Math.PI / 4, 0]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh14_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh14_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]} scale={1.3}>
                              <group rotation={[-0.62, -0.62, 0.1]}>
                                <group scale={4.81}>
                                  <mesh
                                    geometry={nodes.pCube1_holo1_0.geometry}
                                    material={nodes.pCube1_holo1_0.material}
                                  />
                                </group>
                                {/* <group scale={4.92}> */}
                                <group scale={4.92}>
                                  <mesh
                                    geometry={nodes.pCube2_holo1_0.geometry}
                                    material={nodes.pCube2_holo1_0.material}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, -10.24, -0.04]}>
                          <group position={[-12.69, 10.7, 0]} scale={0.24}>
                            <group position={[0, 0.24, 0]} rotation={[-1.13, 0, Math.PI / 2]} scale={[1.03, 1, 1.03]}>
                              <mesh
                                geometry={nodes.MASH1_ReproMesh13_holo1_0.geometry}
                                material={nodes.MASH1_ReproMesh13_holo1_0.material}
                              />
                            </group>
                            <group rotation={[0, 1.13, 0]}>
                              <group rotation={[-0.51, 0, 0]} scale={[1.22, 0.98, 1.22]}>
                                <group scale={3.57}>
                                  <mesh
                                    geometry={nodes.pCylinder2_holo1_0.geometry}
                                    material={nodes.pCylinder2_holo1_0.material}
                                  />
                                </group>
                                <group scale={3.67}>
                                  <mesh
                                    geometry={nodes.pCylinder3_holo1_0.geometry}
                                    material={nodes.pCylinder3_holo1_0.material}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                        <group position={[-0.03, 0.46, -0.04]} scale={[0.82, 0.44, 0.82]}>
                          <mesh
                            geometry={nodes.pCylinder4_holo1_0.geometry}
                            material={nodes.pCylinder4_holo1_0.material}
                          />
                        </group>
                      </group>
                      <group position={[0.02, -10.72, 0.22]} rotation={[0, -Math.PI / 2, 0]}>
                        <group position={[-12.36, 11.8, 0.23]} scale={0.3}>
                          <group rotation={[Math.PI, -1.16, Math.PI]}>
                            <group scale={1.44}>
                              <group scale={3.24}>
                                <mesh
                                  geometry={nodes.pPlatonic1_holo1_0.geometry}
                                  material={nodes.pPlatonic1_holo1_0.material}
                                />
                              </group>
                              <group scale={3.41}>
                                <mesh
                                  geometry={nodes.pPlatonic2_holo1_0.geometry}
                                  material={nodes.pPlatonic2_holo1_0.material}
                                />
                              </group>
                            </group>
                          </group>
                          <group
                            position={[0.23, 0.01, -0.55]}
                            rotation={[-1.13, 0, Math.PI / 2]}
                            scale={[0.82, 0.79, 0.82]}>
                            <mesh
                              geometry={nodes.MASH1_ReproMesh15_holo1_0.geometry}
                              material={nodes.MASH1_ReproMesh15_holo1_0.material}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
            <group position={[0, 0.39, 0]}>
              <group position={[0, -0.43, 0]} rotation={[0, -0.31, 0]}>
                <group position={[0, 0.43, 0]}>
                  <mesh
                    geometry={nodes.MASH1_ReproMesh2_holo1_0.geometry}
                    material={nodes.MASH1_ReproMesh2_holo1_0.material}
                  />
                </group>
                <mesh geometry={nodes.pPipe4_holo1_0.geometry} material={nodes.pPipe4_holo1_0.material} />
              </group>
              <group position={[0, -0.58, 0]} rotation={[0, 0.31, 0]}>
                <group position={[0, 0.58, 0]} scale={[0.82, 0.8, 0.82]}>
                  <mesh
                    geometry={nodes.MASH1_ReproMesh3_holo1_0.geometry}
                    material={nodes.MASH1_ReproMesh3_holo1_0.material}
                  />
                </group>
                <group rotation={[0, 0.68, 0]} scale={0.86}>
                  <mesh geometry={nodes.pPipe3_holo1_0.geometry} material={nodes.pPipe3_holo1_0.material} />
                </group>
                <mesh geometry={nodes.pPipe2_holo1_0.geometry} material={nodes.pPipe2_holo1_0.material} />
              </group>
              <group rotation={[0, -0.31, 0]}>
                <group scale={[1.03, 1, 1.03]}>
                  <mesh
                    geometry={nodes.MASH1_ReproMesh1_holo1_0.geometry}
                    material={nodes.MASH1_ReproMesh1_holo1_0.material}
                  />
                </group>
                <mesh geometry={nodes.pPipe1_holo1_0.geometry} material={nodes.pPipe1_holo1_0.material} />
              </group>
              <group position={[0, -0.39, 0]} scale={11.11}>
                <mesh geometry={nodes.pDisc1_holo1_0.geometry} material={nodes.pDisc1_holo1_0.material} />
              </group>
            </group>
          </group>
          <group rotation={[-Math.PI, 0, 0]} scale={-1} />
          <primitive object={nodes._rootJoint} />
          <skinnedMesh 
            geometry={nodes.knee_bot_0.geometry}
            material={nodes.knee_bot_0.material}
            skeleton={nodes.knee_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.foot_bot_0.geometry}
            material={nodes.foot_bot_0.material}
            skeleton={nodes.foot_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.hand_bot_0.geometry}
            material={nodes.hand_bot_0.material}
            skeleton={nodes.hand_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.upperLeg_bot_0.geometry}
            material={nodes.upperLeg_bot_0.material}
            skeleton={nodes.upperLeg_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.body_bot_0.geometry}
            material={nodes.body_bot_0.material}
            skeleton={nodes.body_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.index_bot_0.geometry}
            material={nodes.index_bot_0.material}
            skeleton={nodes.index_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.pinky_bot_0.geometry}
            material={nodes.pinky_bot_0.material}
            skeleton={nodes.pinky_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.thumb_bot_0.geometry}
            material={nodes.thumb_bot_0.material}
            skeleton={nodes.thumb_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.earBall_bot_0.geometry}
            material={nodes.earBall_bot_0.material}
            skeleton={nodes.earBall_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.topHeadBall_bot_0.geometry}
            material={nodes.topHeadBall_bot_0.material}
            skeleton={nodes.topHeadBall_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.topHeadTube_bot_0.geometry}
            material={nodes.topHeadTube_bot_0.material}
            skeleton={nodes.topHeadTube_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.shoulder_bot_0.geometry}
            material={nodes.shoulder_bot_0.material}
            skeleton={nodes.shoulder_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.midfinger_bot_0.geometry}
            material={nodes.midfinger_bot_0.material}
            skeleton={nodes.midfinger_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.neckTop_bot_0.geometry}
            material={nodes.neckTop_bot_0.material}
            skeleton={nodes.neckTop_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.neck_bot_0.geometry}
            material={nodes.neck_bot_0.material}
            skeleton={nodes.neck_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.head_bot_0.geometry}
            material={nodes.head_bot_0.material}
            skeleton={nodes.head_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.topHead_bot_0.geometry}
            material={nodes.topHead_bot_0.material}
            skeleton={nodes.topHead_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.hip_bot_0.geometry}
            material={nodes.hip_bot_0.material}
            skeleton={nodes.hip_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.earTube_bot_0.geometry}
            material={nodes.earTube_bot_0.material}
            skeleton={nodes.earTube_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.ear_bot_0.geometry}
            material={nodes.ear_bot_0.material}
            skeleton={nodes.ear_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.neckBase_bot_0.geometry}
            material={nodes.neckBase_bot_0.material}
            skeleton={nodes.neckBase_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eyeCloseKawaii_bot_0.geometry}
            material={nodes.eyeCloseKawaii_bot_0.material}
            skeleton={nodes.eyeCloseKawaii_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eye_bot_0.geometry}
            material={nodes.eye_bot_0.material}
            skeleton={nodes.eye_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eyeSmile_bot_0.geometry}
            material={nodes.eyeSmile_bot_0.material}
            skeleton={nodes.eyeSmile_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eyeClose_bot_0.geometry}
            material={nodes.eyeClose_bot_0.material}
            skeleton={nodes.eyeClose_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.happy_bot_0.geometry}
            material={nodes.happy_bot_0.material}
            skeleton={nodes.happy_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.smile_bot_0.geometry}
            material={nodes.smile_bot_0.material}
            skeleton={nodes.smile_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.o_bot_0.geometry}
            material={nodes.o_bot_0.material}
            skeleton={nodes.o_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.close_bot_0.geometry}
            material={nodes.close_bot_0.material}
            skeleton={nodes.close_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eyeCloseKawaii1_bot_0.geometry}
            material={nodes.eyeCloseKawaii1_bot_0.material}
            skeleton={nodes.eyeCloseKawaii1_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eye1_bot_0.geometry}
            material={nodes.eye1_bot_0.material}
            skeleton={nodes.eye1_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eyeSmile1_bot_0.geometry}
            material={nodes.eyeSmile1_bot_0.material}
            skeleton={nodes.eyeSmile1_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.eyeClose1_bot_0.geometry}
            material={nodes.eyeClose1_bot_0.material}
            skeleton={nodes.eyeClose1_bot_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.arm2_bot_0.geometry}
            material={nodes.arm2_bot_0.material}
            skeleton={nodes.arm2_bot_0.skeleton}
          />
        </group>
      </group>
    </group>
    </Suspense>
  )
}

useGLTF.preload('/robot/scene-transformed.glb')

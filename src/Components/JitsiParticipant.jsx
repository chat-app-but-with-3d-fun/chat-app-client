import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';


export default function JitsiParticipant(props) {
 
const videoRef = useRef(null) 
const {payload} = props
    const {id, track} = payload

useEffect(() =>

{
    console.log('Travk arrived??', track)
    console.log("useEffect in Participant", videoRef.current)
    // 
}, [payload]
)

useLayoutEffect(() => {
    videoRef.current.srcObject = track.stream
},[])

  return (
    <>
        <video ref={videoRef} />
    </>
  );
}
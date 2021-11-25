import React from 'react'

export default function JitsiLocalAudio(props) {
    const {audioRef} = props
    console.log('REFREFREFREF: ', audioRef)
    console.log('PROPSPROPS ', props)
    return (
        <>
            <audio ref={audioRef} key={`localAudio`} autoPlay muted/>
        </>
    )
}

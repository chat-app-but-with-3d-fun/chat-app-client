import React from 'react'

function JitsiRemoteVideo(props) {
    const {videoRef} = props
    return (
        <>
          <video width='300' height='300px' key={`remoteVideo1`} ref={videoRef} autoPlay playsInline muted />
        </>
    )
}

export default JitsiRemoteVideo

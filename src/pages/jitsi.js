import React, {useRef, useState} from 'react'




export default function Jitsi() {

    const localAudio = useRef(null)
    const localVideo = useRef(null)
    
    const videoRef  = useRef(null)

    const confOptions = {
    };
    
    let connection = useRef(null)
    let isJoined = false;
    const room = useRef(null);
    
    let localTracks = [];
    const remoteTracks = {};
    
    
    
    const options = {
        hosts: {
            domain: 'meet.jit.si',
            muc: 'conference.meet.jit.si',
            focus: 'focus.meet.jit.si'
        },
        externalConnectUrl: 'https://meet.jit.si/http-pre-bind', 
        enableP2P: true, 
        p2p: { 
           enabled: true, 
           preferH264: true, 
           disableH264: true, 
           useStunTurn: true,
        }, 
        useStunTurn: true, 
        bosh: `https://meet.jit.si/http-bind?room=pucktesttest`, 
        websocket: 'wss://meet.jit.si/xmpp-websocket', 
        clientNode: 'http://jitsi.org/jitsimeet', 
    };
    
    function onConnectionFailed() {
        console.log('Connection Failed!');
    }
    function onConnectionSuccess() {
        console.log('CONNECTED')
        console.log(connection.current)

    }
    
    
    function onLocalTracks(tracks) {
        localTracks = tracks;
        console.log(localTracks)
        for (let i = 0; i < localTracks.length; i++) {
            localTracks[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level local: ${audioLevel}`));
            localTracks[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            localTracks[i].addEventListener(
                window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stoped'));
            localTracks[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId =>
                    console.log(
                        `track audio output device was changed to ${deviceId}`));
             if (localTracks[i].getType() === 'video') {
                    videoRef.current.srcObject = localTracks[i].stream
                    console.log('VIDEO' ,videoRef.current)
             } 
            //     localTracks[i].attach($(`#localVideo${i}`)[0]);
            // } else {
            //     $('body').append(
            //         `<audio autoplay='1' muted='true' id='localAudio${i}' />`);
            //     localTracks[i].attach($(`#localAudio${i}`)[0]);
            // }
            if (isJoined) {
                room.addTrack(localTracks[i]);
            }
        }
    }
    
    
     window.JitsiMeetJS.init({disableAudioLevels: true})
     connection.current = new window.JitsiMeetJS.JitsiConnection(null, null, options);
     
     window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR);
    
     connection.current.addEventListener(
        window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        onConnectionSuccess);
    connection.current.addEventListener(
        window.JitsiMeetJS.events.connection.CONNECTION_FAILED,
        onConnectionFailed);
    
        function disconnect() {
            console.log('disconnect!');
            connection.current.removeEventListener(
                window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
                onConnectionSuccess);
            connection.current.removeEventListener(
                window.JitsiMeetJS.events.connection.CONNECTION_FAILED,
                onConnectionFailed);
            connection.current.removeEventListener(
                window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
                disconnect);
        }
    




    return (
        <div style={{marginTop: "100px"}}>
            <button onClick={async() => {
                connection.current.connect()
                window.JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
                    .then(onLocalTracks)
                    .catch(error => {
                        throw error;
                    });
                }}>Connect</button>
            <button onClick={() => {disconnect()}}>Disconnect</button>
            <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={videoRef} autoPlay playsInline muted />

        </div>
    )
}

import React, {createRef, useRef, useState, useEffect} from 'react'




export default function Jitsi() {

    const connection       = useRef(null)
    const room             = useRef(null);
    const localTracks      = useRef(null)
    const remoteTracks     = useRef(null);
    

    const localVideoArr    = useRef(null)
    const localAudioArr    = useRef(null)
    const [localVideoTracks, setLocalVideoTracks]   = useState([])
    const [localAudioTracks, setLocalAudioTracks]   = useState([])

    const remoteVideoArr   = useRef(null)
    const remoteAudioArr   = useRef(null)
    const [countRemoteVideo, setCountRemoteVideo] = useState([])
    const [countRemoteAudio, setCountRemoteAudio] = useState([])

    const confOptions = {};
    
    let isJoined = useRef(null);
    
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
        room.current = connection.current.initJitsiConference('conference', confOptions);
        
        room.current.on(window.JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        room.current.on(window.JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            console.log(`track removed!!!${track}`);
        });
        room.current.on(window.JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.current.on(window.JitsiMeetJS.events.conference.USER_JOINED, id => {
            console.log('user join');
            remoteTracks.current[id] = [];
        });
        room.current.join();
        console.log('ROOM', room.current)
    }
    
    
    function onLocalTracks(tracks) {
        const tmpVideoArr     = []
        const tmpAudioArr     = []
        localVideoArr.current = new Array(0)
        localAudioArr.current = new Array(0)
        localTracks.current = tracks

        for (let i=0; i < localTracks.current.length; i++){
            
            //add EventListeners:
            localTracks.current[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level local: ${audioLevel}`));
            localTracks.current[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            localTracks.current[i].addEventListener(
                window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stoped'));
            localTracks.current[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId =>
                    console.log(
                        `track audio output device was changed to ${deviceId}`));
            
            //Creating DOM Elements
            if (localTracks.current[i].getType()  === 'video'){
                const newVideoTrack = createRef()
                //Add the Video to the List of VideoRefs
                localVideoArr.current.push(newVideoTrack)
                //create a new <video> element connected with this ref
                setLocalVideoTracks([...localVideoTracks, true])
                //add the stream to this video element
                localVideoArr.current.at(-1).current.srcObject = tracks[i].stream
            }
            else if (localTracks.current[i].getType()  === 'audio'){
                const newAudioTrack = createRef()
                localAudioArr.current.push(newAudioTrack)
                setLocalAudioTracks([...localAudioTracks, true])
                localAudioArr.current.at(-1).current.srcObject = tracks[i].stream
            }
            if (isJoined.current) {
                room.current.addTrack(localTracks.current[i]);
            }
        }
        //add eventlisteners on every element

        console.log('AUDIO: ',localAudioArr)
        console.log('VIDEO: ',localVideoArr)
    }
    
    function onRemoteTrack(track) {
        if (track.isLocal()) {
            return;
        }
        const participant = track.getParticipantId();
        if (!remoteTracks.current[participant]) {
            remoteTracks.current[participant] = [];
        }
        const idx = remoteTracks.curent[participant].push(track);
        
        if (track.getType() === 'video') {
            const newVideoTrack = createRef()
            remoteVideoArr.current.push(newVideoTrack)
            setCountRemoteVideo(...countRemoteVideo, true)
            remoteVideoArr.current.at(-1).current.srcObject = track.stream
            //Add Event Listeners
            remoteVideoArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
            remoteVideoArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('remote track muted'));
            remoteVideoArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('remote track stoped'));
            remoteVideoArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId => console.log(`track audio output device was changed to ${deviceId}`));
        }
        else if (track.getType() === 'audio'){
            const newAudioTrack = createRef()
            localAudioArr.current.push(newAudioTrack)
            setCountRemoteAudio(...countRemoteAudio, true)
            remoteAudioArr.current.at(-1).current.srcObject = track.stream
            //Add Event Listeners
            remoteAudioArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
            remoteAudioArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('remote track muted'));
            remoteAudioArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('remote track stoped'));
            remoteAudioArr.current.at(-1).current.addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId => console.log(`track audio output device was changed to ${deviceId}`));
        }
    }

    function onConferenceJoined() {
        console.log('conference joined!');
        isJoined.current = true;
        for (let i = 0; i < localTracks.current.length; i++) {
            room.current.addTrack(localTracks.current[i]);
        }
    }

    
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
    

useEffect(() => {
    remoteTracks.current= {}
    remoteVideoArr.current = new Array(0)
    remoteAudioArr.current = new Array(0)
    isJoined.current = false
    
    window.JitsiMeetJS.init({disableAudioLevels: true})
    connection.current = new window.JitsiMeetJS.JitsiConnection(null, null, options);
    
    window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR);
   
    connection.current.addEventListener(
       window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
       onConnectionSuccess);
   connection.current.addEventListener(
       window.JitsiMeetJS.events.connection.CONNECTION_FAILED,
       onConnectionFailed);

    if (window.JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
        window.JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        console.log(devices)
        });
    }
    


},[])


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
            
            {/* {localVideoTracks?.map((element, index) => {
                return <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={localVideoRef} autoPlay playsInline muted />
            })} */}
           {/* <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={localVideoRef} autoPlay playsInline muted /> */}

           {localVideoTracks?.map((element, index) => {
                return <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={localVideoArr.current[index]} autoPlay playsInline muted />
            })}
            {localAudioTracks?.map((element, index) => {
                return <audio ref={localAudioArr.current[index]} muted={true} />
            })}

            <h3>Remote Videos</h3>
            {countRemoteVideo?.map((element, index) => {
                return <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={remoteVideoArr.current[index]} autoPlay playsInline muted />
            })}
            {countRemoteAudio?.map((element, index) => {
                return <audio ref={remoteAudioArr.current[index]} muted={true} />
            })}
        </div>
    )
}

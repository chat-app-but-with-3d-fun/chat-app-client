import React, {createRef, useRef, useState, useEffect} from 'react'
import JitsiParticipant from '../Components/JitsiParticipant';




export default function Jitsi() {

    const connection       = useRef(null)
    const room             = useRef(null);
    const localTracks      = useRef(null)
    const remoteTracks     = useRef(null);
    const isVideo          = useRef(null)


    //Handling the Local tracks
    const localVideoArr    = useRef(null)
    const localAudioArr    = useRef(null)
    const [countLocalVideo, setCountLocalVideo] = useState([])
    const [countLocalAudio, setCountLocalAudio]  = useState([])

    //Handling remote Tracks
    const remoteVideoArr   = useRef(null)
    const remoteAudioArr   = useRef(null)
    const [countRemoteVideo, setCountRemoteVideo] = useState([])
    const [countRemoteAudio, setCountRemoteAudio] = useState([])

    let newTrack = null

    //Handling Participants
    const [remotePart, setRemotePart] = useState([])
    const [isMuted, setIsMuted]       = useState(true)

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
        room.current = connection.current.initJitsiConference('conference', confOptions);
        
        window.JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
                    .then(onLocalTracks)
                    .catch(error => {
                        throw error;
                    });
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
                    console.log(`track audio output device was changed to ${deviceId}`));
            
            //Creating DOM Elements
            if (localTracks.current[i].getType()  === 'video'){
                const newVideoTrack = createRef()
                //Add the Video to the List of VideoRefs
                localVideoArr.current.push(newVideoTrack)
                //create a new <video> element connected with this ref
                 setCountLocalVideo([...countLocalVideo, true])
                //add the stream to this video element
                localVideoArr.current.at(-1).current.srcObject = tracks[i].stream
            }
            else if (localTracks.current[i].getType()  === 'audio'){
                const newAudioTrack = createRef()
                localAudioArr.current.push(newAudioTrack)
                setCountLocalAudio([...countLocalAudio, true])
                localAudioArr.current.at(-1).current.srcObject = tracks[i].stream
            }
            // if (isJoined.current) {
            //     room.current.addTrack(localTracks.current[i]);
            // }
            room.current.addTrack(localTracks.current[i])
            console.log('TRACK added to rooom', room.current)
        }
      
        console.log('CONNECTED with user id: ', room.current.myUserId())
        room.current.on(window.JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        room.current.on(window.JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            console.log(`track removed!!!${track}`);
        });
        room.current.on(window.JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.current.on(window.JitsiMeetJS.events.conference.USER_JOINED, id => {
            console.log('other user joined', id);
            remoteTracks.current[id] = [];
        });
        room.current.on(window.JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        
        room.current.join();


        console.log('ROOM', room.current)
        console.log('AUDIO: ',localAudioArr)
        console.log('VIDEO: ',localVideoArr)
    }
    
    function onRemoteTrack(track) {
        
        if (track.isLocal()) {
            return;
        }
        console.log("NEW REMOTE TRACK: " , track)
        const participant = track.getParticipantId();
        if (!remoteTracks.current[participant]) {
            remoteTracks.current[participant] = [];
        }
        console.log('PARTICIPANT: ', participant)
        const idx = remoteTracks.current[participant].push(track);

        if (track.getType() === 'video') {
            const newVideoTrack = createRef()
            const tmpObject = {ref: newVideoTrack, media: track}
            setCountRemoteVideo([...countRemoteVideo, tmpObject])
            //Add Event Listeners
            // remoteVideoArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            //     audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
            // remoteVideoArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            //     () => console.log('remote track muted'));
            // remoteVideoArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            //     () => console.log('remote track stoped'));
            // remoteVideoArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            //     deviceId => console.log(`track audio output device was changed to ${deviceId}`));
        }
        else if (track.getType() === 'audio'){
            const newAudioTrack = createRef()
            const tmpObject = {ref: newAudioTrack, media: track}
            setCountRemoteAudio([...countRemoteAudio,tmpObject])
            //Add Event Listeners
            // remoteAudioArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            //     audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
            // remoteAudioArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            //     () => console.log('remote track muted'));
            // remoteAudioArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            //     () => console.log('remote track stoped'));
            // remoteAudioArr.current.at(-1).current.addEventListener(
            //     window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            //     deviceId => console.log(`track audio output device was changed to ${deviceId}`));
         }
    }

    function onConferenceJoined() {
        console.log('conference joined!');
        // isJoined.current = true;
        // for (let i = 0; i < localTracks.current.length; i++) {
        //     room.current.addTrack(localTracks.current[i]);
        // }
    }

   function onUserLeft(id){
       console.log({
           message: 'USER LEFT',
           id:  id,
           remoteTr: remoteTracks.current,
           remoteArr: remoteVideoArr.current,
           remoteAArr: remoteAudioArr.current,
           countRemVid: countRemoteVideo
           }    )

   }
    
    function disconnect() {
            console.log('disconnect!');
            for (let i = 0; i < localTracks.current.length; i++) {
                localTracks.current[i].dispose();
            }
            room.current.leave();
            
            
            connection.current.removeEventListener(
                window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
                onConnectionSuccess);
            connection.current.removeEventListener(
                window.JitsiMeetJS.events.connection.CONNECTION_FAILED,
                onConnectionFailed);
            connection.current.removeEventListener(
                window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
                disconnect);
            connection.current.disconnect();

        }
    

useEffect(() => {
    remoteTracks.current= {}
    remoteVideoArr.current = new Array(0)
    remoteAudioArr.current = new Array(0)
    isJoined.current = false
    console.log('Here is the start: ', remoteVideoArr.current)
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
    isVideo.current = false


},[])

useEffect(() => {
    console.log('useEffect Video runs')
    if (countRemoteVideo?.length > 0){
        console.log('HEY Video WHATS GOING ON?? ', countRemoteVideo.at(-1))
        countRemoteVideo.at(-1).ref.current.srcObject = countRemoteVideo.at(-1).media.stream
    }

}, [countRemoteVideo])

useEffect(() => {
    console.log('useEffect audio runs')
    if (countRemoteAudio?.length > 0){
        console.log('HEY AUDIO WHATS GOING ON?? ', countRemoteAudio.at(-1).media.stream)
        countRemoteAudio.at(-1).ref.current.srcObject = countRemoteAudio.at(-1).media.stream

    }

}, [countRemoteAudio])


const consoleRoom = () => {
    console.log('WHAT THE ROOM: ', room.current)
}

const handleMute = () => {
    if (isMuted){
        localAudioArr.current.at(-1).current.unmute()
    } else {
        localAudioArr.current.at(-1).current.mute()
    }
    console.log()
}

    return (
        <div style={{marginTop: "100px"}}>
            <button onClick={async() => {
                connection.current.connect()
                
                }}>Connect</button>
            <button onClick={() => {disconnect()}}>Disconnect</button>
            
            {countLocalVideo?.map((element, index) => {
                return <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} key={`localVideo${index}`} ref={localVideoArr.current[index]} autoPlay playsInline muted />
            })}
            {countLocalAudio?.map((element, index) => {
                return <audio ref={localAudioArr.current[index]} key={`localAudio${index}`} autoPlay muted/>
            })}

            <h3>Remote Videos</h3>
            {countRemoteVideo?.map((element, index) => {
                return <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} key={`remoteVideo${index}`} ref={element.ref} autoPlay playsInline muted />
            })}

            {countRemoteAudio?.map((element, index) => {
                return <audio ref={element.ref} key={`remoteAudio${index}`} autoPlay/>
            })}
            {/* {remotePart.length >0 && remotePart?.map((element) => {
                return <JitsiParticipant payload={element}/>
            })} */}
            <button onClick={consoleRoom}>Print room</button>
            
            <button onClick={handleMute}>{isMuted  ?  'Speak' : "Pssstt"}</button>
        </div>
    )
}

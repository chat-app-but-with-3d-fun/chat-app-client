import React, {createRef, useRef, useState, useEffect} from 'react'
import JitsiParticipant from '../Components/JitsiParticipant';




export default function Jitsi() {

    const connection       = useRef(null)
    const room             = useRef(null);
    const localTracks      = useRef(null)
    const remoteTracks     = useRef(null);
    const isVideo          = useRef(null)


    //Handling the Local tracks
    const [countLocalVideo, setCountLocalVideo] = useState(null)
    const [countLocalAudio, setCountLocalAudio]  = useState(null)

    //Handling remote Tracks
    const remoteVideoArr   = useRef(null)
    const remoteAudioArr   = useRef(null)
    const [countRemoteVideo, setCountRemoteVideo] = useState([])
    const [countRemoteAudio, setCountRemoteAudio] = useState([])


    //Handling Talk
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
            
            
            //Preparing the Ref
            const newTrack = createRef()
            const tmpObject = {ref: newTrack, media: localTracks.current[i] }
            

            //Creating DOM Elements
            if (localTracks.current[i].getType()  === 'video'){
                 setCountLocalVideo(tmpObject)
            }
            else if (localTracks.current[i].getType()  === 'audio'){
                tmpObject.media.mute()
                setCountLocalAudio(tmpObject)
            }
            room.current.addTrack(localTracks.current[i])   
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
        
        //Add Event Listener
        track.addEventListener(
            window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
        track.addEventListener(
            window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('remote track muted'));
        track.addEventListener(
            window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('remote track stoped'));
        track.addEventListener(
            window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            deviceId => console.log(`track audio output device was changed to ${deviceId}`));
        
        const newTrack = createRef()
        const tmpObject = {ref: newTrack, media: track, participant}

        if (track.getType() === 'video') {
            setCountRemoteVideo([...countRemoteVideo, tmpObject])
        }
        else if (track.getType() === 'audio'){
            setCountRemoteAudio([...countRemoteAudio,tmpObject])
         }
    }


    function onConferenceJoined() {
        console.log('conference joined!');
    }

   function onUserLeft(id){
       console.log({
           message: 'USER LEFT',
           id:  id,
           countRemVid: countRemoteVideo
           }    )

   }
    
    async function disconnect() {
            console.log('disconnect!', countLocalAudio.media, countLocalVideo.media);
            try {
                const resultAudio = await countLocalAudio.media.dispose()
                const resultVideo = await countLocalVideo.media.dispose()
                console.log('WHAT IS HERE??', resultAudio, resultVideo)
                if (resultAudio && resultVideo){
                    const resultExit = await room.current.leave();
                    console.log('ROOM LEFT: ', resultExit)
                    if (resultExit) {
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
                }
            }
            catch(error){
                console.error('SOMETHING WRONG: ',error)
            }
            


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

//After rendering the dom Elements attach the media streams
useEffect(() => {
    if(countLocalVideo){
        console.log('HEY Local Video WHATS GOING ON?? ', countLocalVideo)
        countLocalVideo.ref.current.srcObject = countLocalVideo.media.stream  
    }    
}, [countLocalVideo])


useEffect(() => {
    if(countLocalAudio){
        console.log('HEY Local Audio WHATS GOING ON?? ', countLocalAudio)
        countLocalAudio.ref.current.srcObject = countLocalAudio.media.stream 
    }
}, [countLocalAudio])


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


//Helper Functions
const consoleRoom = () => {
    console.log('WHAT THE ROOM: ', room.current)
}

//Controll the streams
const handleMute = () => {
    if (isMuted){
        countLocalAudio.media.unmute()
    } else {
        countLocalAudio.media.mute()
    }
    console.log('Change Mute - unmute ', countLocalAudio.media)
    setIsMuted(() => !isMuted)
}

    return (
        <div style={{marginTop: "100px"}}>
            <button onClick={async() => {
                connection.current.connect()
                
                }}>Connect</button>
            <button onClick={() => {disconnect()}}>Disconnect</button>
            
            {countLocalVideo && <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} key={`localVideo`} ref={countLocalVideo.ref} autoPlay playsInline muted />
            }
            
            {countLocalAudio && <audio ref={countLocalAudio.ref} key={`localAudio`} autoPlay muted/>
            }

            <h3>Remote Videos</h3>
            {countRemoteVideo?.map((element, index) => {
                return <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} key={`remoteVideo${index}`} ref={element.ref} autoPlay playsInline muted />
            })}

            {countRemoteAudio?.map((element, index) => {
                return <audio ref={element.ref} key={`remoteAudio${index}`} autoPlay/>
            })}

            <button onClick={consoleRoom}>Print room</button>
            
            <button onClick={handleMute}>{isMuted  ?  'Speak' : "Pssstt"}</button>
        </div>
    )
}

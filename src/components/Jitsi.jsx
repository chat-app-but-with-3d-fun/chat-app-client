import React, {createRef, useRef, useState, useEffect} from 'react'
import Fab from '@mui/material/Fab';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import JitsiLocalAudio from './JitsiAudio';
import { Box } from '@mui/system';

export default function Jitsi(props) {

    const {id} = props

    const connection       = useRef(null)
    const room             = useRef(null);
    const isVideo          = useRef(null)

    //Handling the Local tracks
    const [countLocalVideo, setCountLocalVideo] = useState(null)
    const [countLocalAudio, setCountLocalAudio]  = useState(null)

    //Handling remote Tracks
    const [countRemoteVideo, setCountRemoteVideo] = useState([])
    const [countRemoteAudio, setCountRemoteAudio] = useState([])
    const [deleteTrack, setDeleteTrack]           = useState(null)

    //Handling Talk
    const [isMuted, setIsMuted]       = useState(true)
    const [screenShare, setScreenShare] = useState(false)

    const confOptions = {};
    let isJoined = useRef(null);
    
    //Configuration for media server
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
        bosh: `https://meet.jit.si/http-bind?room=puckSlackSwag${id}`, 
        websocket: 'wss://meet.jit.si/xmpp-websocket', 
        clientNode: 'http://jitsi.org/jitsimeet', 
    };
   
//Functions related to events
    function onConnectionFailed() {
        console.log('Connection Failed!');
    }
   
    //When connection works create local Tracks
    function onConnectionSuccess() {
        room.current = connection.current.initJitsiConference('conference', confOptions);
        window.JitsiMeetJS.createLocalTracks({ devices: [ 'audio',] })
                    .then(onLocalTracks)
                    .catch(error => {
                        throw error;
                    });
    }
    
    //When Track removed delete from Local or Remote - if no local left quit session)
    function leaveConference(track) {
     console.log('TRACK Removed Listener triggered, with ', track)
     if (track.ownerEndpointId){
            const tmpObject = {type: track.type, id: track.track.id}
            setDeleteTrack(() => tmpObject)
            
        } else {
        const checkLocalAlive = room.current.getLocalTracks()
        console.log('local ALIVE? ', checkLocalAlive)
        if (checkLocalAlive.length === 0){
             console.log('all the tracks disposed')
             setCountLocalVideo(null)
             setCountLocalAudio(null)
             setCountRemoteVideo(null)
             setCountRemoteAudio(null)
             room.current.leave();
        }
       }
     }

     //When room closed delete Listeners
    function cleanUp(){
        console.log('ROOM closed, conference will be disconnected')
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
    
    //Start Disonnect process, dispose the local tracks
    async function disconnect() {
        console.log('start to disconnect!');
        countLocalAudio?.media.dispose()
        countLocalVideo?.media.dispose()
}

    //Triggered when new local tracks created, add listeners for each track,
    //runs once at the startup, before(!) joining the room
    function onLocalTracks(tracks) {
        for (let i=0; i < tracks.length; i++){
            //add EventListeners:
            tracks[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level local: ${audioLevel}`));
            tracks[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            tracks[i].addEventListener(
                window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track should be removed'))
            tracks[i].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId => console.log(`track audio output device changed to ${deviceId}`));
        //initiate the rendering of the video and audio element       
            //Preparing the Ref
            const newTrack = createRef()
            const tmpObject = {ref: newTrack, media: tracks[i] }
            
            //Creating DOM Elements
            if (tracks[i].getType()  === 'video'){
                 setCountLocalVideo(tmpObject)
            }
            else if (tracks[i].getType()  === 'audio'){
                tmpObject.media.mute()
                setCountLocalAudio(tmpObject)
            }
            room.current.addTrack(tracks[i])   
        }
        //add listeners to the room object
        room.current.on(window.JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        room.current.on(window.JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            leaveConference(track)});
        room.current.on(window.JitsiMeetJS.events.conference.CONFERENCE_JOINED, 
            () => console.log('CONNECTED with user id: ', room.current.myUserId()));
        room.current.on(window.JitsiMeetJS.events.conference.CONFERENCE_LEFT,  cleanUp)
        room.current.on(window.JitsiMeetJS.events.conference.USER_JOINED, id => {
            console.log('other user joined', id);});
        room.current.on(window.JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        //Join the conference
        room.current.join();
    }
    
    //Fired by each new remote track
    function onRemoteTrack(track) {
        if (track.isLocal()) {
            return;}
        console.log("NEW REMOTE TRACK: " , track)
        const participant = track.getParticipantId();
        console.log('PARTICIPANT: ', participant)
        
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
        
        //Prepare the dom elements
        const newTrack = createRef()
        const tmpObject = {ref: newTrack, media: track, participant}
        console.log('New tmpObj created', tmpObject)
       
        if (track.getType() === 'video') {
            console.log('Video State before changed: ', countRemoteVideo)
            setCountRemoteVideo((countRemoteVideo) => [...countRemoteVideo, tmpObject])
        }
        else if (track.getType() === 'audio'){
            console.log('Audio State before changed: ', countRemoteAudio)
            setCountRemoteAudio((countRemoteAudio) => [...countRemoteAudio,tmpObject])
         }
    }

   function onUserLeft(id){
       console.log({
           message: 'USER LEFT',
           id:  id,
           countRemVid: countRemoteVideo
           }    )
   }

//set basic listeners at start
useEffect(() => {
    isJoined.current = false
    window.JitsiMeetJS.init({disableAudioLevels: true})
    window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR);

    connection.current = new window.JitsiMeetJS.JitsiConnection(null, null, options);
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
    
    //ADDED automatic loading
    connection.current.connect()
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
        countRemoteVideo.forEach((element) => {
            if (!element.ref.current.srcObject) {
                console.log('useEffect video found element without srcObject: ',element.ref.current)
                element.ref.current.srcObject = element.media.stream 
            } 
        })
        console.log('HEY Video WHATS GOING ON?? ', countRemoteVideo)
    }
}, [countRemoteVideo])

useEffect(() => {
    console.log('useEffect audio runs')
    if (countRemoteAudio?.length > 0){
        countRemoteAudio.forEach((element) => {
            console.log('useEffect audio found element without srcObject: ',element.ref.current)
            element.ref.current.srcObject = element.media.stream
        })
        console.log('HEY AUDIO WHATS GOING ON?? ', countRemoteAudio)
    }
}, [countRemoteAudio])

//Update the remote tracks when a track is deleted
useEffect(() => {
    if (deleteTrack) {
        console.log('A track should be deleted with the following id: ', deleteTrack)
        if (deleteTrack.type === 'audio'){
            console.log('Audio track should be deleted')
            console.log('WE have Audio: ',countRemoteAudio)
            const newRemoteAudioArr = countRemoteAudio?.filter(element => {
                return element.media.track.id != deleteTrack.id
            })
            console.log('the filter of audio resulted in a new Stream with: ', newRemoteAudioArr)
            setCountRemoteAudio(() => newRemoteAudioArr)
        } else {
            console.log('Video track should be deleted')
            console.log('WE have Video: ',countRemoteVideo)
            const newRemoteVideoArr = countRemoteVideo?.filter(element => {
                return element.media.track.id != deleteTrack.id
            })
            console.log('the filter of video resulted in a new Stream with: ', newRemoteVideoArr)
            setCountRemoteVideo(() => newRemoteVideoArr)
        }
    }
}, [deleteTrack])

//Helper Functions
const consoleRoom = () => {
    console.log('WHAT THE ROOM: ', room.current)
    console.log('Remote AUDIO: ', countRemoteAudio)
    console.log('Remote VIDEO: ', countRemoteVideo)
}

//Controll the streams
const handleMute = () => {
    if (isMuted){
        console.log('Should unmute')
        countLocalAudio.media.unmute()
    } else {
        console.log('Should mute')
        countLocalAudio.media.mute()
    }
    console.log('Change Mute - unmute ', countLocalAudio.media)
    setIsMuted(() => !isMuted)
}

const handleShareScreen = () => {
    console.log('Should get disposed', countLocalVideo)
    countLocalVideo?.media.dispose()
    console.log('AND NOW: ', countLocalVideo)
    window.JitsiMeetJS.createLocalTracks({ devices: [screenShare ? 'video' : 'desktop' ] })
    // window.JitsiMeetJS.createLocalTracks({ devices: [ 'desktop' ] })
        .then(tracks => {
            tracks[0].addEventListener(
                window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            tracks[0].addEventListener(
                window.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stoped'));
            setCountLocalVideo(
                {...countLocalVideo,
                 media: tracks[0]})
            room.current.addTrack(tracks[0]);
            setScreenShare(() => !screenShare)
        })
        .catch(error => {
                if (error.name === window.JitsiMeetJS.errors.track.SCREENSHARING_USER_CANCELED) {
                    console.log('Something wrong with screensharing')
                    setScreenShare(() => !screenShare)
                }
        });
}


    return (
        <>
            {
            countLocalVideo &&
                 <video style={{height: '300px', width: '300px', display: 'none'}} key={`localVideo`} ref={countLocalVideo.ref} autoPlay playsInline muted />
            }
            {
                countRemoteVideo?.map( (element,index) => {
                    return <video style={{height: '300px', width: '300px', display: 'none'}} ref={element.ref} autoplay playsInline muted />
                })
            }    
                        
            {
                countLocalAudio && 
                    <JitsiLocalAudio audioRef={countLocalAudio.ref}/>
            }
            
            {
                countRemoteAudio?.map((element, index) => {
                    return <audio ref={element.ref} key={`remoteAudio${index}`} autoPlay/>
                })
            }
            <Fab onClick={handleMute}
                 variant="extended"
                 color="secondary"
                 sx={{position: 'absolute', bottom: '20px'}}>
                {isMuted  ?  <><MicOffIcon />Speak</> : <><MicIcon />Pssstt</>}
            </Fab>
        </>
    )
}

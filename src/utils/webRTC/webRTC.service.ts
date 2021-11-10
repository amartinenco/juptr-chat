import { setLocalStream } from '../../redux/call/call.actions';
import store from '../../redux/store';

const configuration = {
  iceServers: [
    {
      urls:"stun:stun.l.google.com:19302"
    },
    {
      urls:"stun:stun1.l.google.com:19302"
    },
    {
      urls:"stun:stun2.l.google.com:19302"
    },
    {
      urls:"stun:stun3.l.google.com:19302"
    },
    {
      urls:"stun:stun4.l.google.com:19302"
    }
  ]
}

const constraints = {
  video: true,
  audio: true
}

let peerConnection : RTCPeerConnection;

export const getLocalStream = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    store.dispatch(setLocalStream(stream));
    createPeerConnection();
  }).catch(error => {
    console.error('Local stream failed');
  });
}

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);
  const localStream = store.getState().call.localStream;

  if (localStream) {
    for (const track of localStream?.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }
  }
}

/*
  // peerConnection.ontrack = (event : RTCTrackEvent) => {
  //   console.log(event.streams);
  // }

let obj = { 
	myArr: [10, 20, 30, 40, 50]
}
const myFunc = ({ myArr : [something, something2] }) => {
	console.log(something, something2); 
}
myFunc(obj);
// 10, 20
*/
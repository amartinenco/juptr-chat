import { setLocalStream, setRemoteStream } from '../../redux/call/call.actions';
import store from '../../redux/store';
import { sendICECandidates, sendWebRTCAnswer, sendWebRTCOffer } from '../webSocketConnection/webSocketConnection.service';
import { IWebRTCAnswer, IWebRTCIceCandidate, IWebRTCOffer } from './webRTC.types';

/* References: 
  https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling
  https://docs.microsoft.com/en-us/previous-versions/mt806219(v=vs.85)
  https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
  https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addIceCandidate
*/

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

let callerConnection : RTCPeerConnection;
let receiverConnection : RTCPeerConnection;

export const setUpLocalStream = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    store.dispatch(setLocalStream(stream));
  }).catch(error => {
    console.error('Local stream failed', error);
  });
}

// Caller side

export const call = (callTo: string) => {
  const callFrom = store.getState().user.user?.displayName;
  if (callFrom) {
    // 1. Create an RTCPeerConnection
    // 2. Call getUserMedia() to access the webcam and microphone
    // 3. Promise fulfilled: add the local stream's tracks by calling RTCPeerConnection.addTrack();
    // 4. Ready to negotiate so ask the caller to start doing so "Event: negotiationneeded"
    invite();
    // 5. Create SDP offer by calling RTCPeerConnection.createOffer();
    // 6. Promise fulfilled: set the description RTCPeerConnection.setLocalDescription()
    // 7. Send the message offer through the signaling server
    handleNegotiationNeededEvent(callFrom, callTo);
  }
}

const invite = () => {
  callerConnection = new RTCPeerConnection(configuration);
  const localStream = store.getState().call.localStream;

  if (localStream) {
    for (const track of localStream.getTracks()) {
      callerConnection.addTrack(track, localStream);
    }
  }
  callerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
  } 
}

const handleNegotiationNeededEvent = (callFrom: string, callTo: string) => {

  callerConnection.onnegotiationneeded = () => {
    callerConnection.createOffer().then(function(offer) {
      return callerConnection.setLocalDescription(offer);
    }).then(() => {
      if (callerConnection.localDescription) {
        sendWebRTCOffer({
          name: callFrom,
          target: callTo,
          type: "video-offer",
          sdp: callerConnection.localDescription
        });
      }
    }).catch((error) => {
      console.error('Failed to send offer to the remote peer through signaling server');
    });
  }

  callerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      sendICECandidates({
        name: callFrom,
        target: callTo,
        type: 'to_receiver',
        candidate: event.candidate
      });
    }
  }
}

// Callee side

// 1. Create an RTCPeerConnection
// 2. Create an RTCSessionDescription using the received SDP offer
// 3. Call RTCPeerConnection.setRemoteDescription() to tell webRTC about caller's configuraiton
// 4. Call getUserMedia() to access the webcam and microphone
// 5. Promise fulfileld: add the local stream's tracks by calling RTCPeerConnection.addTrack()
// 6. RTCPeerConnection.createAnswer() to create an SDP answer to send to caller

export const handleReceivedWebRTCOffer = async (data : IWebRTCOffer) => {
  const answerFrom = store.getState().user.user?.displayName;
  if (data && data.sdp && answerFrom) {
    receiverConnection = new RTCPeerConnection(configuration);

    const localStream = store.getState().call.localStream;
    if (localStream) {
      for (const track of localStream.getTracks()) {
        receiverConnection.addTrack(track, localStream);
      }
    }

    receiverConnection.ontrack = ({ streams: [stream] }) => {
      store.dispatch(setRemoteStream(stream));
    } 

    await receiverConnection.setRemoteDescription(data.sdp);

    const answer = await receiverConnection.createAnswer();
    await receiverConnection.setLocalDescription(answer);
    sendWebRTCAnswer({
      name: answerFrom,
      target: data.target,
      answer: answer
    });
  
    receiverConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        sendICECandidates({
          name: answerFrom,
          target: data.target,
          type: 'to_caller',
          candidate: event.candidate
        });
      }
    }
  }
}

export const handleReceivedAnswer = async (data: IWebRTCAnswer) => {
  try {
    await callerConnection.setRemoteDescription(data.answer);
  } catch (error) {
    console.error('Failed to set remote description', error);
  }
}

export const handleReceivedICECandidate = async (data: IWebRTCIceCandidate) => {
  try {
    if (data.type) {
      if (data.type === 'to_receiver') {
        await receiverConnection.addIceCandidate(data.candidate);
      } else if (data.type === 'to_caller'){
        await callerConnection.addIceCandidate(data.candidate);
      }
    }
  } catch (error) {
    console.error('Failed to add ICE candidate', error);
  }
}

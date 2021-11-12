import { setLocalStream } from '../../redux/call/call.actions';
import store from '../../redux/store';
import { sendICECandidates, sendWebRTCOffer } from '../webSocketConnection/webSocketConnection.service';

/* References: 
  https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling
  https://docs.microsoft.com/en-us/previous-versions/mt806219(v=vs.85)
  https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
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

let peerConnection : RTCPeerConnection;

export const setUpLocalStream = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    store.dispatch(setLocalStream(stream));
  }).catch(error => {
    console.error('Local stream failed');
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

const handleNegotiationNeededEvent = (callFrom: string, callTo: string) => {
  peerConnection.onnegotiationneeded = () => {
    peerConnection.createOffer().then(function(offer) {
      return peerConnection.setLocalDescription(offer);
    }).then(() => {
      if (peerConnection.localDescription) {
        sendWebRTCOffer({
          name: callFrom,
          target: callTo,
          type: "video-offer",
          sdp: peerConnection.localDescription
        });
      }
    }).catch((error) => {
      console.error('Failed to send offer to the remote peer through signaling server');
    });
  }

  peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      sendICECandidates({
        name: callFrom,
        target: callTo,
        candidate: event.candidate
      });
    }
  }
}

const invite = () => {
  peerConnection = new RTCPeerConnection(configuration);
  const localStream = store.getState().call.localStream;

  if (localStream) {
    for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }
  }
}

// Callee side

// 1. Create an RTCPeerConnection
// 2. Create an RTCSessionDescription using the received SDP offer
// 3. Call RTCPeerConnection.setRemoteDescription() to tell webRTC about caller's configuraiton
// 4. Call getUserMedia() to access the webcam and microphone
// 5. Promise fulfileld: att the local stream's tracks by calling RTCPeerConnection.addTrack()
// 
const handleReceivedWebRTCOffer = () => {
  peerConnection = new RTCPeerConnection(configuration);
}



// export const createConnection = () => {
//   peerConnection = new RTCPeerConnection(configuration);
//   if (peerConnection) {
//     getLocalStream();
//   }
//   const localStream = store.getState().call.localStream;
//   console.log(localStream);

// }

// export const getLocalStream = () => {
//   navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//     store.dispatch(setLocalStream(stream));
//   }).catch(error => {
//     console.error('Local stream failed');
//   });


// }

// export const createConnection = (callTo: string) => {
//   calleeUserId = callTo;

//   console.log('Calling to', calleeUserId);
//   peerConnection = new RTCPeerConnection(configuration);
  
//   peerConnection.onnegotiationneeded = () => {
//     console.log('-------------------');
//   }
  
  // getUserMedia();
  /*
    RTCPeerConnection.setLocalDescription() and other methods which take SDP as input 
    now directly accept an object conforming to the RTCSessionDescriptionInit dictionary, 
    so you don't have to instantiate an RTCSessionDescription yourself.
  */
  // peerConnection.onnegotiationneeded = () => {
  //   peerConnection.createOffer().then((offer) : Promise<RTCSessionDescriptionInit | void> => {
  //     console.log('Offer:', offer);
  //     return peerConnection.setLocalDescription(offer);
  //   }).then((offer) => {
  //     // Send the offer to the remote peer through the signaling server
  //     console.log('Sending offer');
  //     // if ((offer as RTCSessionDescriptionInit).type) {
  //     //   sendWebRTCOffer({
  //     //     displayName: calleeUserId,
  //     //     offer: offer as RTCSessionDescriptionInit
  //     //   });
  //     // } 
  //   }).catch(() => {
  //     console.error('Failed to send offer to the remote peer through signaling server');
  //   });
  // }
// }


// const getUserMedia = () => {
//   navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//     store.dispatch(setLocalStream(stream));
//   }).catch(error => {
//     console.error('Local stream failed');
//   });
// }

// export const handleOffer = async (data : IWebRTCOffer) => {
//   await peerConnection.setRemoteDescription(data.offer);
//   const answer = await peerConnection.createAnswer();
//   await peerConnection.setLocalDescription(answer);
//   sendWebRTCAnswer({
//     displayName: data.displayName,
//     answer: answer
//   });
// }

// export const handleAnswer = async (data: IWebRTCAnswer) => {
//   await peerConnection.setRemoteDescription(data.answer);
// }


// const setConnection = () => {
//   peerConnection = new RTCPeerConnection(configuration);
// }



// export const getLocalStream = () => {
//   navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//     store.dispatch(setLocalStream(stream));
//     createPeerConnection();
//   }).catch(error => {
//     console.error('Local stream failed');
//   });
// }

// const createPeerConnection = () => {
//   peerConnection = new RTCPeerConnection(configuration);
//   const localStream = store.getState().call.localStream;

//   if (localStream) {
//     for (const track of localStream?.getTracks()) {
//       peerConnection.addTrack(track, localStream);
//     }
//   }
// }


/*

  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.ontrack = handleTrackEvent;
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;

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
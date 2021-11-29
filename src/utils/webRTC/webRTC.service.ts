import { resetCallState, setNewTextMessage, setLocalStream, setRemoteStream, setScreenSharingEnabled, setScreenSharingStream } from '../../redux/call/call.actions';
import store from '../../redux/store';
import { sendICECandidates, sendWebRTCAnswer, sendWebRTCOffer, terminateConversation } from '../webSocketConnection/webSocketConnection.service';
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
    // Using more than 2 stun servers slows down discovery
    // {
    //   urls:"stun:stun1.l.google.com:19302"
    // },
    // {
    //   urls:"stun:stun2.l.google.com:19302"
    // },
    // {
    //   urls:"stun:stun3.l.google.com:19302"
    // },
    // {
    //   urls:"stun:stun4.l.google.com:19302"
    // }
  ]
}

const constraints = {
  video: true,
  audio: true
}

let callerConnection : RTCPeerConnection;
// let callerDataChannel : RTCDataChannel;

let receiverConnection : RTCPeerConnection;
let dataChannel : RTCDataChannel;

// const retryButWithAudioOnly = () => {
//   navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//     store.dispatch(setLocalStream(stream));
//   }).catch(error => {
//     console.error('Local stream audio failed', error);
//   });
// }

export const setUpLocalStream = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    store.dispatch(setLocalStream(stream));
  }).catch(error => {
    console.error('Local stream with video/audio failed', error);
    // retryButWithAudioOnly();
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
  dataChannel = callerConnection.createDataChannel("messenger");

  const localStream = store.getState().call.localStream;

  if (localStream) {
    for (const track of localStream.getTracks()) {
      callerConnection.addTrack(track, localStream);
    }
  }
  callerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
  }

  // messenger
  callerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;

    dataChannel.onopen = () => {
      console.log('Data channel established connection');
    }

    dataChannel.onmessage = (event) => {
      const message = String(event.data);
      store.dispatch(setNewTextMessage({
        message: message,
        from: 'other',
        date: new Date()
      }));
    }
  }
}

const handleNegotiationNeededEvent = (callFrom: string, callTo: string) => {

  callerConnection.onnegotiationneeded = () => {
    console.log('onnegotiationneeded');
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
    dataChannel = receiverConnection.createDataChannel("messenger");

    const localStream = store.getState().call.localStream;
    if (localStream) {
      for (const track of localStream.getTracks()) {
        receiverConnection.addTrack(track, localStream);
      }
    }

    receiverConnection.ontrack = ({ streams: [stream] }) => {
      console.log('Streams', stream.getTracks());
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

    // messenger 
    receiverConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
  
      dataChannel.onopen = () => {
        console.log('Data channel established connection');
      }
  
      dataChannel.onmessage = (event) => {
        const message = String(event.data);
        store.dispatch(setNewTextMessage({
          message: message,
          from: 'other',
          date: new Date()
        }));
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

export const switchToScreenSharing = (enable: boolean) => {
  const localStream = store.getState().call.localStream;

  if (enable) {
    let activeConnection = getActiveConnection();
    if (activeConnection) {
      console.log('ENABLE');
      const mediaDevices = navigator.mediaDevices as any;
      mediaDevices.getDisplayMedia({
        video: true
      }).then((stream : MediaStream) => {
        if (activeConnection) {
          // determine the video track sender
          // if (localStream?.getVideoTracks().length === 0) {
          //   for (const track of stream.getTracks()) {
          //     activeConnection.addTrack(track, stream);
          //   }
          //   // for (const track of localStream.getTracks()) {
          //   //   activeConnection.addTrack(track, stream);
          //   // }
          // }

          const senders = activeConnection.getSenders();      
          console.log('SENDERS', senders);
          console.log('Video track', stream.getVideoTracks());

          const sender = senders.find(sender => sender.track!.kind === stream.getVideoTracks()[0].kind);
       
          console.log('SENDER', sender);
          if (sender) {
            sender.replaceTrack(stream.getVideoTracks()[0]);
          }
      
          store.dispatch(setScreenSharingEnabled(true));

          stream.getVideoTracks()[0].onended = function () {
            shareScreenTeardown(activeConnection);
          };
          store.dispatch(setScreenSharingStream(stream));
        }
      })
      .catch((error: any) => {
        console.error('Screen share failed', error);
      });
    }
  } else {
    let activeConnection = getActiveConnection();
    if (activeConnection) {
      shareScreenTeardown(activeConnection);
      // setUpLocalStream();
    }
  }
}

const getActiveConnection = () => {
  let activeConnection: RTCPeerConnection | undefined;

  if (callerConnection) {
    activeConnection = callerConnection;
  } else if (receiverConnection) {
    activeConnection = receiverConnection;
  } else {
    const user = store.getState().user.user;
    const name = store.getState().call.name;
    if (user && name) {
      terminateConversation(user, name);
    }
  }

  return activeConnection;
}

export const sendTextMessage = (messageToSend: string) => {
  if (dataChannel && dataChannel.readyState === 'open' && messageToSend) {
    const message = String(messageToSend);
    dataChannel.send(message);
    store.dispatch(setNewTextMessage({
      message: message,
      from: 'me',
      date: new Date()
    }));
  }
}

const shareScreenTeardown = (activeConnection: RTCPeerConnection | undefined) => {
  let localStream = store.getState().call.localStream;
  let screenSharingStream = store.getState().call.screenSharingStream;
  if (activeConnection && localStream) {
    const senders = activeConnection.getSenders();
    // const sender = senders.find(sender => sender.track!.kind === localStream!.getVideoTracks()[0].kind);
    const sender = senders.find(sender => {
      if (sender.track) { return sender.track!.kind === "video"}
    });
    if (sender) {
      sender.track?.stop();
      if (localStream.getVideoTracks().length > 0) {
        sender.replaceTrack(localStream.getVideoTracks()[0]);
      }
      
    }
    store.dispatch(setScreenSharingEnabled(false));
  }
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach(track => track.stop());
  }
}

export const connectionTeardown = () => {
  store.dispatch(resetCallState());
  let activeConnection = getActiveConnection();
  shareScreenTeardown(activeConnection);
  if (callerConnection) {
    callerConnection.close();
  } 
  if (receiverConnection) {
    receiverConnection.close();
  }
  if (dataChannel) {
    dataChannel.close();
  }
}
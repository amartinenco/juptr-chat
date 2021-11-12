export interface IWebRTCOffer {
  name: string,
  target: string,
  type: string,
  sdp: RTCSessionDescription | null
};

export interface IWebRTCIceCandidate {
  name: string,
  target: string,
  candidate: RTCIceCandidate | null
}


// export interface IWebRTCOffer {
//   displayName: string,
//   offer: RTCSessionDescriptionInit
// }

// export interface IWebRTCAnswer {
//   displayName: string,
//   answer: RTCSessionDescriptionInit
// }

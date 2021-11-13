export interface IWebRTCOffer {
  name: string,
  target: string,
  type: string,
  sdp: RTCSessionDescription | null
};

export interface IWebRTCIceCandidate {
  name: string,
  target: string,
  type: string;
  candidate: RTCIceCandidateInit
}

export interface IWebRTCAnswer {
  name: string,
  target: string,
  answer: RTCSessionDescriptionInit
}
const events = {
  playerReady: "playerReady",
  playPause: "playPause",
  play: "play",
  pause: "pause",
  end: "end",
  forward: "forward",
  backward: "backward",
  toggleFullScreen: "toggleFullScreen",
  fullscreen: "fullscreen",
  exitFullscreen: "exitFullscreen",
  toggleMute: "toggleMute",
  mute: "mute",
  unmute: "unmute",
};

export default events

export const keyTriggerEvent = {
  ' ': events.playPause,
  'ArrowLeft': events.backward,
  'ArrowRight': events.forward,
  'm': events.toggleMute,
  'f': events.toggleFullScreen,
}
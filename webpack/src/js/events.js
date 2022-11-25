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
  live: "live",
  playable: "playable",
  loading: "loading",
  loaded: "loaded",
  beforePlay: "beforePlay",
  initiated: "initiated",
  volumechange: "volumechange",
  pictureInPicture: "pictureInPicture",
  exitPictureInPicture: "exitPictureInPicture",
  resizePictureInPicture: "resizePictureInPicture",
  toggleSubtitle: "toggleSubtitle",
  showSubtitle: "showSubtitle",
  hideSubtitle: "hideSubtitle",
  playerActive: "playerActive",
  playerUnActive: "playerUnActive",
  dynamicDashJs: "dynamicDashJs",
  dynamicHlsJs: "dynamicHlsJs",
};

export const keyTriggerEvent = {
  ' ': events.playPause,
  'ArrowLeft': events.backward,
  'ArrowRight': events.forward,
  'm': events.toggleMute,
  'f': events.toggleFullScreen,
  't': events.toggleSubtitle
}

export default events
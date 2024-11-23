enum SonicVibeEvents {
  forward = "forward",
  backward = "backward",
  amplify = "amplify",
  deminish = "deminish",
  play = "play",
  pause = "pause",
  ready = "ready",
  fullscreen = "fullscreen",
  progress = "progress",
  error = "error",
  mute = "mute",
  unmute = "unmute",
  click = "click",
  wheel = "wheel",
  keydown = "keydown",
}

export enum SonicVibeEventsOps {
  forward = SonicVibeEvents.forward,
  backward = SonicVibeEvents.backward,
  click = SonicVibeEvents.click,
  play = SonicVibeEvents.play,
  pause = SonicVibeEvents.pause,
}

export default SonicVibeEvents;

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
  mouseenter = "mouseenter",
  mouseleave = "mouseleave",
  mousemove = "mousemove",
  mouseup = "mouseup",
  mousedown = "mousedown",
}

export enum SonicVibeEventsOps {
  mouseenter = SonicVibeEvents.mouseenter,
  mouseleave = SonicVibeEvents.mouseleave,
  mousemove = SonicVibeEvents.mousemove,
  mouseup = SonicVibeEvents.mouseup,
  mousedown = SonicVibeEvents.mousedown,
  click = SonicVibeEvents.click,
  play = SonicVibeEvents.play,
  pause = SonicVibeEvents.pause,
  keydown = SonicVibeEvents.keydown,
}

export const SonicVibeEventsOpsWithEvent = {
  [SonicVibeEventsOps.mouseenter]: MouseEvent,
  [SonicVibeEventsOps.mouseleave]: MouseEvent,
  [SonicVibeEventsOps.mousemove]: MouseEvent,
  [SonicVibeEventsOps.mouseup]: MouseEvent,
  [SonicVibeEventsOps.mousedown]: MouseEvent,
  [SonicVibeEventsOps.click]: MouseEvent,
  [SonicVibeEventsOps.play]: Event,
  [SonicVibeEventsOps.pause]: Event,
  [SonicVibeEventsOps.keydown]: KeyboardEvent,
};

export default SonicVibeEvents;

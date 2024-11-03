import type SonicVibe from "../components/SonicVibe";
import SonicVibeEvents from "../events";

const addPlayerEvents = (player: SonicVibe) => {
  player.addEventListener(SonicVibeEvents.wheel, handleWheel);
  player.addEventListener(SonicVibeEvents.keydown, handleKeyDown);
  player.addEventListener(SonicVibeEvents.forward, handleForward);
  player.addEventListener(SonicVibeEvents.backward, handleForward);
  player.addEventListener(SonicVibeEvents.amplify, handleAmplify);
  player.addEventListener(SonicVibeEvents.deminish, handleDeminish);
  player.addEventListener(SonicVibeEvents.fullscreen, handleFullScreen);
  player.addEventListener(SonicVibeEvents.play, handlePlay);
  player.addEventListener(SonicVibeEvents.pause, handlePause);
  player.addEventListener(SonicVibeEvents.mute, handleMute);
  player.addEventListener(SonicVibeEvents.unmute, handleUnmute);
  player.addEventListener(SonicVibeEvents.click, (e) => handleClick(e, player));
};

const handleWheel = (e: WheelEvent) => {
  e.stopPropagation();
  e.preventDefault();
  const player = e.target as SonicVibe;
  const { deltaX, deltaY } = e;
  let event!: keyof typeof SonicVibeEvents;
  if (deltaX < -10 && player.media.currentTime + 1 < player.media.duration) {
    event = "forward";
  } else if (deltaX > 10 && player.media.currentTime - 1 > 0) {
    event = "backward";
  } else if (deltaY > 2) {
    event = "amplify";
  } else if (deltaY < -2) {
    event = "deminish";
  }
  event && player.triggerEvent(SonicVibeEvents[event]);
};

const handleKeyDown = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  const player = e.target as SonicVibe;
  if (e.key === " ") {
    player.media.paused ? player.media.play() : player.media.pause();
  } else if (
    e.key === "ArrowRight" &&
    player.media.currentTime + 10 < player.media.duration
  ) {
    player.triggerEvent(SonicVibeEvents.forward, player);
  } else if (e.key === "ArrowLeft" && player.media.currentTime > 10) {
    player.triggerEvent(SonicVibeEvents.backward, player);
  } else if (e.key === "f") {
    player.triggerEvent(SonicVibeEvents.fullscreen, player);
  } else if (e.key === "m") {
    const toggleMute = player.media.muted
      ? SonicVibeEvents.unmute
      : SonicVibeEvents.mute;
    player.triggerEvent(toggleMute, player);
  }
};

const handleForward = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.currentTime += player.bidirectional;
};

const handleAmplify = (e: Event) => {
  const player = e.target as SonicVibe;
  if (player.media.muted) player.triggerEvent(SonicVibeEvents.unmute, player);
  player.media.volume = Math.min(player.media.volume + 0.025, 1);
};

const handleDeminish = (e: Event) => {
  const player = e.target as SonicVibe;
  if (player.media.muted) player.triggerEvent(SonicVibeEvents.unmute, player);
  player.media.volume = Math.max(player.media.volume - 0.025, 0);
};

const handleFullScreen = (e: Event) => {
  const player = e.target as SonicVibe;
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen();
};

const handlePlay = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.play();
};

const handlePause = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.pause();
};

const handleMute = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.muted = true;
};

const handleUnmute = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.muted = false;
};

const handleClick = (e: MouseEvent, currentPlayer: SonicVibe) => {
  const eventFor = (e.target as HTMLElement).id;
  player[currentPlayer.id].functions.click[eventFor](e);
};

export default addPlayerEvents;

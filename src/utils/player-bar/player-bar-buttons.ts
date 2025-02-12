import SonicVibeEvents from "../../events";
import sonicVibeProxy from "../global";
import {
  Play,
  Pause,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
  Fullscreen,
  ExitFullscreen,
} from "./player-bar-icons";

type PlayerAttr = string | undefined;

const createButtons = (id: string, plaberBarElement: HTMLDivElement) => {
  const play = createPlayButton(id);
  const pause = createPauseButton(id);
  const volume = createVolumeControl(id);
  const buttons = document.createElement("div");
  const buttonsLeft = document.createElement("div");
  const buttonsRight = document.createElement("div");
  buttons.classList.add("sonic-vibe-bar-btns");
  buttonsLeft.classList.add("sonic-vibe-bar-btns-left");
  buttonsRight.classList.add("sonic-vibe-bar-btns-right");
  buttonsLeft.append(play, pause, volume);
  buttons.append(buttonsLeft, buttonsRight);
  const player = sonicVibeProxy.instance[id];
  const enableFullscreen = player.elementDefaultAttribute(
    "fullscreen"
  ) as PlayerAttr;
  if (String(enableFullscreen) === "true") {
    const fullscreen = createFullScreen(id);
    buttonsRight.append(fullscreen);
  }
  plaberBarElement.prepend(buttons);
};

const createPlayButton = (id: string) => {
  const player = sonicVibeProxy.instance[id];
  const media = sonicVibeProxy.media[id];
  const play = document.createElement("span");
  play.classList.add("play", "btn");
  if (media.paused) play.classList.add("toggle");
  play.id = id + "-play";
  play.innerHTML = Play;
  const handlePlay = () => {
    play.classList.remove("toggle");
    play.nextElementSibling?.classList.add("toggle");
  };
  sonicVibeProxy.click[play.id] = () =>
    player.triggerEvent(SonicVibeEvents.play);
  sonicVibeProxy.play[id] = handlePlay;
  return play;
};

const createPauseButton = (id: string) => {
  const player = sonicVibeProxy.instance[id];
  const media = sonicVibeProxy.media[id];
  const pause = document.createElement("span");
  pause.classList.add("pause", "btn");
  if (!media.paused) pause.classList.add("toggle");
  pause.id = id + "-pause";
  pause.innerHTML = Pause;
  const handlePause = () => {
    pause.classList.remove("toggle");
    pause.previousElementSibling?.classList.add("toggle");
  };
  sonicVibeProxy.click[pause.id] = () =>
    player.triggerEvent(SonicVibeEvents.pause);
  sonicVibeProxy.pause[id] = handlePause;
  return pause;
};

const createVolumeControl = (id: string) => {
  const media = sonicVibeProxy.media[id];
  const volume = document.createElement("label");
  volume.classList.add("volume");
  volume.id = id + "-volume";
  const volumeRange = document.createElement("input");
  volumeRange.value = `${media.volume * 100}`;
  volumeRange.type = "range";
  volumeRange.addEventListener("input", () => {
    media.volume = Number(volumeRange.value) / 100;
    if (media.muted && media.volume > 0) media.muted = false;
  });
  const volumeControlId = id + "-volume-control";
  const volumeId = id + "volume-icon";
  volumeRange.id = volumeControlId;
  // volumeRange.style.opacity = "0";
  const volumeIcon = document.createElement("span");
  volumeIcon.classList.add("volumeIcon", "btn");
  volumeIcon.innerHTML = media.muted ? VolumeOff : VolumeUp;
  volumeIcon.id = volumeId;
  sonicVibeProxy.mousemove[volumeId] = () =>
    volume.classList.add("volumeControlActive");
  sonicVibeProxy.mouseleave[id] = () =>
    volume.classList.remove("volumeControlActive");

  const volumeControl = document.createElement("div");

  volumeControl.addEventListener("mousemove", (e) => {
    if (volumeControl.classList.contains("toggle")) {
      const boundingBox = volumeControl.getBoundingClientRect();
      const calc = (e.clientX - boundingBox.left) / boundingBox.width;
      const properCalc = calc < 0 ? 0 : calc > 1 ? 1 : calc;
      media.muted = false;
      media.volume = properCalc;
      volumeControl.style.setProperty("--volume", String(properCalc));
    }
  });
  volumeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    media.muted = !media.muted;
    if (media.muted) {
      volumeIcon.innerHTML = VolumeOff;
    } else {
      volumeIcon.innerHTML = VolumeUp;
    }
  });
  media.addEventListener("volumechange", () => {
    volumeControl.style.setProperty(
      "--volume",
      String(media.muted ? 0 : media.volume)
    );
    if (media.muted) {
      volumeIcon.innerHTML = VolumeOff;
    } else if (media.volume === 1) {
      volumeIcon.innerHTML = VolumeUp;
    } else if (media.volume < 1 && media.volume > 0.5) {
      volumeIcon.innerHTML = VolumeDown;
    } else if (media.volume > 0 && media.volume < 0.5) {
      volumeIcon.innerHTML = VolumeMute;
    }
  });
  volumeControl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const boundingBox = volumeControl.getBoundingClientRect();
    const calc = (e.clientX - boundingBox.left) / boundingBox.width;
    const properCalc = calc < 0 ? 0 : calc > 1 ? 1 : calc;
    if (properCalc > 0 && media.muted) {
      media.muted = false;
    }
    media.volume = properCalc;
    volumeControl.style.setProperty("--volume", String(properCalc));
  });
  volume.append(volumeIcon, volumeRange, volumeControl);
  return volume;
};

const createFullScreen = (id: string) => {
  const player = sonicVibeProxy.instance[id];
  const fullscreen = document.createElement("span");
  fullscreen.classList.add("fullscreen", "btn");
  fullscreen.id = id + "-fullscreen";
  fullscreen.innerHTML = Fullscreen + ExitFullscreen;
  sonicVibeProxy.click[fullscreen.id] = () => {
    player.triggerEvent(SonicVibeEvents.fullscreen);
  };
  sonicVibeProxy.fullscreen[id] = () => {
    fullscreen.classList.toggle("toggle");
  };
  return fullscreen;
};

export default createButtons;

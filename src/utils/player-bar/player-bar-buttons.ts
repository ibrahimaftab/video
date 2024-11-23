import SonicVibeEvents from "../../events";
import {
  Play,
  Pause,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from "./player-bar-icons";

const createButtons = (id: string, plaberBarElement: HTMLDivElement) => {
  const play = createPlayButton(id);
  const pause = createPauseButton(id);
  const volume = createVolumeControl(id);
  const buttons = document.createElement("div");
  buttons.classList.add("sonic-vibe-bar-btns");
  buttons.append(play, pause, volume);
  plaberBarElement.prepend(buttons);
};

const createPlayButton = (id: string) => {
  const play = document.createElement("span");
  play.classList.add("play", "btn");
  if (player[id].instance.media.paused) play.classList.add("toggle");
  play.id = id + "-play";
  play.innerHTML = Play;
  const handlePlay = () => {
    play.classList.remove("toggle");
    play.nextElementSibling?.classList.add("toggle");
  };
  player[id].functions.click[play.id] = () =>
    player[id].instance.triggerEvent(SonicVibeEvents.play);
  player[id].functions.play[id] = handlePlay;
  return play;
};

const createPauseButton = (id: string) => {
  const pause = document.createElement("span");
  pause.classList.add("pause", "btn");
  if (!player[id].instance.media.paused) pause.classList.add("toggle");
  pause.id = id + "-pause";
  pause.innerHTML = Pause;
  const handlePause = () => {
    pause.classList.remove("toggle");
    pause.previousElementSibling?.classList.add("toggle");
  };
  player[id].functions.click[pause.id] = () =>
    player[id].instance.triggerEvent(SonicVibeEvents.pause);
  player[id].functions.pause[id] = handlePause;
  return pause;
};

const createVolumeControl = (id: string) => {
  const volume = document.createElement("span");
  volume.classList.add("volume");
  volume.id = id + "-volume";
  const volumeIcon = document.createElement("span");
  volumeIcon.classList.add("volumeIcon", "btn");
  volumeIcon.innerHTML = player[id].instance.media.muted ? VolumeOff : VolumeUp;
  const volumeControl = document.createElement("span");
  volumeControl.classList.add("volumeControl");
  volumeControl.style.setProperty(
    "--volume",
    String(
      player[id].instance.media.muted ? 0 : player[id].instance.media.volume
    )
  );
  volumeControl.addEventListener("mouseup", () =>
    volumeControl.classList.remove("toggle")
  );
  volumeControl.addEventListener("mouseleave", () =>
    volumeControl.classList.remove("toggle")
  );
  volumeControl.addEventListener("mousedown", () =>
    volumeControl.classList.add("toggle")
  );
  volumeControl.addEventListener("mousemove", (e) => {
    if (volumeControl.classList.contains("toggle")) {
      const boundingBox = volumeControl.getBoundingClientRect();
      const calc = (e.clientX - boundingBox.left) / boundingBox.width;
      const properCalc = calc < 0 ? 0 : calc > 1 ? 1 : calc;
      player[id].instance.media.muted = false;
      player[id].instance.media.volume = properCalc;
      volumeControl.style.setProperty("--volume", String(properCalc));
    }
  });
  volumeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    player[id].instance.media.muted = !player[id].instance.media.muted;
    if (player[id].instance.media.muted) {
      volumeIcon.innerHTML = VolumeOff;
    } else {
      volumeIcon.innerHTML = VolumeUp;
    }
  });
  player[id].instance.media.addEventListener("volumechange", () => {
    volumeControl.style.setProperty(
      "--volume",
      String(
        player[id].instance.media.muted ? 0 : player[id].instance.media.volume
      )
    );
    if (player[id].instance.media.muted) {
      volumeIcon.innerHTML = VolumeOff;
    } else if (player[id].instance.media.volume === 1) {
      volumeIcon.innerHTML = VolumeUp;
    } else if (
      player[id].instance.media.volume < 1 &&
      player[id].instance.media.volume > 0.5
    ) {
      volumeIcon.innerHTML = VolumeDown;
    } else if (
      player[id].instance.media.volume > 0 &&
      player[id].instance.media.volume < 0.5
    ) {
      volumeIcon.innerHTML = VolumeMute;
    }
  });
  volumeControl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const boundingBox = volumeControl.getBoundingClientRect();
    const calc = (e.clientX - boundingBox.left) / boundingBox.width;
    const properCalc = calc < 0 ? 0 : calc > 1 ? 1 : calc;
    if (properCalc > 0 && player[id].instance.media.muted) {
      player[id].instance.media.muted = false;
    }
    player[id].instance.media.volume = properCalc;
    volumeControl.style.setProperty("--volume", String(properCalc));
  });
  volume.append(volumeIcon, volumeControl);
  return volume;
};

export default createButtons;

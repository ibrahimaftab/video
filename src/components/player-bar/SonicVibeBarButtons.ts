import type SonicVibe from "../SonicVibe";
import type { SonicVibeMedia } from "../../models/default-options";
import type SonicVibeBar from "./SonicVibeBar";
import { triggerEvent } from "../../utils/functions";
import SonicVibeEvents from "../../events";
import {
  Play,
  Pause,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from "./SonicVibeIcons";

export default class SonicVibeBarButtons {
  player!: SonicVibe;
  playerBar!: SonicVibeBar;
  media!: SonicVibeMedia;
  play!: HTMLSpanElement;
  pause!: HTMLSpanElement;
  volume!: HTMLSpanElement;
  btns!: HTMLDivElement;

  constructor(playerBar: SonicVibeBar, media: SonicVibeMedia) {
    this.playerBar = playerBar;
    this.player = this.playerBar.parentElement as SonicVibe;
    this.media = media;
    this.btns = document.createElement("div");
    this.btns.classList.add("btns");
    this.createPlayButton();
    this.createPauseButton();
    this.createVolumeControl();
    this.playerBar.prepend(this.btns);
  }

  createPlayButton() {
    this.play = document.createElement("span");
    this.play.classList.add("play", "btn");
    this.play.innerHTML = Play;
    this.play.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerEvent(SonicVibeEvents.play, this.player);
    });
    this.media.addEventListener("play", () =>
      this.play.classList.remove("toggle")
    );
    this.media.addEventListener("pause", () =>
      this.play.classList.add("toggle")
    );
    if (this.media.paused) {
      this.play.classList.add("toggle");
    }
    this.btns.prepend(this.play);
  }

  createPauseButton() {
    this.pause = document.createElement("span");
    this.pause.classList.add("pause", "btn");
    this.pause.innerHTML = Pause;
    this.pause.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerEvent(SonicVibeEvents.pause, this.player);
    });
    this.media.addEventListener("play", () =>
      this.pause.classList.add("toggle")
    );
    this.media.addEventListener("pause", () =>
      this.pause.classList.remove("toggle")
    );
    if (!this.media.paused) {
      this.pause.classList.add("toggle");
    }
    this.btns.prepend(this.pause);
  }

  createVolumeControl() {
    this.volume = document.createElement("span");
    this.volume.classList.add("volume");
    const volumeIcon = document.createElement("span");
    volumeIcon.classList.add("volumeIcon", "btn");
    volumeIcon.innerHTML = this.media.muted ? VolumeOff : VolumeUp;
    const volumeControl = document.createElement("span");
    volumeControl.classList.add("volumeControl");
    volumeControl.style.setProperty(
      "--volume",
      String(this.media.muted ? 0 : this.media.volume)
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
        this.media.muted = false;
        this.media.volume = properCalc;
        volumeControl.style.setProperty("--volume", String(properCalc));
      }
    });
    volumeIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.media.muted = !this.media.muted;
      if (this.media.muted) {
        volumeIcon.innerHTML = VolumeOff;
      } else {
        volumeIcon.innerHTML = VolumeUp;
      }
    });
    this.media.addEventListener("volumechange", () => {
      volumeControl.style.setProperty(
        "--volume",
        String(this.media.muted ? 0 : this.media.volume)
      );
      if (this.media.muted) {
        volumeIcon.innerHTML = VolumeOff;
      } else if (this.media.volume === 1) {
        volumeIcon.innerHTML = VolumeUp;
      } else if (this.media.volume < 1 && this.media.volume > 0.5) {
        volumeIcon.innerHTML = VolumeDown;
      } else if (this.media.volume > 0 && this.media.volume < 0.5) {
        volumeIcon.innerHTML = VolumeMute;
      }
    });
    volumeControl.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const boundingBox = volumeControl.getBoundingClientRect();
      const calc = (e.clientX - boundingBox.left) / boundingBox.width;
      const properCalc = calc < 0 ? 0 : calc > 1 ? 1 : calc;
      if (properCalc > 0 && this.media.muted) {
        this.media.muted = false;
      }
      this.media.volume = properCalc;
      volumeControl.style.setProperty("--volume", String(properCalc));
    });
    this.volume.append(volumeIcon, volumeControl);
    this.btns.append(this.volume);
  }
}

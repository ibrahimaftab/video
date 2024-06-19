import type SonicVibe from "../SonicVibe";
import type { SonicVibeMedia } from "../../models/default-options";
import type SonicVibeBar from "./SonicVibeBar";
import { triggerEvent } from "../../utils/functions";
import SonicVibeEvents from "../../events";

export default class SonicVibeBarButtons {
  player!: SonicVibe;
  playerBar!: SonicVibeBar;
  media!: SonicVibeMedia;
  play!: HTMLSpanElement;
  pause!: HTMLSpanElement;
  btns!: HTMLDivElement;
  constructor(playerBar: SonicVibeBar, media: SonicVibeMedia) {
    this.playerBar = playerBar;
    this.player = this.playerBar.parentElement as SonicVibe;
    this.media = media;
    this.btns = document.createElement("div");
    this.btns.classList.add("btns");
    this.createPlayButton();
    this.createPauseButton();
    if (this.media.paused) {
      this.play.classList.add("toggle");
    } else {
      this.pause.classList.add("toggle");
    }
    this.playerBar.prepend(this.btns);
  }

  createPlayButton() {
    this.play = document.createElement("span");
    this.play.classList.add("play", "btn");
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
    this.btns.prepend(this.play);
  }

  createPauseButton() {
    this.pause = document.createElement("span");
    this.pause.classList.add("pause", "btn");
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
    this.btns.prepend(this.pause);
  }
}

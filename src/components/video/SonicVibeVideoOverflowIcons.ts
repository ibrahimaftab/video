import SonicVibeEvents from "../../events";
import { SonicVibeChildComponent } from "../../models/default-options";
import {
  addStylesheet,
  formatVideoDuration,
  triggerEvent,
} from "../../utils/functions";
import type SonicVibe from "../SonicVibe";

export default class SonicVibeOverflowIcons extends SonicVibeChildComponent {
  protected playButton = document.createElement("span");
  protected pauseButton = document.createElement("span");
  protected videoTimer = document.createElement("span");
  protected videoTimerTimeout: null | number = null;
  protected timerOutDuration = 600;
  protected player: SonicVibe;
  constructor(player: SonicVibe) {
    super();
    this.player = player;
  }
  handleOnScroll = () => {
    this.videoTimer.classList.add("active");
    this.videoTimer.textContent = formatVideoDuration(
      this.player.media.currentTime
    );
    this.playButton.classList.remove("active");
    this.pauseButton.classList.remove("active");
    if (this.videoTimerTimeout) clearTimeout(this.videoTimerTimeout);
    this.player.classList.add("trigger");
    setTimeout(() => {
      this.player.classList.remove("trigger");
    }, 5e2);
    this.videoTimerTimeout = setTimeout(() => {
      this.videoTimer.classList.remove("active");
      if (this.player.media.paused) this.playButton.classList.add("active");
    }, this.timerOutDuration);
  };
  create() {
    addStylesheet("overflow-icons");
    this.playButton.classList.add("sonic-vibe-play", "sonic-vibe-state");
    this.pauseButton.classList.add("sonic-vibe-pause", "sonic-vibe-state");
    this.videoTimer.textContent = "0:00";
    let playTimeOut: number | null = null;
    this.player.media?.addEventListener("play", () => {
      if (
        this.player.media.played &&
        !this.videoTimer.classList.contains("active")
      ) {
        this.pauseButton.classList.remove("active");
        this.playButton.classList.add("active");
        if (playTimeOut) clearTimeout(playTimeOut);
        playTimeOut = setTimeout(
          () => this.playButton.classList.remove("active"),
          this.timerOutDuration
        );
      }
    });

    let pauseTimeout: null | number = null;
    this.player.media.addEventListener("pause", () => {
      if (
        this.player.media.played &&
        !this.videoTimer.classList.contains("active")
      ) {
        this.playButton.classList.remove("active");
        this.pauseButton.classList.add("active");
        if (pauseTimeout) clearInterval(pauseTimeout);
        pauseTimeout = setTimeout(
          () => this.pauseButton.classList.remove("active"),
          this.timerOutDuration
        );
      }
    });

    this.player.media.addEventListener(
      "timeupdate",
      () =>
        (this.videoTimer.textContent = formatVideoDuration(
          this.player.media.currentTime
        ))
    );

    this.player.addEventListener(SonicVibeEvents.forward, this.handleOnScroll);
    this.player.addEventListener(SonicVibeEvents.backward, this.handleOnScroll);

    this.player.addEventListener("click", () => {
      if (this.player.media?.played && !this.player.mouseDragged) {
        const event = this.player.media?.paused
          ? SonicVibeEvents.play
          : SonicVibeEvents.pause;
        triggerEvent(event, this.player);
      }
    });
    this.player.append(this.playButton, this.pauseButton, this.videoTimer);
  }
}

import SonicVibeEvents from "../../events";
import { addStylesheet, formatVideoDuration } from "../../utils/functions";
import type SonicVibe from "../SonicVibe";
import type SonicVibeVideo from "./SonicVibeVideo";

export default class SonicVibeOverflowIcons {
  private playButton = document.createElement("span");
  private pauseButton = document.createElement("span");
  private videoTimer = document.createElement("span");
  private videoTimerTimeout: null | number = null;
  private timerOutDuration = 600;
  private player!: SonicVibe;
  private playerVideo!: SonicVibeVideo;
  constructor(playerVideo: SonicVibeVideo) {
    this.player = playerVideo.parentElement as SonicVibe;
    this.playerVideo = playerVideo;
    this.create();
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
    this.videoTimer.classList.add("sonic-vibe-timer", "sonic-vibe-state");
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
    this.playerVideo.append(this.playButton, this.pauseButton, this.videoTimer);
  }
}

import { addStylesheet, formatVideoDuration } from "../utils/functions";
import type SonicVibe from "./SonicVibe";

export default class VideoPlayer {
  static createVideo(
    options: VideoOptions,
    player: SonicVibe
  ): [HTMLVideoElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement] {
    addStylesheet("player");
    const video = document.createElement("video");
    video.style.aspectRatio = options.aspectRatio;
    video.style.width = "100%";
    video.src = options.src;
    video.autoplay = options.autoplay;
    video.playsInline = options.playsInline;
    video.muted = options.muted;
    video.controls = false;

    const playButton = document.createElement("span");
    playButton.classList.add("sonic-vibe-play", "sonic-vibe-state");

    const pauseButton = document.createElement("span");
    pauseButton.classList.add("sonic-vibe-pause", "sonic-vibe-state");

    const videoTimer = document.createElement("span");
    videoTimer.classList.add("sonic-vibe-timer", "sonic-vibe-state");
    videoTimer.textContent = "0:00";

    video.addEventListener("error", (e) => {
      const elementMessage = (e.target as HTMLVideoElement).error?.message;
      const error = new Event("error");

      if (elementMessage?.length)
        (video.parentElement as SonicVibe).error = elementMessage;

      video.parentElement?.dispatchEvent(error);
    });

    let playTimeOut: number | null = null;
    video.addEventListener("play", () => {
      if (video.played) {
        playButton.classList.remove("active");
        pauseButton.classList.add("active");
        if (playTimeOut) clearTimeout(playTimeOut);
        playTimeOut = setTimeout(
          () => pauseButton.classList.remove("active"),
          1e3
        );
      }
    });

    video.addEventListener("pause", () => {
      if (video.played) {
        playButton.classList.add("active");
        pauseButton.classList.remove("active");
      }
    });

    video.addEventListener(
      "timeupdate",
      () => (videoTimer.textContent = formatVideoDuration(video.currentTime))
    );

    let videoTimerTimeout: null | number = null;
    player.addEventListener("wheel", () => {
      videoTimer.classList.add("active");
      playButton.classList.remove("active");
      pauseButton.classList.remove("active");
      if (videoTimerTimeout) clearTimeout(videoTimerTimeout);
      videoTimerTimeout = setTimeout(() => {
        videoTimer.classList.remove("active");
        if (video.paused) playButton.classList.add("active");
      });
    });

    let pauseTimeout: null | number = null;
    player.addEventListener("mousemove", () => {
      if (video.played && !video.paused) {
        pauseButton.classList.add("active");
        if (pauseTimeout) clearInterval(pauseTimeout);
        pauseTimeout = setTimeout(
          () => pauseButton.classList.remove("active"),
          3e3
        );
      }
    });
    return [video, playButton, pauseButton, videoTimer];
  }
}

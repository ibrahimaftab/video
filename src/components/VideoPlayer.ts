import SonicVibeEvents from "../events";
import {
  addStylesheet,
  formatVideoDuration,
  triggerEvent,
} from "../utils/functions";
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

    const timerOutDuration = 600;

    const playButton = document.createElement("span");
    playButton.classList.add("sonic-vibe-play", "sonic-vibe-state");

    const pauseButton = document.createElement("span");
    pauseButton.classList.add("sonic-vibe-pause", "sonic-vibe-state");

    const videoTimer = document.createElement("span");
    videoTimer.classList.add("sonic-vibe-timer", "sonic-vibe-state");
    videoTimer.textContent = "0:00";

    video.addEventListener("loadeddata", () =>
      triggerEvent(SonicVibeEvents.ready, player)
    );

    video.addEventListener("error", (e) => {
      const message = (e.target as HTMLVideoElement).error?.message;
      if (message?.length) player.error = message;
      triggerEvent(SonicVibeEvents.error, player);
    });

    player.addEventListener(SonicVibeEvents.ready, () => {
      let playTimeOut: number | null = null;
      video.addEventListener("play", () => {
        if (video.played && !videoTimer.classList.contains("active")) {
          pauseButton.classList.remove("active");
          playButton.classList.add("active");
          if (playTimeOut) clearTimeout(playTimeOut);
          playTimeOut = setTimeout(
            () => playButton.classList.remove("active"),
            timerOutDuration
          );
        }
      });

      let pauseTimeout: null | number = null;
      video.addEventListener("pause", () => {
        if (video.played && !videoTimer.classList.contains("active")) {
          playButton.classList.remove("active");
          pauseButton.classList.add("active");
          if (pauseTimeout) clearInterval(pauseTimeout);
          pauseTimeout = setTimeout(
            () => pauseButton.classList.remove("active"),
            timerOutDuration
          );
        }
      });

      video.addEventListener(
        "timeupdate",
        () => (videoTimer.textContent = formatVideoDuration(video.currentTime))
      );

      let videoTimerTimeout: null | number = null;
      const handleOnScroll = () => {
        videoTimer.classList.add("active");
        videoTimer.textContent = formatVideoDuration(video.currentTime);
        playButton.classList.remove("active");
        pauseButton.classList.remove("active");
        if (videoTimerTimeout) clearTimeout(videoTimerTimeout);
        player.classList.add("trigger");
        setTimeout(() => {
          player.style.removeProperty("--sonic-vibe-cursor-text");
          player.classList.remove("trigger");
        }, 5e2);
        videoTimerTimeout = setTimeout(() => {
          videoTimer.classList.remove("active");
          if (video.paused) playButton.classList.add("active");
        }, timerOutDuration);
      };
      const handleOnForward = () => {
        player.style.setProperty("--sonic-vibe-cursor-text", `"Forward"`);
        handleOnScroll();
      };
      const handleOnBackward = () => {
        player.style.setProperty("--sonic-vibe-cursor-text", `"Backward"`);
        handleOnScroll();
      };
      player.addEventListener(SonicVibeEvents.forward, handleOnForward);
      player.addEventListener(SonicVibeEvents.backward, handleOnBackward);

      let mouseDragged = 0;

      player.addEventListener("mouseup", (e) => {
        const calc = e.clientX - mouseDragged;

        if (calc != 0 && (calc > 10 || calc < -10)) video.currentTime += calc;
        else player.mouseDragged = false;

        setTimeout(() => {
          player.mouseDragged = false;
        });
      });
      player.addEventListener("mousedown", (e) => {
        player.mouseDragged = true;
        mouseDragged = e.clientX;
      });
      player.classList.add("sonic-vibe-video");

      player.addEventListener("mousemove", (e) => {
        player.style.setProperty("--sonic-vibe-cursor-x", e.clientX + "px");
        player.style.setProperty("--sonic-vibe-cursor-y", e.clientY + "px");
      });
      player.addEventListener("click", () => {
        if (player.media?.played && !player.mouseDragged) {
          const event = player.media?.paused
            ? SonicVibeEvents.play
            : SonicVibeEvents.pause;
          triggerEvent(event, player);
        }
      });
      let cursortimerTimeOut: null | number = null;
      const handleOnClick = () => {
        player.classList.add("trigger");
        if (cursortimerTimeOut) clearTimeout(cursortimerTimeOut);
        cursortimerTimeOut = setTimeout(() => {
          player.style.removeProperty("--sonic-vibe-cursor-text");
          player.classList.remove("trigger");
        }, 5e2);
      };
      player.addEventListener(SonicVibeEvents.play, () => {
        player.style.setProperty("--sonic-vibe-cursor-text", `"Play"`);
        handleOnClick();
      });
      player.addEventListener(SonicVibeEvents.pause, () => {
        player.style.setProperty("--sonic-vibe-cursor-text", `"Pause"`);
        handleOnClick();
      });
      player.addEventListener("keydown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const media = player.media;
        if (media?.played) {
          if (e.key === " ") {
            let text = media.paused ? "Play" : "Pause";
            player.style.setProperty("--sonic-vibe-cursor-text", `"${text}"`);
            player.classList.add("trigger");
            setTimeout(() => {
              player.style.removeProperty("--sonic-vibe-cursor-text");
              player.classList.remove("trigger");
            }, 5e2);
          } else if (
            e.key === "ArrowRight" &&
            media.currentTime + 10 < media.duration
          ) {
            media.currentTime += 10;
            player.style.setProperty("--sonic-vibe-cursor-text", `"Forward"`);
            player.classList.add("trigger");
            setTimeout(() => {
              player.style.removeProperty("--sonic-vibe-cursor-text");
              player.classList.remove("trigger");
            }, 5e2);
          } else if (e.key === "ArrowLeft" && media.currentTime > 10) {
            media.currentTime -= 10;
            player.style.setProperty("--sonic-vibe-cursor-text", `"Backward"`);
            player.classList.add("trigger");
            setTimeout(() => {
              player.style.removeProperty("--sonic-vibe-cursor-text");
              player.classList.remove("trigger");
            }, 5e2);
          }
        }
      });
    });
    return [video, playButton, pauseButton, videoTimer];
  }
}

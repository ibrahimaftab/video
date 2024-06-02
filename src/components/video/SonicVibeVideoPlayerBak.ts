import SonicVibeEvents from "../../events";
import type IVideoPlayer from "../../models/video-player";
import { VideoOptions, VideoHtml } from "../../models/video-player";
import {
  addStylesheet,
  formatVideoDuration,
  triggerEvent,
} from "../../utils/functions";
import type SonicVibe from "../SonicVibe";

export default class VideoPlayer {
  video = document.createElement("video");

  constructor(options: VideoOptions) {
    this.video.style.aspectRatio = options.aspectRatio;
    this.video.style.width = "100%";
    this.video.src = options.src;
    this.video.autoplay = options.autoplay;
    this.video.playsInline = options.playsInline;
    this.video.muted = options.muted;
    this.video.controls = false;
  }
  createVideo(player: SonicVibe): VideoHtml {
    addStylesheet("player");

    const pauseButton = document.createElement("span");

    const videoTimer = document.createElement("span");
    videoTimer.classList.add("sonic-vibe-timer", "sonic-vibe-state");
    videoTimer.textContent = "0:00";

    const waveform = document.createElement("svg");

    // Function to render waveform using SVG
    function renderWaveform(audioData: number[]) {
      // Clear existing waveform
      waveform.innerHTML = "";

      // Render waveform
      audioData.forEach((amplitude, index) => {
        const x = index * 2;
        const y = 50 - amplitude * 50;
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("x", `${x}`);
        rect.setAttribute("y", `${y}`);
        rect.setAttribute("width", "2");
        rect.setAttribute("height", `${amplitude * 100}`);
        rect.setAttribute("fill", "blue");
        waveform.appendChild(rect);
      });
    }

    // Function to extract audio data from video
    function extractAudioData(video: HTMLVideoElement) {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(video);
      const analyser = audioCtx.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      return () => {
        analyser.getByteTimeDomainData(dataArray);
        return Array.from(dataArray).map((value) => value / 128 - 1);
      };
    }

    // Render waveform when video is loaded
    this.video.addEventListener("canplay", () => {
      const getAudioData = extractAudioData(video);
      renderWaveform(getAudioData());
    });

    // Update waveform on video timeupdate
    this.video.addEventListener("timeupdate", () => {
      const getAudioData = extractAudioData(video);
      renderWaveform(getAudioData());
    });

    this.video.addEventListener("loadeddata", () =>
      triggerEvent(SonicVibeEvents.ready, player)
    );

    this.video.addEventListener("error", (e) => {
      const message = (e.target as HTMLVideoElement).error?.message;
      if (message?.length) player.error = message;
      triggerEvent(SonicVibeEvents.error, player);
    });

    player.addEventListener(SonicVibeEvents.ready, () => {
      let videoTimerTimeout: null | number = null;
      const handleOnScroll = () => {
        videoTimer.classList.add("active");
        videoTimer.textContent = formatVideoDuration(this.video.currentTime);
        this.playButton.classList.remove("active");
        pauseButton.classList.remove("active");
        if (videoTimerTimeout) clearTimeout(videoTimerTimeout);
        player.classList.add("trigger");
        setTimeout(() => {
          player.style.removeProperty("--sonic-vibe-cursor-text");
          player.classList.remove("trigger");
        }, 5e2);
        videoTimerTimeout = setTimeout(() => {
          videoTimer.classList.remove("active");
          if (this.video.paused) this.playButton.classList.add("active");
        }, this.#timerOutDuration);
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

        if (calc != 0 && (calc > 10 || calc < -10))
          this.video.currentTime += calc;
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
    return [video, waveform, playButton, pauseButton, videoTimer];
  }
}

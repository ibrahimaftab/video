import SonicVibeEvents from "../events";
import {
  addStylesheet,
  checkVideoFile,
  checkAudioFile,
  triggerEvent,
  checkMediaFile,
} from "../utils/functions";

/**
 * Represents a custom element called SonicVibe.
 * @extends HTMLElement
 */
export default class SonicVibe extends HTMLElement {
  /**
   * The source URL of the video.
   * @type {string | null | undefined}
   */
  private src: string | null | undefined = null;

  /**
   * Mouse Dragged
   * @type {boolean}
   */
  mouseDragged = false;

  /**
   * The video DOM HTML.
   * @type {HTMLVideoElement | HTMLAudioElement | undefined}
   */
  media?: HTMLVideoElement | HTMLAudioElement;

  /**
   * The aspect ratio of the video, e.g: "16/9", default is "16/9".
   * @type {string | null | undefined}
   */
  private aspectRatio = "16/9";

  /**
   * Video autoplay, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  private autoplay = "true";

  /**
   * Video mute, e.g: "true" or "false", default is "false".
   * @type {boolean | undefined}
   */
  private muted = "false";

  /**
   * Video playsInline, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  private playsInline = "true";

  /**
   * Video width, e.g: "320", default is "800".
   * @type {boolean | undefined}
   */
  private width = "800";

  /**
   * SonicVibe video bar enabling, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  private bar = true;

  /**
   * SonicVibe error message, e.g: "No Video File Found", default is "No Video File Found".
   * @type {boolean | undefined}
   */
  error: string = "No Video File Found";

  /**
   * Constructs a new SonicVibe element.
   */
  constructor() {
    super();
    this.media = undefined;
  }

  /**
   * Connected Callback
   */
  connectedCallback() {
    this.initiateVideo();

    this.addEventListener("error", async () => {
      this.innerHTML = "";
      const SonicVibeError = await (await import("./SonicVibeError")).default;
      this.append(new SonicVibeError(this.error));
    });
  }

  /**
   * Initiate Video, adding the necessary html elements, css style and js functionality for player
   */
  initiateVideo() {
    addStylesheet("styles");
    this.src = this.getAttribute("src");
    this.aspectRatio = this.getAttribute("aspectRatio") || this.aspectRatio;
    this.autoplay = this.getAttribute("autoplay") || this.autoplay;
    this.muted = this.getAttribute("muted") || this.muted;
    this.width = this.getAttribute("width") || this.width;
    this.bar = this.getAttribute("bar") == "true" || this.bar;
    this.style.aspectRatio = this.aspectRatio;
    this.style.width = +this.width + "px";
    this.tabIndex = 0;
    this.focus();

    this.addEventListener(SonicVibeEvents.error, () => {
      (async () => {
        const SonicVibeError = await (await import("./SonicVibeError")).default;
        this.append(new SonicVibeError(this.error));
      })();
    });
    const src = this.src;

    if (!src || !checkMediaFile(src)) {
      return triggerEvent(SonicVibeEvents.error, this);
    }

    if (checkVideoFile(src)) {
      (async () => {
        const VideoPlayer = await (await import("./VideoPlayer")).default;
        const [video, play, pause, timer] = VideoPlayer.createVideo(
          {
            src,
            aspectRatio: this.aspectRatio,
            autoplay: this.autoplay == "true",
            muted: this.muted == "true",
            playsInline: this.playsInline == "true",
          },
          this
        );
        this.media = video;
        this.append(this.media);
        if (this.bar) {
          const SonicVibeVideoBar = await (
            await import("./SonicVibeVideoBar")
          ).default;
          const bar = new SonicVibeVideoBar();
          this.append(play, pause, timer, bar);
        }
      })();
    } else {
    }
    this.addEventListener(SonicVibeEvents.ready, () => {
      const media = this.media;
      if (!media?.played) {
        return;
      }
      this.addEventListener("wheel", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { deltaX, deltaY } = e;
        if (deltaX < -10 && media.currentTime + 1 < media.duration) {
          triggerEvent(SonicVibeEvents.forward, this);
        } else if (deltaX > 10 && media.currentTime - 1 > 0) {
          triggerEvent(SonicVibeEvents.backward, this);
        } else if (deltaY > 2) {
          triggerEvent(SonicVibeEvents.amplify, this);
        } else if (deltaY < -2) {
          triggerEvent(SonicVibeEvents.deminish, this);
        }
      });
      this.addEventListener("keydown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.key === " ") {
          media.paused ? media.play() : media.pause();
        } else if (
          e.key === "ArrowRight" &&
          media.currentTime + 10 < media.duration
        ) {
          triggerEvent(SonicVibeEvents.forward, this);
        } else if (e.key === "ArrowLeft" && media.currentTime > 10) {
          triggerEvent(SonicVibeEvents.backward, this);
        } else if (e.key === "f") {
          triggerEvent(SonicVibeEvents.fullscreen, this);
        } else if (e.key === "m") {
          const toggleMute = media.muted
            ? SonicVibeEvents.unmute
            : SonicVibeEvents.mute;
          triggerEvent(toggleMute, this);
        }
      });

      this.addEventListener(SonicVibeEvents.forward, () => {
        media.currentTime += 1;
      });
      this.addEventListener(SonicVibeEvents.backward, () => {
        media.currentTime -= 1;
      });
      this.addEventListener(SonicVibeEvents.amplify, () => {
        if (media.muted) triggerEvent(SonicVibeEvents.unmute, this);
        media.volume = Math.min(media.volume + 0.1, 1);
      });
      this.addEventListener(SonicVibeEvents.deminish, () => {
        media.volume = Math.max(media.volume - 0.1, 0);
      });
      this.addEventListener(SonicVibeEvents.fullscreen, () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else this.requestFullscreen();
      });
      this.addEventListener(SonicVibeEvents.play, () => media.play());
      this.addEventListener(SonicVibeEvents.pause, () => media.pause());
      this.addEventListener(SonicVibeEvents.mute, () => (media.muted = true));
      this.addEventListener(
        SonicVibeEvents.unmute,
        () => (media.muted = false)
      );
    });
  }
}

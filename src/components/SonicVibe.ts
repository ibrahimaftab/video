import SonicVibeEvents from "../events";
import { MediaType, SonicVibeMedia } from "../models/default-options";
import {
  addStylesheet,
  checkVideoFile,
  checkAudioFile,
  triggerEvent,
  checkMediaFile,
  elementDefaultAttribute,
} from "../utils/functions";
import type SonicVibeVideo from "./video/SonicVibeVideo";

/**
 * Represents a custom element called SonicVibe.
 * @extends HTMLElement
 */
export default class SonicVibe extends HTMLElement {
  /**
   * Mouse Dragged
   * @type {boolean}
   */
  mouseDragged = false;

  /**
   * The video DOM HTML.
   * @type {SonicVibeMedia | undefined}
   */
  media!: SonicVibeMedia;

  /**
   * The aspect ratio of the video, e.g: "16/9", default is "16/9".
   * @type {string | null | undefined}
   */
  aspectRatio = "16/9";

  /**
   * Video autoplay, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  autoplay = "true";

  /**
   * Video mute, e.g: "true" or "false", default is "false".
   * @type {boolean | undefined}
   */
  muted = "false";

  /**
   * Video playsInline, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  playsInline = "true";

  /**
   * Video width, e.g: "320", default is "800".
   * @type {boolean | undefined}
   */
  width = "800";

  /**
   * SonicVibe video control enabling, e.g: "true" or "false", default is "true".
   * @type {string | undefined}
   */
  control = "true";

  /**
   * SonicVibe video overflow buttons enabling, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  overflowButtons = true;

  /**
   * SonicVibe video cursor enabling, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  cursor = true;

  /**
   * SonicVibe video bar timeline enabling, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  timeline = true;

  /**
   * SonicVibe video bar buttons enabling, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  buttons = true;

  /**
   * Constructs a new SonicVibe element.
   */
  constructor() {
    super();
    addStylesheet("styles");
    this.width = elementDefaultAttribute("width", this);
    this.control = elementDefaultAttribute("control", this);
    this.aspectRatio = elementDefaultAttribute("aspectRatio", this);
    this.muted = elementDefaultAttribute("muted", this);
    this.playsInline = elementDefaultAttribute("playsInline", this);
    this.style.aspectRatio = this.aspectRatio;
    this.style.width = this.width;
    this.tabIndex = 0;
    this.focus();
    const src = this.getAttribute("src");

    if (!src || !checkMediaFile(src)) {
      triggerEvent(SonicVibeEvents.error, this);
    } else {
      const mediaFileType = checkMediaFile(src);

      if (mediaFileType === MediaType.video) {
        this.insertAdjacentHTML(
          "afterbegin",
          `<sonic-vibe-video></sonic-vibe-video>`
        );
      } else {
      }
    }

    this.addEventListener(
      SonicVibeEvents.error,
      (e: CustomEventInit<MediaError>) => {
        (async () => {
          this.innerHTML = `<sonic-vibe-error>${e.detail?.message}</sonic-vibe-error>`;
        })();
      }
    );

    this.addEventListener(
      SonicVibeEvents.ready,
      (e: CustomEventInit<HTMLVideoElement>) => {
        if (!e.detail) {
          return;
        }

        this.addEventListener("wheel", (e) => {
          e.stopPropagation();
          e.preventDefault();
          const { deltaX, deltaY } = e;
          if (
            deltaX < -10 &&
            this.media.currentTime + 1 < this.media.duration
          ) {
            triggerEvent(SonicVibeEvents.forward, this);
          } else if (deltaX > 10 && this.media.currentTime - 1 > 0) {
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
            this.media.paused ? this.media.play() : this.media.pause();
          } else if (
            e.key === "ArrowRight" &&
            this.media.currentTime + 10 < this.media.duration
          ) {
            triggerEvent(SonicVibeEvents.forward, this);
          } else if (e.key === "ArrowLeft" && this.media.currentTime > 10) {
            triggerEvent(SonicVibeEvents.backward, this);
          } else if (e.key === "f") {
            triggerEvent(SonicVibeEvents.fullscreen, this);
          } else if (e.key === "m") {
            const toggleMute = this.media.muted
              ? SonicVibeEvents.unmute
              : SonicVibeEvents.mute;
            triggerEvent(toggleMute, this);
          }
        });

        this.addEventListener(SonicVibeEvents.forward, () => {
          this.media.currentTime += 1;
        });
        this.addEventListener(SonicVibeEvents.backward, () => {
          this.media.currentTime -= 1;
        });
        this.addEventListener(SonicVibeEvents.amplify, () => {
          if (this.media.muted) triggerEvent(SonicVibeEvents.unmute, this);
          this.media.volume = Math.min(this.media.volume + 0.1, 1);
        });
        this.addEventListener(SonicVibeEvents.deminish, () => {
          this.media.volume = Math.max(this.media.volume - 0.1, 0);
        });
        this.addEventListener(SonicVibeEvents.fullscreen, () => {
          if (document.fullscreenElement) document.exitFullscreen();
          else this.requestFullscreen();
        });
        this.addEventListener(SonicVibeEvents.play, () => this.media.play());
        this.addEventListener(SonicVibeEvents.pause, () => this.media.pause());
        this.addEventListener(
          SonicVibeEvents.mute,
          () => (this.media.muted = true)
        );
        this.addEventListener(
          SonicVibeEvents.unmute,
          () => (this.media.muted = false)
        );
      }
    );
  }
}

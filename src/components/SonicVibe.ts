import SonicVibeEvents from "../events";
import { MediaType, SonicVibeMedia } from "../models/default-options";
import {
  addStylesheet,
  triggerEvent,
  checkMediaFile,
} from "../utils/functions";

let counter = 1;

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
   * SonicVibe video player bar enabling, e.g: "true" or "false", default is "true".
   * @type {boolean | undefined}
   */
  playerbar = true;

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
   * SonicVibe media bidirectional speed adjusting speed in seconds forward and backward, e.g: "1" or "5", default is "2" second.
   * @type {number | undefined}
   */
  bidirectional = 2;

  /**
   * SonicVibe media source must be a valid URL for media files, such as `'video.mp4'` or `'audio.mp3'`. Acceptable formats include **MP4, HLS (M3U8), DASH (MPD), WebM, M4A, OGG, MP3, and WAV**.
   * @type {string | undefined}
   */
  src!: string;

  /**
   * Constructs a new SonicVibe element.
   */
  constructor() {
    super();
    addStylesheet("styles");
    this.width = this.elementDefaultAttribute("width");
    this.control = this.elementDefaultAttribute("control");
    this.aspectRatio = this.elementDefaultAttribute("aspectRatio");
    this.muted = this.elementDefaultAttribute("muted");
    this.playsInline = this.elementDefaultAttribute("playsInline");
    this.style.aspectRatio = this.aspectRatio;
    this.style.width = this.width;
    this.id = `sonic-vibe-${counter++}`;
    this.tabIndex = 0;
    this.src = this.elementDefaultAttribute("src");

    this.checkSourceFile();

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
          let event!: keyof typeof SonicVibeEvents;
          if (
            deltaX < -10 &&
            this.media.currentTime + 1 < this.media.duration
          ) {
            event = "forward";
          } else if (deltaX > 10 && this.media.currentTime - 1 > 0) {
            event = "backward";
          } else if (deltaY > 2) {
            event = "amplify";
          } else if (deltaY < -2) {
            event = "deminish";
          }
          event && this.triggerEvent(SonicVibeEvents[event]);
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
          this.media.currentTime += this.bidirectional;
        });
        this.addEventListener(SonicVibeEvents.backward, () => {
          this.media.currentTime -= this.bidirectional;
        });
        this.addEventListener(SonicVibeEvents.amplify, () => {
          if (this.media.muted) triggerEvent(SonicVibeEvents.unmute, this);
          this.media.volume = Math.min(this.media.volume + 0.025, 1);
        });
        this.addEventListener(SonicVibeEvents.deminish, () => {
          this.media.volume = Math.max(this.media.volume - 0.025, 0);
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
        this.addEventListener(
          SonicVibeEvents.click,
          () => {
            
          }
        )
      }
    );
  }

  /**
   * Check if the source file is valid, if not, trigger "error" event.
   * If the source file is a video, insert a <sonic-vibe-video> element to render the video.
   * If the source file is an audio, do nothing for now.
   */
  async checkSourceFile() {
    const src = this.getAttribute("src");
    if (!src || !checkMediaFile(src)) {
      this.triggerEvent(SonicVibeEvents.error);
    } else {
      const mediaFileType = checkMediaFile(src);

      if (mediaFileType === MediaType.video) {
        import("../utils/video-player/video-player").then((module) => {
          module.default(this);
        });
      } else {
      }
    }
  }

  /**
   * Retrieves the default attribute value of an HTML element based on a property name.
   * @param {string} property The name of the attribute or property.
   * @returns {T} The value of the attribute or property.
   */
  elementDefaultAttribute<T>(property: string): T {
    return this.hasAttribute(property)
      ? this.getAttribute(property)
      : Object.getOwnPropertyDescriptor(this, property)?.value;
  }

  /**
   * Dispatch Sonic Vibe Event
   * @param {SonicVibeEvents} event
   * @returns {void}
   */
  triggerEvent<T>(event: SonicVibeEvents, payload?: T) {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: payload,
        bubbles: true,
        cancelable: true,
      })
    );
  }
}

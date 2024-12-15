import SonicVibeEvents from "../events";
import { MediaType, SonicVibeMedia } from "../models/default-options";
import { addStylesheet, checkMediaFile } from "../utils/functions";

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
    this.src = this.elementDefaultAttribute("src");
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
        import("../utils/events").then((module) => {
          module.default(this);
          Object.freeze(window.player);
        });
      }
    );

    this.initiatePlayer();

    addStylesheet("styles");
  }

  initiatePlayer() {
    const mediaFileType = checkMediaFile(this.src);
    if (!mediaFileType) {
      return false;
    }
    if (mediaFileType === MediaType.video) {
      import("../utils/video-player/video-player").then((module) => {
        module.default(this);
      });
    } else {
      this.triggerEvent(SonicVibeEvents.error, {
        message: "Invalid Media File",
      });
    }
    return true;
  }

  elementDefaultAttribute<T>(property: string): T {
    return this.hasAttribute(property)
      ? this.getAttribute(property)
      : Object.getOwnPropertyDescriptor(this, property)?.value;
  }

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

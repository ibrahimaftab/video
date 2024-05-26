import { addStylesheet, checkMediaFile } from "../utils/functions";

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
   * The video DOM HTML.
   * @type {HTMLVideoElement | undefined}
   */
  video: HTMLVideoElement | undefined;

  /**
   * The audio DOM HTML.
   * @type {HTMLAudioElement | undefined}
   */
  audio: HTMLAudioElement | undefined;

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
    this.video = undefined;
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
    if (this.src && checkMediaFile(this.src)) {
      const src = this.src;
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
        this.video = video;
        this.addEventListener("wheel", (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (this.video) {
            if (e.deltaX < -5 || e.deltaX > 5) {
              this.video.currentTime -= e.deltaX * 0.1;
            }
          }
        });
        this.addEventListener("click", () => {
          if (this.video?.played) {
            this.video?.paused ? this.video?.play() : this.video.pause();
          }
        });
        this.append(this.video);
        if (this.bar) {
          const SonicVibeBar = await (await import("./SonicVibeBar")).default;
          const bar = new SonicVibeBar();
          this.append(play, pause, timer, bar);
        }
      })();
    } else {
      (async () => {
        const SonicVibeError = await (await import("./SonicVibeError")).default;
        this.append(new SonicVibeError(this.error));
      })();
    }
  }
}

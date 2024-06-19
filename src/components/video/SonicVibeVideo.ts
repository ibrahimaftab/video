import SonicVibeEvents from "../../events";
import {
  addStylesheet,
  checkBooleanString,
  elementDefaultAttribute,
  triggerEvent,
} from "../../utils/functions";
import SonicVibe from "../SonicVibe";

export default class SonicVibeVideo extends HTMLElement {
  player: SonicVibe;

  constructor() {
    super();
    this.player = this.parentElement as SonicVibe;
    this.setupPlayer();
    this.setupEventListeners();
  }

  private setupPlayer() {
    addStylesheet("player");
    const media = document.createElement("video");
    this.configureMedia(media);
    this.append(media);
  }

  private configureMedia(media: HTMLVideoElement) {
    media.src = this.player.getAttribute("src") ?? "";
    media.autoplay = checkBooleanString(this.player.autoplay);
    media.playsInline = checkBooleanString(this.player.playsInline);
    media.muted = checkBooleanString(this.player.muted);
    media.controls = false;
    media.preload = "metadata";
    media.style.width = this.player.width;
    media.style.aspectRatio = this.player.aspectRatio;
    this.player.media = media;
  }

  private setupEventListeners() {
    if (!this.player.media) return;
    this.player.media.addEventListener("loadedmetadata", () => {
      triggerEvent(SonicVibeEvents.ready, this.player, {});
    });

    this.player.media.addEventListener("error", (e) => {
      const error = (e.target as HTMLVideoElement).error;
      triggerEvent(SonicVibeEvents.error, this.player, error);
    });

    this.player.addEventListener(SonicVibeEvents.ready, () =>
      this.createControl()
    );

    this.player.addEventListener("click", () => {
      if (this.player.media?.played && !this.player.mouseDragged) {
        const event = this.player.media?.paused
          ? SonicVibeEvents.play
          : SonicVibeEvents.pause;
        triggerEvent(event, this.player);
      }
    });
  }

  private createControl() {
    if (elementDefaultAttribute("control", this.player)) {
      this.insertAdjacentHTML(
        "beforeend",
        "<sonic-vibe-video-bar></sonic-vibe-video-bar>"
      );
    }
    if (elementDefaultAttribute("overflowButtons", this.player)) {
      import("./SonicVibeVideoOverflowIcons").then(
        (module) => new module.default(this.player)
      );
    }
    if (elementDefaultAttribute("cursor", this.player)) {
      import("./SonicVibeVideoCursor").then(
        (module) => new module.default(this.player)
      );
    }
  }
}

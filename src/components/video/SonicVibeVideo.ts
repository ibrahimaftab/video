import SonicVibeEvents from "../../events";
import {
  addStylesheet,
  elementDefaultAttribute,
  triggerEvent,
} from "../../utils/functions";
import type SonicVibe from "../SonicVibe";

export default class SonicVibeVideo extends HTMLElement {
  private _player = this.parentElement as SonicVibe;
  private _video = document.createElement("video");

  constructor() {
    super();
    addStylesheet("player");
    this._video.style.aspectRatio = elementDefaultAttribute(
      "aspectRatio",
      this._player
    );
    this._video.style.width = elementDefaultAttribute("width", this._player);
    this._video.src = this._player.getAttribute("src") ?? "";
    this._video.autoplay = elementDefaultAttribute("autoplay", this._player);
    this._video.playsInline = elementDefaultAttribute(
      "playsInline",
      this._player
    );
    this._video.muted = elementDefaultAttribute("muted", this._player);
    this._video.controls = false;
    this._player.removeAttribute("src");
    this._player.removeAttribute("muted");
    this._player.removeAttribute("width");
    this.append(this._video);

    this._video.addEventListener("loadedmetadata", () => {
      triggerEvent(SonicVibeEvents.ready, this._player, this._video);
    });
    this._video.addEventListener("error", (e) => {
      const error = (e.target as HTMLVideoElement).error;
      triggerEvent(SonicVibeEvents.error, this._player, error);
    });
    this._player.addEventListener(SonicVibeEvents.ready, () =>
      this.createControl()
    );
  }

  createControl() {
    if (elementDefaultAttribute("control", this._player)) {
      this.insertAdjacentHTML(
        "beforeend",
        "<sonic-vibe-video-bar></sonic-vibe-video-bar>"
      );
    }
  }
}

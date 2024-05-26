import { addStylesheet } from "../utils/functions";
import type SonicVibe from "./SonicVibe";

export default class SonicVibeTimeline extends HTMLElement {
  player: SonicVibe;
  timeline = document.createElement("span");

  constructor() {
    super();
    this.player = this.parentElement?.parentElement as SonicVibe;
  }

  connectedCallback() {
    addStylesheet("timeline");
    const video = this.player.video;
    this.append(this.canvas);

    if (video) {
    }
  }
}

import { addStylesheet, elementDefaultAttribute } from "../../utils/functions";
import type SonicVibe from "../SonicVibe";

export default class SonicVibeBar extends HTMLElement {
  timeline = 0;
  playButton = null;
  constructor(timeline = 0) {
    super();
    this.timeline = timeline;
  }

  connectedCallback() {
    addStylesheet("control");
    const player = this.parentElement?.parentElement as SonicVibe;
    const media = player.media;
    const enableTimeline = elementDefaultAttribute<SonicVibe, Boolean>(
      "timeline",
      player
    );
    const enableButtons = elementDefaultAttribute<SonicVibe, Boolean>(
      "buttons",
      player
    );
    if (!media) return;

    this.createPlayerBarConfig(player);

    // Create Player Bar Buttons if enabled
    if (enableButtons) {
      import("./SonicVibeBarButtons").then(
        (module) => new module.default(this, media)
      );
    }

    // Create Player Bar Timeline if enabled
    if (enableTimeline) {
      import("./SonicVibeBarTimeline").then(
        (module) => new module.default(this, media)
      );
    }
  }

  // Create Player Bar Configuration
  createPlayerBarConfig(player: SonicVibe) {
    let previewTimeout: null | number = null;
    player.addEventListener("mousemove", () => {
      this.classList.add("preview");
      if (previewTimeout) clearTimeout(previewTimeout);
      previewTimeout = setTimeout(() => this.classList.remove("preview"), 3e3);
    });
  }
}

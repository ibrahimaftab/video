import SonicVibe from "./components/SonicVibe";
import SonicVibeError from "./components/SonicVibeError";
import type SonicVibeOps from "./models/players";

declare global {
  interface Window {
    player: SonicVibeOps;
  }
  const player: SonicVibeOps;
}

Object.defineProperty(window, "player", {
  value: {},
  writable: false, // Cannot be changed
  enumerable: false, // Does not show up in for...in loop or Object.keys()
  configurable: false, // Cannot be deleted or redefined
});

customElements.define("sonic-vibe", SonicVibe);
// customElements.define("sonic-vibe-video", SonicVibeVideo);
// customElements.define("sonic-vibe-video-bar", SonicVibeVideoBar);
customElements.define("sonic-vibe-error", SonicVibeError);

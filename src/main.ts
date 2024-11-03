import SonicVibe from "./components/SonicVibe";
import SonicVibeError from "./components/SonicVibeError";

type SonicVibeOps = {
  [key: string]: {
    instance: SonicVibe;
    functions: {
      click: Array<() => void>;
      mousemove: Array<() => void>;
      mouseleave: Array<() => void>;
    };
  };
};

declare global {
  interface Window {
    player: SonicVibeOps;
  }
  const player: SonicVibeOps;
}

window.player = {};

customElements.define("sonic-vibe", SonicVibe);
// customElements.define("sonic-vibe-video", SonicVibeVideo);
// customElements.define("sonic-vibe-video-bar", SonicVibeVideoBar);
customElements.define("sonic-vibe-error", SonicVibeError);

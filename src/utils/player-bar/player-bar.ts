import sonicVibeProxy from "../global";
import createButtons from "./player-bar-buttons";
import addTimeline from "./timeline";

const playerBar = (id: string) => {
  const player = sonicVibeProxy.instance[id];
  const enableTimeline = player.elementDefaultAttribute("timeline");
  const enableButtons = player.elementDefaultAttribute("buttons");
  const plaberBarElement = document.createElement("div");
  const playerBarId = `sonic-vibe-bar-${id}`;
  plaberBarElement.classList.add("sonic-vibe-bar");
  plaberBarElement.id = playerBarId;
  let previewTimeout: null | number = null;
  sonicVibeProxy.mousemove[id] = () => {
    player.classList.add("preview");
    if (previewTimeout) clearTimeout(previewTimeout);
    previewTimeout = setTimeout(() => player.classList.remove("preview"), 6e3);
  };
  // Create Player Bar Buttons if enabled
  if (enableButtons) {
    createButtons(id, plaberBarElement);
  }

  // // Create Player Bar Timeline if enabled
  if (enableTimeline) {
    addTimeline(id, plaberBarElement);
  }

  player.appendChild(plaberBarElement);
  import("../functions").then((module) => module.addStylesheet("control"));
};
export default playerBar;

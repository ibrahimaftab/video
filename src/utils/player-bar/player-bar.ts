import addTimeline from "./timeline";

const playerBar = (id: string) => {
  const enableTimeline =
    player[id].instance.elementDefaultAttribute("timeline");
  const enableButtons = player[id].instance.elementDefaultAttribute("buttons");
  const plaberBarElement = document.createElement("div");
  plaberBarElement.classList.add("sonic-vibe-bar");
  let previewTimeout: null | number = null;
  player[id].instance.addEventListener("mousemove", () => {
    player[id].instance.classList.add("preview");
    if (previewTimeout) clearTimeout(previewTimeout);
    previewTimeout = setTimeout(
      () => player[id].instance.classList.remove("preview"),
      3e3
    );
  });
  // Create Player Bar Buttons if enabled
  // if (enableButtons) {
  //   import("./SonicVibeBarButtons").then(
  //     (module) => new module.default(this, media)
  //   );
  // }

  // // Create Player Bar Timeline if enabled
  if (enableTimeline) {
    addTimeline(id, plaberBarElement);
  }

  player[id].instance.appendChild(plaberBarElement);
  import("../functions").then((module) => module.addStylesheet("control"));
};
export default playerBar;

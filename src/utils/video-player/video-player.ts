import SonicVibeEvents from "../../events";
import { checkBooleanString } from "../functions";
import type SonicVibe from "../../components/SonicVibe";

const videoPlayer = async (playerInstance: SonicVibe) => {
  const id = playerInstance.id;
  player[id] = {
    instance: playerInstance,
    functions: {
      click: [],
      mousemove: [],
      mouseleave: [],
    },
  };
  createVideoWithConfig(id);
  setupEventListeners(id);
  import("../functions").then((module) => module.addStylesheet("player"));
};

const createVideoWithConfig = (id: string) => {
  const { src, autoplay, playsInline, muted, width, aspectRatio } =
    player[id].instance;
  player[id].instance.media = Object.assign(document.createElement("video"), {
    src,
    autoplay: checkBooleanString(autoplay),
    playsInline: checkBooleanString(playsInline),
    muted: checkBooleanString(muted),
    controls: false,
    preload: "metadata",
    style: { "--width": width, "--aspectRatio": aspectRatio },
  });
  player[id].instance.append(player[id].instance.media);
};

const setupEventListeners = (id: string) => {
  player[id].instance.media.addEventListener("loadedmetadata", () =>
    player[id].instance.triggerEvent(SonicVibeEvents.ready, {})
  );

  player[id].instance.media.addEventListener("error", (e) =>
    player[id].instance.triggerEvent(
      SonicVibeEvents.error,
      (e.target as HTMLVideoElement).error
    )
  );

  if (player[id].instance.playerbar) {
    player[id].instance.addEventListener(SonicVibeEvents.ready, () => {
      import("../player-bar/player-bar").then((module) => module.default(id));
    });
  }

  player[id].instance.addEventListener("click", () => {
    if (
      player[id].instance.media?.played &&
      !player[id].instance.mouseDragged
    ) {
      const event = player[id].instance.media?.paused
        ? SonicVibeEvents.play
        : SonicVibeEvents.pause;
      player[id].instance.triggerEvent(event, player[id]);
    }
  });
};

export default videoPlayer;

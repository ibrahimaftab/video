import SonicVibeEvents, { SonicVibeEventsOps } from "../../events";
import { checkBooleanString } from "../functions";
import type SonicVibe from "../../components/SonicVibe";
import sonicVibeProxy from "../global";

const videoPlayer = async (playerInstance: SonicVibe) => {
  const id = playerInstance.id;
  sonicVibeProxy.instance[id] = playerInstance;
  player[id] = {
    instance: playerInstance,
    functions: {
      [SonicVibeEventsOps.click]: {},
      [SonicVibeEventsOps.play]: {},
      [SonicVibeEventsOps.pause]: {},
      [SonicVibeEventsOps.keydown]: {},
      [SonicVibeEventsOps.mouseenter]: {},
      [SonicVibeEventsOps.mouseleave]: {},
      [SonicVibeEventsOps.mousemove]: {},
      [SonicVibeEventsOps.mousedown]: {},
      [SonicVibeEventsOps.mouseup]: {},
    },
  };
  createVideoWithConfig(id);
  setupEventListeners(id);
  import("../functions").then((module) => module.addStylesheet("player"));
};

function createVideoWithConfig(id: string) {
  const player = sonicVibeProxy.instance[id];
  const { src, autoplay, playsInline, muted, width, aspectRatio } = player;
  const video = Object.assign(document.createElement("video"), {
    src,
    autoplay: checkBooleanString(autoplay),
    playsInline: checkBooleanString(playsInline),
    muted: checkBooleanString(muted),
    controls: false,
    preload: "metadata",
    style: { "--width": width, "--aspectRatio": aspectRatio },
  });
  sonicVibeProxy.media[id] = video;
  player.append(video);
}

const setupEventListeners = (id: string) => {
  const player = sonicVibeProxy.instance[id];
  const media = sonicVibeProxy.media[id];
  media.addEventListener("loadedmetadata", () =>
    player.triggerEvent(SonicVibeEvents.ready, {})
  );

  media.addEventListener("error", (e) =>
    player.triggerEvent(
      SonicVibeEvents.error,
      (e.target as HTMLVideoElement).error
    )
  );

  if (player.playerbar) {
    player.addEventListener(SonicVibeEvents.ready, () => {
      import("../player-bar/player-bar").then((module) => module.default(id));
    });
  }

  sonicVibeProxy.click[id] = () => {
    if (media?.played && !player.mouseDragged) {
      const event = media?.paused
        ? SonicVibeEvents.play
        : SonicVibeEvents.pause;
      player.triggerEvent(event, player);
    }
  };
  sonicVibeProxy.keydown[id] = (e: KeyboardEvent) => {
    if (e.key === "i") {
      if (document.pictureInPictureElement?.parentElement?.id !== id)
        (media as HTMLVideoElement).requestPictureInPicture();
      else document.exitPictureInPicture();
    }
  };
};

export default videoPlayer;

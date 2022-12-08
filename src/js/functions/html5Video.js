import { checkVideoBuffer, triggerEvent } from "../utils.js";
import events from "../events.js";

export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = (player) => {
  player.addEventListener(
    events.videoReady,
    function () {
      player.playerbar.addEventListener(
        "playerbar-initial-ready",
        function () {
          triggerEvent(events.playable, player);
        }
      );
      player.playerbar.initiate()
    },
    false
  );

  triggerEvent(events.initiate, player);
};

export default html5Video;

import { checkVideoBuffer, triggerEvent } from "../utils.js";
import events from "../events.js";

export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = (player, url) => {
  player.video.src = url;
  player.video.addEventListener(
    'loadeddata',
    function () {
     triggerEvent(events.initiate, player);
    },
    false
  );
  player.addEventListener(events.videoReady, () => {
    player.playerbar.initiate();
    triggerEvent(events.initiated, player);
  });
  player.video.addEventListener('waiting', () => {
    triggerEvent(events.loading, player)
  })
  player.video.addEventListener("playing", () => {
    triggerEvent(events.loaded, player);
  });
};

export default html5Video;

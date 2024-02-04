import events from "../events";
import { triggerEvent } from "../utils";

export default async function (player, url) {
  const { video } = player;
  const videoSrc = url;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      triggerEvent(events.initiate, player);
    });
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    player.hlsjs = hls;
    let initiate = false;
    hls.on(Hls.Events.LEVEL_UPDATED, function (event) {
      if (!initiate) {
        initiate = true;
        triggerEvent(events.loaded, player);
        player.live = event.details.live;
        triggerEvent(events.initiated, player);
      }
    });
    hls.on(Hls.Events.LEVEL_SWITCHING, function () {
      // triggerEvent(events.loading, player);
    });
    hls.on(Hls.Events.LEVEL_SWITCHED, function () {
      triggerEvent(events.loaded, player);
    });
    hls.on(Hls.Events.BUFFER_CREATED, function () {
      player.levels = hls.levels;
      triggerEvent("hlsBufferCreated", player);
    });
    hls.on(Hls.Events.BUFFER_FLUSHED, function () {
      triggerEvent(events.loaded, player);
    });
    hls.on(Hls.Events.BUFFER_FLUSHING, function () {
      triggerEvent(events.loading, player);
    });
    hls.on(Hls.Events.BUFFER_APPENDED, function () {
      triggerEvent(events.loaded, player);
    });
    player.video.addEventListener("loadedmetadata", function () {
      if (player?.playerbar) {
        player.playerbar.addEventListener(
          "playerbar-initial-ready",
          function () {
            triggerEvent(events.dynamicHlsJs, player);
          }
        );
        player.playerbar.initiate();
      }
    });
    video.addEventListener("waiting", () => {
      triggerEvent(events.loading, player);
    });
    video.addEventListener("playing", () => {
      triggerEvent(events.loaded, player);
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
  } else {
    return null;
  }
}

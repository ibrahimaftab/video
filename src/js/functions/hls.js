import events from "../events"
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
      }
    });
     hls.on(Hls.Events.LEVEL_SWITCHING, function () {
       triggerEvent(events.loading, player);
     });
    hls.on(Hls.Events.LEVEL_SWITCHED, function () {
      triggerEvent(events.loaded, player);
    });
    player.addEventListener(events.videoReady, function() {
      triggerEvent(events.dynamicHlsJs, player)
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
  } else {
    return null
  }
}
import events from "../events"
import { triggerEvent } from "../utils";

export default async function (player, url) {
  const { video } = player;
  const videoSrc = url;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      triggerEvent(events.dynamicHlsJs, player);
      triggerEvent(events.initiated, player);
    });
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    player.hlsjs = hls;
    hls.on(Hls.Events.LEVEL_UPDATED, function () {
      triggerEvent(events.loaded, player);
    });
     hls.on(Hls.Events.LEVEL_SWITCHING, function () {
       triggerEvent(events.loading, player);
     });
    hls.on(Hls.Events.LEVEL_SWITCHED, function () {
      triggerEvent(events.loaded, player);
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
  } else {
    return null
  }
}
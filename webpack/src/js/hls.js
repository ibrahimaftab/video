export default async function (player, url) {
  const { triggerEvent } = await import("./utils.js");
  const events = await import("./events");
  const { video } = player;
  const videoSrc = url;
  console.log({ Hls });
  console.log({ events: Hls.Events });
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      triggerEvent(events.default.dynamicHlsJs, player);
    });
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    player.hlsjs = hls;
    hls.on(Hls.Events.LEVEL_UPDATED, function () {
      triggerEvent(events.default.loaded, player);
    });
     hls.on(Hls.Events.LEVEL_SWITCHING, function () {
       triggerEvent(events.default.loading, player);
     });
    hls.on(Hls.Events.LEVEL_SWITCHED, function () {
      triggerEvent(events.default.loaded, player);
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
  } else {
    return null
  }
}
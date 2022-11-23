export default async function (player, url) {
  const { triggerEvent } = await import("./utils.js");
  const events = await import("./events.js");
  const { video } = player;
  const videoSrc = url;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    player.hlsjs = hls;
    hls.on(Hls.Events.LEVEL_UPDATED, async function (name, event) {
      triggerEvent(events.default.loaded, player);
    });
     hls.on(Hls.Events.LEVEL_SWITCHING, async function (name, event) {
       triggerEvent(events.default.loading, player);
     });
    hls.on(Hls.Events.LEVEL_SWITCHED, async function (name, event) {
      triggerEvent(events.default.loaded, player);
    });

    triggerEvent(events.default.dynamicHlsJs, player)
    
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
  } else {
    return null
  }
}

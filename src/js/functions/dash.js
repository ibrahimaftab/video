export default async function (player, url) {
  const events = await import('../events.js')
  const { triggerEvent } = await import("../utils.js");
    const { video } = player;
  player.dashjs = dashjs.MediaPlayer().create();
  const vdo = player.dashjs;
  vdo.initialize(video, url, true);
  triggerEvent(events.default.dynamicDashJs, player)
  vdo.on(dashjs.MediaPlayer.events.BUFFER_EMPTY, function () {
    triggerEvent(events.default.loading, player);
  });
  vdo.on(dashjs.MediaPlayer.events.BUFFER_LOADED, function () {
    triggerEvent(events.default.loaded, player);
  });
}

import events from "../events"
import { triggerEvent } from "../utils.js";

export default function (player, url) {
    const { video } = player;
  player.dashjs = dashjs.MediaPlayer().create();
  const vdo = player.dashjs;
  vdo.initialize(video, url, true);
  triggerEvent(events.dynamicDashJs, player)
  vdo.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function () {
    triggerEvent(events.initiated, player);
  });
  vdo.on(dashjs.MediaPlayer.events.BUFFER_EMPTY, function () {
    triggerEvent(events.loading, player);
  });
  vdo.on(dashjs.MediaPlayer.events.BUFFER_LOADED, function () {
    triggerEvent(events.loaded, player);
  });

}

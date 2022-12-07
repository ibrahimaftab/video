import { checkVideoBuffer, triggerEvent } from "../utils.js";
import events from "../events.js";

export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = (element) => {
  checkVideoBuffer(element);
  triggerEvent(events.initiated, player)
};

export default html5Video;

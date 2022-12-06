import events from "../events.js";
import { triggerEvent, checkVideoBuffer } from "../utils.js";

export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = async (element) => {
  checkVideoBuffer(element);
  triggerEvent(events.playable, element);
};

export default html5Video;

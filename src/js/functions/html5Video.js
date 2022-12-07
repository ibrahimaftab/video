import { checkVideoBuffer, triggerEvent } from "../utils.js";
import events from "../events.js";

export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = (element) => {
  element.addEventListener(
    events.videoReady,
    function () {  
      element
        ?.querySelector("vm-playerbar")
        .addEventListener("playerbar-initiate", function () {
          triggerEvent(events.playable, element);
        });
      !element?.querySelector("vm-playerbar") &&
        triggerEvent(events.playable, element);
    },
    false
  );

  triggerEvent(events.initiate, element);
};

export default html5Video;

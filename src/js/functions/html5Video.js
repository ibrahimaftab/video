export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = async (element) => {
  const { triggerEvent, checkVideoBuffer } = await import("../utils.js");
  const evts = await import("../events.js");
  checkVideoBuffer(element);
  setTimeout(() => {
    triggerEvent(evts.default.playable, element);
  }, 200);
};

export default html5Video;

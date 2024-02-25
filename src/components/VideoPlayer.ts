import { addStylesheet } from "../utils/functions";
import type SonicVibe from "./SonicVibe";

export default class VideoPlayer {
  static createVideo(options: VideoOptions): HTMLVideoElement {
    addStylesheet("player");
    const video = document.createElement("video");
    video.style.aspectRatio = options.aspectRatio;
    video.style.width = "100%";
    video.src = options.src;
    video.autoplay = options.autoplay;
    video.playsInline = options.playsInline;
    video.muted = options.muted;
    video.controls = false;

    video.addEventListener("error", (e) => {
      const element = e.target as HTMLVideoElement;
      const sonicVibe = video.parentElement as SonicVibe;
      const error = new Event("error");

      if (element.error?.message?.length)
        sonicVibe.error = element.error.message;

      video.parentElement?.dispatchEvent(error);
    });
    return video;
  }
}

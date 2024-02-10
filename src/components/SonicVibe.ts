import { checkMediaFile } from "../utils/functions";
import SonicVibeError from "./SonicVibeError";

export default class SonicVibe extends HTMLElement {
  private src: string | null | undefined = null;
  private video: HTMLVideoElement | undefined;
  private aspectRatio = "16/9";
  private autoplay: string = "true";
  private muted: string = "false";
  private playsInline: string = "true";
  private width: string = "800";
  error: string = "No Video File Found";

  constructor() {
    super();
    this.video = undefined;
  }

  connectedCallback() {
    this.initiateVideo();

    this.addEventListener("error", () => {
      this.innerHTML = "";
      this.append(new SonicVibeError(this.error));
    });
  }

  initiateVideo() {
    this.src = this.getAttribute("src");
    this.aspectRatio = this.getAttribute("aspectRatio") || this.aspectRatio;
    this.autoplay = this.getAttribute("autoplay") || this.autoplay;
    this.muted = this.getAttribute("muted") || this.muted;
    this.width = this.getAttribute("width") || this.width;
    this.style.aspectRatio = this.aspectRatio;
    this.style.width = +this.width + "px";
    const self = this;
    if (self.src && checkMediaFile(self.src)) {
      const src = self.src;
      (async () => {
        const VideoPlayer = await (await import("./VideoPlayer")).default;
        self.video = VideoPlayer.createVideo({
          src,
          aspectRatio: self.aspectRatio,
          autoplay: self.autoplay == "true",
          muted: self.muted == "true",
          playsInline: self.playsInline == "true",
        });
        self.append(self.video);
      })();
    } else {
      this.append(new SonicVibeError());
    }
  }
}

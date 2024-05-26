import {
  addStylesheet,
  calculateBufferedDuration,
  formatVideoDuration,
} from "../utils/functions";
import SonicVibe from "./SonicVibe";

export default class SonicVibeBar extends HTMLElement {
  timeline = 0;
  constructor(timeline = 0) {
    super();
    this.timeline = timeline;
  }

  connectedCallback() {
    addStylesheet("bar");
    const player = this.parentElement as SonicVibe;
    const media = player.video ?? player.audio;
    this.style.setProperty("--sonic-vibe-timeline", "0px");

    media?.addEventListener("timeupdate", async () => {
      // alert(video.currentTime / video.duration);
      this.style.setProperty(
        "--sonic-vibe-timeline",
        (media.currentTime / media.duration) * 100 + "%"
      );
      this.style.setProperty(
        "--sonic-vibe-timeline-current",
        `\"${formatVideoDuration(media.currentTime)}\"`
      );
      if (!this.style.getPropertyValue("--sonic-vibe-timeline-duration")) {
        this.style.setProperty(
          "--sonic-vibe-timeline-duration",
          `\"${formatVideoDuration(media.duration)}\"`
        );
      }
    });
    this.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (media) {
        media.currentTime =
          (e.clientX / this.getBoundingClientRect().width) * media?.duration;
        this.style.setProperty(
          "--sonic-vibe-timeline-buffered",
          (media.currentTime / media.duration) * 100 + "%"
        );
        this.style.setProperty(
          "--sonic-vibe-timeline",
          (media.currentTime / media.duration) * 100 + "%"
        );

        if (e.clientX > this.getBoundingClientRect().width - 100)
          alert("testing");
      }
    });
    let previewTimeout: null | number = null;
    player.addEventListener("mousemove", () => {
      this.classList.add("preview");
      if (previewTimeout) clearTimeout(previewTimeout);
      previewTimeout = setTimeout(() => this.classList.remove("preview"), 3e3);
    });
    player.addEventListener("wheel", (e) => {
      if (e.deltaX < -10 || e.deltaX > 10) {
        this.classList.add("preview");
        if (media)
          this.style.setProperty(
            "--sonic-vibe-timeline",
            (media.currentTime / media.duration) * 100 + "%"
          );
      }
    });
    media?.addEventListener("progress", () => {
      this.style.setProperty(
        "--sonic-vibe-timeline-buffered",
        (calculateBufferedDuration(media) / media.duration) * 100 + "%"
      );
    });
  }
}

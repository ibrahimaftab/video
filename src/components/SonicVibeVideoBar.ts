import SonicVibeEvents from "../events";
import {
  addStylesheet,
  calculateBufferedDuration,
  formatVideoDuration,
  triggerEvent,
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
    const media = player.media;
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

      if (this.classList.contains("timer-remaining")) {
        this.style.setProperty(
          "--sonic-vibe-timeline-duration",
          `\"-${formatVideoDuration(media.duration - media.currentTime)}\"`
        );
      } else {
        this.style.setProperty(
          "--sonic-vibe-timeline-duration",
          `\"${formatVideoDuration(media.duration)}\"`
        );
      }
      triggerEvent(SonicVibeEvents.progress, player);
    });
    this.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (media) {
        const boundingBox = this.getBoundingClientRect();
        if (
          e.clientX > boundingBox.width - 60 &&
          e.clientX < boundingBox.width - 9 &&
          e.clientY > boundingBox.y - 30 &&
          e.clientY < boundingBox.y + boundingBox.height - 9
        ) {
          this.classList.toggle("timer-remaining");
          return;
        }
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
      }
    });
    let previewTimeout: null | number = null;
    player.addEventListener("mousemove", () => {
      this.classList.add("preview");
      if (previewTimeout) clearTimeout(previewTimeout);
      previewTimeout = setTimeout(() => this.classList.remove("preview"), 3e3);
    });
    const playerScrollHandler = () => {
      if (media?.played) {
        this.style.setProperty(
          "--sonic-vibe-timeline",
          (media?.currentTime / media?.duration) * 100 + "%"
        );
        this.style.setProperty(
          "--sonic-vibe-timeline-current",
          `\"${formatVideoDuration(media.currentTime)}\"`
        );
      }
    };
    player.addEventListener(SonicVibeEvents.forward, playerScrollHandler);
    player.addEventListener(SonicVibeEvents.backward, playerScrollHandler);
    media?.addEventListener("progress", () => {
      this.style.setProperty(
        "--sonic-vibe-timeline-buffered",
        (calculateBufferedDuration(media) / media.duration) * 100 + "%"
      );
    });
  }
}

import SonicVibeEvents from "../../events";
import type { SonicVibeMedia } from "../../models/default-options";
import {
  calculateBufferedDuration,
  formatVideoDuration,
  triggerEvent,
} from "../../utils/functions";
import type SonicVibe from "../SonicVibe";
import type SonicVibeBar from "./SonicVibeBar";

export default class SonicVibeBarTimeline {
  private player!: SonicVibe;
  private playerBar!: SonicVibeBar;
  private media!: SonicVibeMedia;
  private timeline!: HTMLDivElement;
  constructor(playerBar: SonicVibeBar, media: SonicVibeMedia) {
    this.playerBar = playerBar;
    this.player = playerBar.parentElement as SonicVibe;
    this.media = media;
    this.createTimeline();
  }
  // Create Player Bar Timeline
  createTimeline() {
    const { media, player, playerBar } = this;
    this.timeline = document.createElement("div");
    this.timeline.classList.add("timeline");
    this.timeline.style.setProperty("--sonic-vibe-timeline", "0px");

    // Update timeline progress on video timeupdate
    media.addEventListener("timeupdate", async () => {
      // alert(video.currentTime / video.duration);
      this.timeline.style.setProperty(
        "--sonic-vibe-timeline",
        (media.currentTime / media.duration) * 100 + "%"
      );
      this.timeline.style.setProperty(
        "--sonic-vibe-timeline-current",
        `\"${formatVideoDuration(media.currentTime)}\"`
      );

      if (this.timeline.classList.contains("timer-remaining")) {
        this.timeline.style.setProperty(
          "--sonic-vibe-timeline-duration",
          `\"-${formatVideoDuration(media.duration - media.currentTime)}\"`
        );
      } else {
        this.timeline.style.setProperty(
          "--sonic-vibe-timeline-duration",
          `\"${formatVideoDuration(media.duration)}\"`
        );
      }
      triggerEvent(SonicVibeEvents.progress, player);
    });

    // Change video timeline progress on timeline click
    this.timeline.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const boundingBox = playerBar.getBoundingClientRect();
      if (
        e.clientX > boundingBox.width - 60 &&
        e.clientX < boundingBox.width - 9 &&
        e.clientY > boundingBox.y - 30 &&
        e.clientY < boundingBox.y + boundingBox.height - 9
      ) {
        this.timeline.classList.toggle("timer-remaining");
        return;
      }
      media.currentTime =
        (e.clientX / this.timeline.getBoundingClientRect().width) *
        media.duration;
      this.timeline.style.setProperty(
        "--sonic-vibe-timeline-buffered",
        (media.currentTime / media.duration) * 100 + "%"
      );
      this.timeline.style.setProperty(
        "--sonic-vibe-timeline",
        (media.currentTime / media.duration) * 100 + "%"
      );
    });

    const playerScrollHandler = () => {
      if (media.played) {
        this.timeline.style.setProperty(
          "--sonic-vibe-timeline",
          (media.currentTime / media.duration) * 100 + "%"
        );
        this.timeline.style.setProperty(
          "--sonic-vibe-timeline-current",
          `\"${formatVideoDuration(media.currentTime)}\"`
        );
      }
    };
    player.addEventListener(SonicVibeEvents.forward, playerScrollHandler);
    player.addEventListener(SonicVibeEvents.backward, playerScrollHandler);
    media.addEventListener("progress", () => {
      this.timeline.style.setProperty(
        "--sonic-vibe-timeline-buffered",
        (calculateBufferedDuration(media) / media.duration) * 100 + "%"
      );
    });

    this.playerBar.append(this.timeline);
  }
}

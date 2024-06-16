import SonicVibeEvents from "../../events";
import SonicVibe from "../SonicVibe";

export default class SonicVibeCursor {
  player!: SonicVibe;
  constructor(player: SonicVibe) {
    this.player = player;
    this.create();
  }

  clearCursorText() {
    setTimeout(() => {
      this.player.style.removeProperty("--sonic-vibe-cursor-text");
      this.player.classList.remove("trigger");
    }, 5e2);
  }

  create() {
    this.player.classList.add("sonic-vibe-video-cursor");
    const handleOnForward = () => {
      this.player.style.setProperty("--sonic-vibe-cursor-text", `"Forward"`);
      this.clearCursorText();
    };
    const handleOnBackward = () => {
      this.player.style.setProperty("--sonic-vibe-cursor-text", `"Backward"`);
      this.clearCursorText();
    };

    this.player.addEventListener(SonicVibeEvents.forward, handleOnForward);
    this.player.addEventListener(SonicVibeEvents.backward, handleOnBackward);

    let mouseDragged = 0;

    this.player.addEventListener("mouseup", (e) => {
      const calc = e.clientX - mouseDragged;

      if (calc != 0 && (calc > 10 || calc < -10))
        this.player.media.currentTime += calc;
      else this.player.mouseDragged = false;

      setTimeout(() => {
        this.player.mouseDragged = false;
      });
    });

    this.player.addEventListener("mousedown", (e) => {
      this.player.mouseDragged = true;
      mouseDragged = e.clientX;
    });

    this.player.addEventListener("mouseenter", (e) => {
      this.player.style.setProperty("--sonic-vibe-cursor-x", e.clientX + "px");
      this.player.style.setProperty("--sonic-vibe-cursor-y", e.clientY + "px");
    });

    this.player.addEventListener("mousemove", (e) => {
      this.player.style.setProperty("--sonic-vibe-cursor-x", e.clientX + "px");
      this.player.style.setProperty("--sonic-vibe-cursor-y", e.clientY + "px");
    });

    let cursortimerTimeOut: null | number = null;
    const handleOnClick = () => {
      this.player.classList.add("trigger");
      if (cursortimerTimeOut) clearTimeout(cursortimerTimeOut);
      cursortimerTimeOut = setTimeout(() => {
        this.player.style.removeProperty("--sonic-vibe-cursor-text");
        this.player.classList.remove("trigger");
      }, 5e2);
    };

    this.player.addEventListener(SonicVibeEvents.play, () => {
      this.player.style.setProperty("--sonic-vibe-cursor-text", `"Play"`);
      handleOnClick();
    });
    this.player.addEventListener(SonicVibeEvents.pause, () => {
      this.player.style.setProperty("--sonic-vibe-cursor-text", `"Pause"`);
      handleOnClick();
    });
  }
}

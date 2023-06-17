import events, { keyTriggerEvent } from "../events";
import {
  playPauseIcon,
  forwardIcon,
  rewindIcon,
  muteIcon,
  audioIcon,
} from "../icons";
import "../../css/player.css";
import { triggerEvent } from "../utils.js";

export default class Player extends HTMLElement {
  static unactivePlayer;
  #settings;
  #unactivePlayer = null;
  video = document.createElement("video");
  playerbar = null;
  loader = null;
  overlayplay = document.createElement("overlayplay");
  beforePlay = null;
  pictureInPicture = null;
  #userTrigger = null;
  pictureInPictureDisable = null;
  autoplay = false
  adsActive = false
  loop = false

  constructor() {
    super();
    this.#settings = this.parentElement.videoManiaConfig;
    this.pictureInPictureDisable = this.#settings.disablePictureInPictureMode;
    this.tabIndex = 0;
    this.autoplay = this.#settings.autoplay
    this.loop = this.#settings.loop;

    const style = `<style id='videomania-style'>
      @layer base {
        ${this.#settings.selector} vm-player {
          width: ${this.#settings.width}px;
          height: ${this.#settings.height}px;
        }
      }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style);
    this.overlayplay.classList.add('active')
    this.overlayplay.innerHTML = playPauseIcon;
  }

  async togglePlayer() {
    this.#unactivePlayer && clearTimeout(this.#unactivePlayer);
    this.classList.add("active");
    triggerEvent(events.playerActive, this);
    this.#unactivePlayer = setTimeout(() => {
      this.classList.remove("active");
      triggerEvent(events.playerUnActive, this);
    }, 5e3);
  }

  userTrigger(value) {
    this.#userTrigger = value;
  }

  qaulitiesList() {
    return this.#settings.qualities;
  }

  subtitleList() {
    return {
      list: this.#settings.subtitles,
      toggleSubtitle: this.#settings.toggleSubtitle,
    };
  }

  toggleSubtitle(booleanVal) {
    this.#settings.toggleSubtitle = booleanVal;
  }

  async initiatePlayer(e) {
    e.preventDefault();

    // Adding Playerbar <start>
    if (this.#settings.controls) {
      const playerbar = await import("./playerbar/playerbar.js");
      if (!customElements.get("vm-playerbar")) {
        customElements.define("vm-playerbar", playerbar.default);
      }
      this.insertAdjacentHTML("beforeend", "<vm-playerbar />");
      // this.focus();
    }
    // Adding Playerbar <end>

    // Google IMA Ads testing <start>    
    // if (!customElements.get("vm-adslot")) {
    //   const adslot = await import("./google-ima-adslot.js");
    //   customElements.define("vm-adslot", adslot.default);
    //   this.insertAdjacentHTML("beforeend", "<vm-adslot />");
    // }
    // Google IMA Ads testing <end>

    this.video.autoplay = this.#settings.autoplay;
    this.video.muted = this.#settings.muted;
    this.video.width = this.#settings.width;
    this.video.height = this.#settings.height;
    this.video.loop = this.#settings.loop;

    this.append(this.video, this.overlayplay);

    const roundedClass = this.#settings.rounded ? "rounded" : "";
    this.classList.add(roundedClass);
    
    window.addEventListener("focus", () => {
      this.dataset.focus = "true";
    });

    triggerEvent(events.videoReady, this);
  }

  checkIfVideoContainsAudio() {
    let bool = true;
    if (typeof this.webkitAudioDecodedByteCount !== "undefined") {
      // non-zero if video has audio track
      if (this.webkitAudioDecodedByteCount > 0) bool = true;
      else bool = false;
    } else if (typeof this.mozHasAudio !== "undefined") {
      // true if video has audio track
      if (this.mozHasAudio) bool = true;
      else bool = false;
    }
    return bool;
  }

  changePictureInPicture(obj) {
    this.pictureInPicture = {
      width: obj.width,
      height: obj.height,
    };
  }

  // connect component
  async connectedCallback() {
    const { retrieveFormat, replayIconBtn } = await import("../utils.js");
    const format = retrieveFormat(this.#settings.url);
    const { dynamicFormats } = await import("../functions/dynamic.js");

    this.tabIndex = 1;

    // Player Mouse Enter
    this.addEventListener("mouseenter", this.togglePlayer);

    // Player Mouse Move
    this.addEventListener("mousemove", this.togglePlayer);

    // Player Initiate Event
    this.addEventListener(events.initiate, this.initiatePlayer);

    // Player Before Play Event
    this.addEventListener(events.beforePlay, (e) => {
      e.preventDefault();
      try {
        this.video.play();
        this.dataset.toggle = "played";
        this.overlayplay.classList.add("active");
        setTimeout(() => {
          this.overlayplay.classList.remove("active");
        }, 200);
      } catch (error) {
        console.error(error.message);
      }
    });

    this.beforePlay = (func) =>
      this.addEventListener(events.beforePlay, func, true);

    // Player Pause Event
    this.addEventListener(events.pause, (e) => {
      e.preventDefault();
      this.dataset.toggle = "paused";
      this.video.pause();
      this.overlayplay.classList.add("active");
      // setTimeout(() => {
      //   this.overlayplay.classList.remove("active");
      // }, 200);
    });

    // Player Play/Pause Event
    this.addEventListener(events.playPause, (e) => {
      e.preventDefault();
      this.dataset.focus = "true";
      const paused = this.video.paused;
      const toggleEvent = paused ? events.play : events.pause;
      triggerEvent(toggleEvent, this);
    });

    // Player End Event
    this.addEventListener(events.end, (e) => {
      e.preventDefault();
      this.dataset.toggle = "paused";
      replayIconBtn(this);
    });

    const createForwardRewind = (element, id) => {
      if (!element) {
        const cloned = this.overlayplay.cloneNode();
        cloned.id = id;
        cloned.innerHTML = id === "forward-overlay" ? forwardIcon : rewindIcon;
        this.append(cloned);
        return cloned;
      }
      return element;
    }

    let forwardIntervals = null;
    let forwardElement = null;

    // Forward Event
    this.addEventListener(events.forward, async (e) => {
      e.preventDefault();
      const forwardCalc = this.video.currentTime + this.#settings.backward;
      const { duration } = this.video;
      const calc = forwardCalc < duration ? forwardCalc : duration;
      this.video.currentTime = calc;

      if (calc > 0 && this.querySelector("replay"))
        this.querySelector("replay").remove();
      forwardIntervals && clearTimeout(forwardIntervals);

      forwardElement = createForwardRewind(forwardElement, "forward-overlay");
      forwardElement.classList.add("active");

      forwardIntervals = setTimeout(() => {
        forwardElement.classList.remove("active");
      }, 200);
    });

    let backwardIntervals = null;
    let backwardElement = null;

    // Backward Event
    this.addEventListener(events.backward, async (e) => {
      e.preventDefault();
      const rewindCalc = this.video.currentTime - this.#settings.forward;
      const calc = rewindCalc < 0 ? 0 : rewindCalc;
      this.video.currentTime = calc;

      backwardIntervals && clearTimeout(backwardIntervals);

      backwardElement = createForwardRewind(
        backwardElement,
        "backward-overlay"
      );
      backwardElement.classList.add("active");

      backwardIntervals = setTimeout(() => {
        backwardElement.classList.remove("active");
      }, 200);
    });

    // Fullscreen Event
    this.addEventListener(events.fullscreen, (e) => {
      e.preventDefault();
      this.requestFullscreen();
    });

    // Exit Fullscreen Event
    this.addEventListener(events.exitFullscreen, (e) => {
      e.preventDefault();
      document.exitFullscreen();
    });

    // Toggle Fullscreen Event
    this.addEventListener(events.toggleFullScreen, (e) => {
      e.preventDefault();
      const toggle = document.fullscreenElement
        ? "exitFullscreen"
        : "fullscreen";
      triggerEvent(toggle, this);
    });

    let muteElement = null;
    let unMuteElement = null;

    // Mute Event
    this.addEventListener(events.mute, async (e) => {
      e.preventDefault();
      if (!muteElement) {
        const cloned = this.overlayplay.cloneNode();
        cloned.innerHTML = muteIcon;
        cloned.id = "mute-overlay";
        this.append(cloned);
        muteElement = cloned;
      }
      this.video.muted = true;
      muteElement.classList.add("active");

      setTimeout(function () {
        muteElement.classList.remove("active");
      }, 200);
    });

    // Unmute Event
    this.addEventListener(events.unmute, (e) => {
      e.preventDefault();
      if (!unMuteElement) {
        const cloned = this.overlayplay.cloneNode();
        cloned.innerHTML = audioIcon;
        cloned.id = "unmute-overlay";
        this.append(cloned);
        unMuteElement = cloned;
      }
      this.video.muted = false;
      unMuteElement.classList.add("active");

      setTimeout(function () {
        unMuteElement.classList.remove("active");
      }, 200);
    });

    // Unmute Event
    this.addEventListener(events.toggleMute, (e) => {
      e.preventDefault();
      const toggle = this.video.muted ? "unmute" : "mute";
      triggerEvent(toggle, this);
    });

    // Loading Event
    this.addEventListener(events.loading, async function () {
      if (!this.loader) {
        const { loaderAnimatedIcon } = await import("../icons");
        const loaderElement = document.createElement("loader");
        this.loader = loaderElement;
        loaderElement.innerHTML = loaderAnimatedIcon;
        loaderElement.id = "videoManiaLoader";
        this.append(this.loader);
      }
      this.loader.classList.add("active");
    });

    // Loaded Event
    this.addEventListener(events.loaded, async function () {
      if (this.loader) {
        this.loader.classList.remove("active");
      }
    });

    const self = this;

    // Video Ended Event
    this.video.addEventListener("ended", () => {
      triggerEvent(events.end, this);
    });

    // Keypress Event
    this.addEventListener("keydown", async (e) => {
      e.preventDefault();
      const existKeys = Object.keys(keyTriggerEvent);
      if (existKeys.includes(e.key)) {
        triggerEvent(keyTriggerEvent[e.key], this);
        if (["play", "pause"].includes(keyTriggerEvent[e.key])) {
          this.#userTrigger = [keyTriggerEvent[e.key]];
        }
      }
    });

    // Overlay Play Event
    this.overlayplay.addEventListener("click", () => {
      this.dataset.focus = "true";
      this.userTrigger(this.video.paused ? "play" : "pause");
      triggerEvent(events.playPause, this);
    });

    // Volume Change Event
    this.video.addEventListener("volumechange", () => {
      triggerEvent(events.volumechange, this);
    });

    // Video Player Play
    this.video.addEventListener("play", () => {
      triggerEvent(events.play, this);
    });

    // Html5 Video player
    this.addEventListener(events.playable, async function () {});

    // Dynamic Video
    if (dynamicFormats.includes(format)) {
      const dynamic = await import("../functions/dynamic.js");
      const dynamicObj = dynamic.default(this, this.#settings.url)[format];
      // Check if Script exist then create script and init or just init
      if (!document.querySelector(`script#videomania-${format}`)) {
        const { addScript } = await import("../utils.js");
        const script = addScript(dynamicObj.url, format);
        script.onload = dynamicObj.init;
      } else {
        dynamicObj.init(this);
      }
    } else {
      // Custom HTML5 Video
      const html5Video = await import("../functions/html5Video.js");

      // Check if Supported Video Format
      if (html5Video.supportedVideoFormat.includes(format)) {
        html5Video.default(this, this.#settings.url);
      }
    }
    if (document.pictureInPictureEnabled && !this.pictureInPictureDisable) {
      this.addEventListener(events.pictureInPicture, () => {
        if (!this.pictureInPicture) {
          try {
            this.video
              .requestPictureInPicture()
              .then((pictureInPictureWindow) => {
                triggerEvent(events.pictureInPicture, this);
                this.changePictureInPicture({
                  width: pictureInPictureWindow.width,
                  height: pictureInPictureWindow.height,
                });
                pictureInPictureWindow.addEventListener("resize", function (e) {
                  this.changePictureInPicture({
                    width: e.target.width,
                    height: e.target.height,
                  });
                });
              });
          } catch (error) {
            console.error(error.message);
          }
        }
      });
      this.video.addEventListener("leavepictureinpicture", () => {
        triggerEvent(events.exitPictureInPicture, this);
        this.pictureInPicture = false;
      });
    }

    // Player Play Event
    this.addEventListener(events.play, () => {
      // if (this.#userTrigger == "play")
        triggerEvent(events.beforePlay, this);
        // this.#userTrigger = 'pla'
    });

    this.addEventListener(events.initiated, function () {
      // !this.video.paused &&
      // Check or ask microphone enable at browser
      // navigator.mediaDevices
      //   .getUserMedia({ audio: true })
      //   .then((stream) => {
      //     window.localStream = stream;
      //     self.video.autoplay && self.video.play();
      //   })
      //   .catch((err) => {
      //     console.error(`you got an error: ${err}`);
      //   });  
    });

    if (this.#settings.activeBrowserTabPlay) {
      document.addEventListener("visibilitychange", (event) => {
        const checkPlayState = this.#userTrigger !== "pause";
        document.hidden
          ? triggerEvent(events.pause, this)
          : checkPlayState && triggerEvent(events.play, this);
      });
    }

    this.video.oncanplay = () => {
      if(this.#userTrigger == "play")
      triggerEvent(events.play, this);
    };
  }
}

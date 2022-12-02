import events, { keyTriggerEvent } from "../events";
import { playPauseIcon, loaderAnimatedIcon, forwardIcon, rewindIcon } from "../icons";

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

  constructor() {
    super();
    this.#settings = this.parentElement.videoManiaConfig;
    this.pictureInPictureDisable = this.#settings.disablePictureInPictureMode;

    const style = `<style id='videomania-style'>
      @layer base {
        ${this.#settings.selector} vm-player {
          width: ${this.#settings.width}px;
          height: ${this.#settings.height}px;
        }
      }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style);
    this.overlayplay.innerHTML = playPauseIcon;
  }

  async togglePlayer() {
    const { triggerEvent } = await import("../utils.js");
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
      customElements.define("vm-playerbar", playerbar.default);
      this.insertAdjacentHTML("beforeend", "<vm-playerbar />");
    }
    // Adding Playerbar <end>

    this.video.autoplay = this.#settings.autoplay;
    this.video.muted = this.#settings.muted;
    this.video.width = this.#settings.width;
    this.video.height = this.#settings.height;
    this.video.loop = this.#settings.loop;
    this.video.pause();
    this.append(this.video, this.overlayplay);

    const roundedClass = this.#settings.rounded ? "rounded" : "";
    this.classList.add(roundedClass);

    if (this.#settings.addStyle && !document.querySelector("#videoMania-css")) {
      this.style.display = "none";
      const importCss = await import("../../css/player.css");
      const style = document.createElement("style");
      style.id = "videoMania-css";
      style.innerHTML = importCss.default;
      document.head.append(style);
      this.style.display = "block";
    }

    const self = this;
    window.addEventListener("focus", function () {
      self.dataset.focus = "true";
    });
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
    const { triggerEvent } = await import("../utils.js");

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
        this.dataset.focus == "true" && this.video.paused && this.video.play();
        this.dataset.toggle = "played";
        this.overlayplay.classList.add("active");
        setTimeout(() => {
          this.overlayplay.classList.remove("active");
        }, 200);
      } catch (error) {
        console.log(error);
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
      setTimeout(() => {
        this.overlayplay.classList.remove("active");
      }, 200);
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
      this.video.currentTime = 0;
      this.video.pause();
      replayIconBtn(this);
      triggerEvent(events.loaded, this);
    });

    // Forward Event
    this.addEventListener(events.forward, async (e) => {
      e.preventDefault();
      this.video.currentTime = this.video.currentTime + this.#settings.forward;
      const cloned = this.overlayplay.cloneNode();
      cloned.innerHTML = forwardIcon;
      this.append(cloned);
      cloned.classList.add("active");
      setTimeout(() => {
        cloned.classList.remove("active");
        setTimeout(() => {
          cloned.remove();
        }, 200);
      }, 200);
    });

    // Backward Event
    this.addEventListener(events.backward, async (e) => {
      e.preventDefault();
      this.video.currentTime = this.video.currentTime - this.#settings.backward;
      const cloned = this.overlayplay.cloneNode();
      cloned.innerHTML = rewindIcon;
      this.append(cloned);
      cloned.classList.add("active");
      setTimeout(() => {
        cloned.classList.remove("active");
        setTimeout(() => {
          cloned.remove();
        }, 200);
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

    // Mute Event
    this.addEventListener(events.mute, (e) => {
      e.preventDefault();
      this.video.muted = true;
    });

    // Unmute Event
    this.addEventListener(events.unmute, (e) => {
      e.preventDefault();
      this.video.muted = false;
    });

    // Unmute Event
    this.addEventListener(events.toggleMute, (e) => {
      e.preventDefault();
      const toggle = this.video.muted ? "unmute" : "mute";
      triggerEvent(toggle, this);
    });

    // Loading Event
    this.addEventListener(events.loading, async function () {
      if (!this.loader || !this.querySelector("#videoManiaLoader")) {
        const loaderElement = document.createElement("loader");
        this.loader = loaderElement;
        loaderElement.innerHTML = loaderAnimatedIcon;
        loaderElement.id = "videoManiaLoader";
        this.append(this.loader);
      }
    });

    // Loaded Event
    this.addEventListener(events.loaded, async function () {
      if (this.loader && this.querySelector("#videoManiaLoader")) {
        const loaderElement = this.querySelector("#" + this.loader.id);
        loaderElement.remove();
        this.loader = null;
      }
    });

    const self = this;

    // Video Ended Event
    this.video.addEventListener("ended", function () {
      triggerEvent(events.end, self);
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
    this.overlayplay.addEventListener("click", function () {
      this.dataset.focus = "true";
      self.userTrigger(self.video.paused ? "play" : "pause");
      triggerEvent(events.playPause, self);
    });

    // Volume Change Event
    this.video.addEventListener("volumechange", function () {
      triggerEvent(events.volumechange, self);
    });

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
      const { triggerEvent } = await import("../utils.js");
      triggerEvent("initiate", this);
    } else {
      // Custom HTML5 Video
      const html5Video = await import("../functions/html5Video.js");

      // Check if Supported Video Format
      if (html5Video.supportedVideoFormat.includes(format)) {
        html5Video.default(this);
        triggerEvent("initiate", this);
        this.video.src = this.#settings.url;
      }
    }
    if (document.pictureInPictureEnabled && !this.pictureInPictureDisable) {
      this.addEventListener(events.pictureInPicture, function () {
        if (!this.pictureInPicture) {
          try {
            this.video
              .requestPictureInPicture()
              .then((pictureInPictureWindow) => {
                triggerEvent(events.pictureInPicture, self);
                self.changePictureInPicture({
                  width: pictureInPictureWindow.width,
                  height: pictureInPictureWindow.height,
                });
                pictureInPictureWindow.addEventListener("resize", function (e) {
                  self.changePictureInPicture({
                    width: e.target.width,
                    height: e.target.height,
                  });
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
      this.video.addEventListener("leavepictureinpicture", function () {
        triggerEvent(events.exitPictureInPicture, self);
        self.pictureInPicture = false;
      });
    }

    this.addEventListener(events.initiated, function () {
      // Player Play Event
      this.addEventListener(events.play, () => {
        triggerEvent(events.beforePlay, this);
      });
      // Check or ask microphone enable at browser
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          window.localStream = stream;
          self.video.autoplay && self.video.play();
        })
        .catch((err) => {
          console.error(`you got an error: ${err}`);
        });
      const checkVideoPlayState =
        document.visibilityState === "visible" && this.#settings.autoplay;
      this.dataset.toggle = checkVideoPlayState ? "played" : "paused";
    });

    document.addEventListener("visibilitychange", function (event) {
      const checkPlayState = self.#userTrigger !== "pause";
      document.hidden
        ? triggerEvent(events.pause, self)
        : checkPlayState && triggerEvent(events.play, self);
    });

    window.addEventListener("load", () => {
      const checkPlayState = self.#userTrigger !== "pause";
      checkPlayState && triggerEvent(events.play, self);
    });
  }
}
export default class Player extends HTMLElement {
  static unactivePlayer;
  #settings;
  #unactivePlayer = null;
  video = document.createElement("video");
  playerbar = null;

  constructor() {
    super();
    this.#settings = window.videoManiaConfig[this.dataset.selector];

    const style = `<style id='videomania-style'>
      @layer base {
        ${this.#settings.selector} vm-player {
          width: ${this.#settings.width}px;
          height: ${this.#settings.height}px;
        }
      }
    </style>`;

    document.head.insertAdjacentHTML("beforeend", style);
  }

  togglePlayer() {
    this.#unactivePlayer && clearTimeout(this.#unactivePlayer);
    this.classList.add("active");
    this.#unactivePlayer = setTimeout(() => {
      this.classList.remove("active");
    }, 5e3);
  }

  async initiatePlayer(e) {
    e.preventDefault();
    this.video.autoplay = this.#settings.autoplay;
    this.video.muted = this.#settings.muted;
    this.video.width = this.#settings.width;
    this.video.height = this.#settings.height;
    this.video.loop = this.#settings.loop;

    const playerbar = await import("./playerbar.js");
    customElements.define("vm-playerbar", playerbar.default);
    this.append(this.video);
    this.insertAdjacentHTML("beforeend", "<vm-playerbar />");
  }

  // connect component
  async connectedCallback() {
    const { retrieveFormat } = await import("../utils.js");
    const format = retrieveFormat(this.#settings.url);
    const { dynamicFormats } = await import("../functions/dynamic.js");
    const { triggerEvent } = await import("../utils.js");
    const events = await import("../events.js")
    const evts = events.default
    const keyTrigger = events.keyTriggerEvent;

    this.tabIndex = 1;

    // Player Mouse Enter
    this.addEventListener("mouseenter", this.togglePlayer);

    // Player Mouse Move
    this.addEventListener("mousemove", this.togglePlayer);

    // Player Ready Event
    this.addEventListener(evts.playerReady, this.initiatePlayer);

    // Player Play Event
    this.addEventListener(evts.play, (e) => {
      e.preventDefault();
      this.dataset.toggle = "played";
      this.video.play();
    });

    // Player Pause Event
    this.addEventListener(evts.pause, (e) => {
      e.preventDefault();
      this.dataset.toggle = "paused";
      this.video.pause();
    });

    // Player Play/Pause Event
    this.addEventListener(evts.playPause, (e) => {
      e.preventDefault();
      const paused = this.video.paused;
      this.dataset.toggle = paused ? "played" : "paused";
      paused ? this.video.play() : this.video.pause();
    });

    // Player End Event
    this.addEventListener(evts.end, (e) => {
      e.preventDefault();
      this.dataset.toggle = "paused";
      this.video.currentTime = 0;
      this.video.pause();
    });

    // Forward
    this.addEventListener(evts.forward, (e) => {
      e.preventDefault();
      console.log(this.#settings);
      this.video.currentTime = this.video.currentTime + this.#settings.forward;
    });

    // Backward
    this.addEventListener(evts.backward, (e) => {
      e.preventDefault();
      this.video.currentTime = this.video.currentTime - this.#settings.backward;
    });

    // Fullscreen
    this.addEventListener(evts.fullscreen, (e) => {
      e.preventDefault(), this.requestFullscreen();
    });

    // Exit Fullscreen
    this.addEventListener(evts.exitFullscreen, (e) => {
      e.preventDefault();
      document.exitFullscreen();
    });

    // Toggle Fullscreen
    this.addEventListener(evts.toggleFullScreen, (e) => {
      e.preventDefault();
      const toggle = document.fullscreen ? "exitFullscreen" : "fullscreen";
      triggerEvent(toggle, this);
    });

    // Mute
    this.addEventListener(evts.mute, (e) => {
      e.preventDefault();
      this.video.muted = true;
    });

    // Unmute
    this.addEventListener(evts.unmute, (e) => {
      e.preventDefault();
      this.video.muted = false;
    });

    // Unmute
    this.addEventListener(evts.toggleMute, (e) => {
      e.preventDefault();
      const toggle = this.video.muted ? 'unmute' : 'mute'
      triggerEvent(toggle, this)
    });

    // Keypress Event
    this.addEventListener("keydown", async (e) => {
      e.preventDefault();
      const existKeys = Object.keys(keyTrigger);

      if(existKeys.includes(e.key)) {
        triggerEvent(keyTrigger[e.key], this);
      }
    });

    // Dynamic Video
    if (dynamicFormats.includes(format)) {
      const dynamic = await import("../functions/dynamic.js");
      const dynamicObj = dynamic.default(
        this.#settings.selector,
        this.#settings.url
      )[format];
      // Check if Script exist then create script and init or just init
      if (!document.querySelector(`script#videomania-${format}`)) {
        const { addScript } = await import("../utils.js");
        const script = addScript(dynamicObj.url, format);
        script.onload = dynamicObj.init;
      } else {
        dynamicObj.init();
      }
      const { triggerEvent } = await import("../utils.js");
      triggerEvent("playerReady", this);
    } else {
      // Custom HTML5 Video
      const html5Video = await import("../functions/html5Video.js");

      // Check if Supported Video Format
      if (html5Video.supportedVideoFormat.includes(format)) {
        html5Video.default(this.#settings);
        triggerEvent("playerReady", this);
        this.video.src = this.#settings.url;
      }
    }
  }
}

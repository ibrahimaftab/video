export default class Player extends HTMLElement {
  static unactivePlayer;
  #settings;
  #unactivePlayer = null;
  video = document.createElement("video");
  playerbar = null;
  loader = null
  overlayplay = document.createElement('overlayplay')
  beforePlay = null
  pictureInPicture = null

  constructor() {
    super();
    this.#settings = this.parentElement.videoManiaConfig;

    const style = `<style id='videomania-style'>
      @layer base {
        ${this.#settings.selector} vm-player {
          width: ${this.#settings.width}px;
          height: ${this.#settings.height}px;
        }
      }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", style);
    this.overlayplay.innerHTML =
      '<svg class="play-icon" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /> </svg> <svg class="pause-icon" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg" > <path d="M12,6H10A2,2,0,0,0,8,8V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" /> <path d="M22,6H20a2,2,0,0,0-2,2V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" /> <rect /> </svg>';
  }

  async togglePlayer() {
    const { triggerEvent } = await import('../utils.js')
    const events = await import("../events.js");
    this.#unactivePlayer && clearTimeout(this.#unactivePlayer);
    this.classList.add("active");
    triggerEvent(events.default.playerActive, this)
    this.#unactivePlayer = setTimeout(() => {
      this.classList.remove("active");
      triggerEvent(events.default.playerUnActive, this);
    }, 5e3);
  }

  qaulitiesList() {
    return this.#settings.qualities
  }

  subtitleList() {
    return {
      list: this.#settings.subtitles,
      toggleSubtitle: this.#settings.toggleSubtitle
    }
  }

  toggleSubtitle(booleanVal) {
    this.#settings.toggleSubtitle = booleanVal; 
  }

  async initiatePlayer(e) {
    e.preventDefault();
    this.video.autoplay = this.#settings.autoplay;
    this.video.muted = this.#settings.muted;
    this.video.width = this.#settings.width;
    this.video.height = this.#settings.height;
    this.video.loop = this.#settings.loop;
    this.append(this.video, this.overlayplay);

    const roundedClass = this.#settings.rounded ? 'rounded' : '' 
    this.classList.add(roundedClass)

    if(this.#settings.controls) {
      const playerbar = await import("./playerbar.js");
      customElements.define("vm-playerbar", playerbar.default);
      this.insertAdjacentHTML("beforeend", "<vm-playerbar />");
    }
  }

  checkIfVideoContainsAudio() {
    if (typeof this.video.webkitAudioDecodedByteCount !== "undefined") {
      return this.video.webkitAudioDecodedByteCount > 0;
    } else if (typeof this.video.mozHasAudio !== "undefined") {
      return this.video.mozHasAudio;
    } 
    return false
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

    // Player Before Play Event
    this.addEventListener(evts.beforePlay, (e) => {
      e.preventDefault();
      this.dataset.toggle = "played";
      this.video.play();
      this.overlayplay.classList.add("active");
      setTimeout(() => {
        this.overlayplay.classList.remove("active");
      }, 200);
    })

    this.beforePlay = (func) => this.addEventListener(evts.beforePlay, func, true);

    // Player Play Event
    this.addEventListener(evts.play, () => {
      triggerEvent(evts.beforePlay, this)
    });

    // Player Pause Event
    this.addEventListener(evts.pause, (e) => {
      e.preventDefault();
      this.dataset.toggle = "paused";
      this.video.pause();
      this.overlayplay.classList.add("active");
      setTimeout(() => {
        this.overlayplay.classList.remove("active");
      }, 200);
    });

    // Player Play/Pause Event
    this.addEventListener(evts.playPause, (e) => {
      e.preventDefault();
      const paused = this.video.paused;
      const toggleEvent = paused ? evts.play : evts.pause;
      triggerEvent(toggleEvent, this);
    });

    // Player End Event
    this.addEventListener(evts.end, (e) => {
      e.preventDefault();
      this.dataset.toggle = "paused";
      this.video.currentTime = 0;
      this.video.pause();
      replayIconBtn(this);
      triggerEvent(evts.loaded, this)
    });

    // Forward
    this.addEventListener(evts.forward, (e) => {
      e.preventDefault();
      this.video.currentTime = this.video.currentTime + this.#settings.forward;
    });

    // Backward
    this.addEventListener(evts.backward, (e) => {
      e.preventDefault();
      this.video.currentTime = this.video.currentTime - this.#settings.backward;
    });

    // Fullscreen
    this.addEventListener(evts.fullscreen, (e) => {
      e.preventDefault()
      this.requestFullscreen();
    });

    // Exit Fullscreen
    this.addEventListener(evts.exitFullscreen, (e) => {
      e.preventDefault();
      document.exitFullscreen();
    });

    // Toggle Fullscreen
    this.addEventListener(evts.toggleFullScreen, (e) => {
      e.preventDefault();
      const toggle = document.fullscreenElement
        ? "exitFullscreen"
        : "fullscreen";
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

    // Loading
    this.addEventListener(evts.loading, async function () {
      if(!this.loader) {
        const loaderElement = document.createElement("loader");
        const { loaderAnimatedIcon } = await import("../icons.js");
        loaderElement.innerHTML = loaderAnimatedIcon;
        loaderElement.id = "videoManiaLoader";
        this.loader = loaderElement;
        this.append(this.loader);
      }
    });

    // Loaded
    this.addEventListener(evts.loaded, async function () {
      if (this.loader) {
        const loaderElement = document.querySelector('#'+this.loader.id);
        loaderElement.remove()
        this.loader = null
      }
    });

    const self = this
    
    // Video Ended
    this.video.addEventListener('ended', function() {
      triggerEvent(evts.end, self);
    })

    // Keypress Event
    this.addEventListener("keydown", async (e) => {
      e.preventDefault();
      const existKeys = Object.keys(keyTrigger);

      if(existKeys.includes(e.key)) {
        triggerEvent(keyTrigger[e.key], this);
      }
    });

    // Overlay Play Event
    this.overlayplay.addEventListener('click', function() {
      triggerEvent(evts.playPause, this.parentElement);
    });

    // Volume Change Event
    this.video.addEventListener("volumechange", function() {
      triggerEvent(evts.volumechange, this.parentElement);
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
        dynamicObj.init(this);
      }
      const { triggerEvent } = await import("../utils.js");
      triggerEvent("playerReady", this);
    } else {
      // Custom HTML5 Video
      const html5Video = await import("../functions/html5Video.js");

      // Check if Supported Video Format
      if (html5Video.supportedVideoFormat.includes(format)) {
        html5Video.default(this);
        triggerEvent("playerReady", this);
        this.video.src = this.#settings.url;
      }
    }
    if(document.pictureInPictureEnabled) {
      this.video.addEventListener("enterpictureinpicture", function () {
        triggerEvent(evts.pictureInPicture, self);
      });
      this.video.addEventListener("leavepictureinpicture", function () {
        triggerEvent(evts.exitPictureInPicture, self);
        self.pictureInPicture = false;
      });
    }
    this.addEventListener(evts.initiated, function() {
      const playState = this.#settings.autoplay && this.#settings.muted ? "played" : "paused"
      this.dataset.toggle = playState;
    })
  }
}

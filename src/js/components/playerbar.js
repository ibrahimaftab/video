class PlayerBar extends HTMLElement {
  play = document.createElement("play");
  setting = document.createElement("setting");
  toggleFullscreen = document.createElement("toggle-screen");
  setting = document.createElement("setting");
  dropdown = document.createElement("dropdown");
  constructor() {
    super();
    this.play.innerHTML =
      '<svg class="play-icon" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /> </svg> <svg class="pause-icon" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg" > <path d="M12,6H10A2,2,0,0,0,8,8V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" /> <path d="M22,6H20a2,2,0,0,0-2,2V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" /> <rect /> </svg>';
    this.play.role = "button";
    this.play.tabIndex = "2";
    this.toggleFullscreen.innerHTML = `<svg fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" > <path clip-rule="evenodd" d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z" fill="currentColor" fill-rule="evenodd" /> </svg>`;
    this.toggleFullscreen.role = "button";
    this.toggleFullscreen.tabIndex = "6";
    this.setting.innerHTML = `<span role="button" tabIndex="5"><svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7   L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7   l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9   c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7   C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z" id="settings"/></svg></span>`;
    this.dropdown.innerHTML = `<nav id="setting-dropdown"><button id="playback-btn"><svg enable-background="new 0 0 64 64" version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28.371,31.879c0,2.19,1.777,3.966,3.966,3.966c1.538,0,2.856-0.884,3.514-2.163l0.011,0.01l7.24-13.062l-12.71,7.794   l0.012,0.012C29.197,29.117,28.371,30.395,28.371,31.879z"/><path d="M48.315,12.981C44.251,9.429,39,7.161,33,6.822v6.027c5,0.318,7.946,1.906,10.904,4.384L48.315,12.981z"/><path d="M51.146,30h6.02c-0.404-6-2.751-10.93-6.395-14.97l-4.259,4.233C49.078,22.203,50.766,26,51.146,30z"/><path d="M51.174,33c-0.637,10-8.922,17.931-19.042,17.931c-10.535,0-19.421-8.544-19.421-19.078C12.711,21.825,21,13.62,30,12.85   V6.823C17,7.602,6.711,18.54,6.711,31.879c0,13.843,11.42,25.052,25.263,25.052C45.406,56.931,56.564,46,57.205,33H51.174z"/></svg> Playback Speed </button></nav><nav id="playback-list"><button class="dropdown-back">Playback Speed</button><button>0.25</button><button>0.5</button><button>0.75</button><button>Normal</button><button>1.25</button><button>1.5</button><button>1.75</button><button>2</button></nav>`;
    this.setting.append(this.dropdown);
  }
  async connectedCallback() {
    const self = this;
    const player = self.parentElement
    const evts = await import("../events.js");
    const { triggerEvent, videoDurationFormat, setDropdownSettingHeight } =
      await import("../utils.js");

    // Play Button Click Event
    this.play.addEventListener("click", function () {
      triggerEvent(evts.default.playPause, player);
    });

    // Toggle Fullscren Click Event
    this.toggleFullscreen.addEventListener("click", function () {
      triggerEvent(evts.default.toggleFullScreen, player);
    });

    // Playable Event (for custom html5 supported video)
    this.parentElement.addEventListener(evts.default.playable, function () {
      const timeline = document.createElement("timeline");
      const timelineProgressbar = document.createElement(
        "timeline-progressbar"
      );
      const timelineBuffer = document.createElement("timeline-buffer");
      const timelineProgress = document.createElement("timeline-progress");
      const end = document.createElement("end");
      timelineProgressbar.role = "button";
      timelineProgressbar.tabIndex = "3";
      const clonedTimelineProgress = timelineProgress.cloneNode();
      clonedTimelineProgress.classList.add("hover-timeline");
      timelineBuffer.style.width = "0px";
      timelineProgress.style.width = "0px";
      end.tabIndex = "4";
      end.role = "button";
      end.textContent = videoDurationFormat(
        player.video,
        self.durationSubstract
      );
      timelineProgressbar.append(
        timelineBuffer,
        timelineProgress,
        clonedTimelineProgress
      );
      timeline.append(timelineProgressbar, end);
      self.append(self.play, timeline, self.setting, self.toggleFullscreen);

      // Duration Substract
      let durationSubstract = false;

      // Dropdown Qualities List
      const qualitiesList = player.qaulitiesList()

      if(qualitiesList.length) {
        self.dropdown
      }

      // End Duration Click
      end.addEventListener("click", function (e) {
        e.preventDefault();
        durationSubstract = !durationSubstract;
        end.textContent = videoDurationFormat(player.video, durationSubstract);
      });

      // Video
      const { video } = player;

      // Timeline Progress Bar Mouse Move
      timelineProgressbar.addEventListener("mousemove", (e) => {
        const calcPosition = (e.layerX / e.target.clientWidth) * 100 + "%";
        clonedTimelineProgress.style.width = calcPosition;
      });

      // Timeline Progress Bar Mouse leave
      timelineProgressbar.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        clonedTimelineProgress.style.width = `0px`;
      });

      // Timeline Progress Bar Click
      timelineProgressbar.addEventListener("click", function (e) {
        e.preventDefault();
        const calcPosition = e.layerX / e.target.clientWidth;
        timelineProgress.style.width = calcPosition * 100 + "%";
        video.currentTime = video.duration * calcPosition;
      });

      // Video Time Update Event
      video.addEventListener("timeupdate", function () {
        timelineProgress.style.width =
          (video.currentTime / video.duration) * 100 + "%";
        if (durationSubstract) {
          end.textContent = videoDurationFormat(video, durationSubstract);
        }
        timelineBuffer.style.width =
          ((video.buffered?.end(video.buffered.length - 1) ?? 0) /
            video.duration) *
            100 +
          "%";
      });
    });

    // Setting Plackback Button Click Event
    this.setting
      .querySelector("#playback-btn")
      .addEventListener("click", function () {
        self.dropdown.classList.add("show-playback");
        self.dropdown.classList.add("dropdown-active");
      });

    // Setting Button Click Event 
    this.setting.querySelector("span").addEventListener("click", function () {
      self.setting.classList.toggle("show-dropdown");
      self.dropdown.classList = [];
    });

    // Dropdown All Button(s) (not back button) Click Event
    this.dropdown
      .querySelectorAll("#playback-list button:not(.dropdown-back)")
      .forEach((elm) => {
        elm.addEventListener("click", function () {
          const playback =
            elm.textContent === "Normal"
              ? player.video.defaultPlaybackRate
              : Number(elm.textContent);
          player.video.playbackRate = playback;
          self.dropdown
            .querySelector("#playback-list .dropdown-back")
            .dispatchEvent(new Event("click"));
        });
      });

    // Dropdown Back Button(s) Click Event
    this.dropdown.querySelectorAll(".dropdown-back").forEach((elm) => {
      elm.addEventListener("click", function () {
        self.dropdown.classList.remove("dropdown-active");
        setTimeout(() => {
          self.dropdown.classList = [];
        }, 150);
      });
    });
    setDropdownSettingHeight(this);
  }
}

export default PlayerBar;

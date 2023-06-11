import events from "../../events";
import {
  playPauseIcon,
  fullscreenIcon,
  settingIcon,
  playbackIcon,
  } from "../../icons";
import { triggerEvent } from "../../utils.js";

class PlayerBar extends HTMLElement {
  play = document.createElement("play");
  setting = document.createElement("setting");
  toggleFullscreen = document.createElement("toggle-screen");
  setting = document.createElement("setting");
  dropdown = document.createElement("dropdown");
  audioIconButton = "";
  miniplayerBtn = "";
  #durationSubstract = false

  constructor() {
    super();
    this.play.innerHTML = playPauseIcon;
    this.play.role = "button";
    this.play.tabIndex = "2";
    this.toggleFullscreen.innerHTML = fullscreenIcon;
    this.toggleFullscreen.role = "button";
    this.toggleFullscreen.tabIndex = "6";
    this.setting.innerHTML = `<span role="button" tabindex="7">${settingIcon}</span>`;
    this.dropdown.innerHTML = `<nav id="setting-dropdown" class="active"><button id="playback-btn">${playbackIcon} Playback Speed </button></nav><nav id="playback-list"><button class="dropdown-back">Playback Speed</button><button>0.25</button><button>0.5</button><button>0.75</button><button class='active'>Normal</button><button>1.25</button><button>1.5</button><button>1.75</button><button>2</button></nav>`;
    this.setting.append(this.dropdown);
  }
  
  dropdownHeightAdjust() {
    const settingDropdown = this.dropdown.querySelector("nav.active");
    const computedStyle = getComputedStyle(this.dropdown);
    const heightTotal =
      parseInt(computedStyle.paddingTop) +
      parseInt(getComputedStyle(settingDropdown).height) +
      parseInt(computedStyle.paddingBottom);
    this.dropdown.style.height = heightTotal + "px";
  }

  async pictureInPictureMode() {
    // Picture in picture mode
    const player = this.parentElement;
    if (
      "pictureInPictureEnabled" in document &&
      !player.pictureInPictureDisable
    ) {
      this.miniplayerBtn = document.createElement("miniplayer-btn");
      const { picInPicIcon } = await import("../../icons.js");
      this.miniplayerBtn.innerHTML = picInPicIcon;
      this.miniplayerBtn.addEventListener("click", function () {
        triggerEvent(events.pictureInPicture, player);
      });
    }
  }

  async createQualityDropdown(func) {
    const { qualityIcon } = await import("../../icons.js");
    const qualityBtn = `<button id="quality-btn">${qualityIcon} Quality </button>`;
    const qualityList = `<nav id="quality-list"><button class="dropdown-back">Quality</button></nav>`;
    const dropdownHtml = this.dropdown;
    const self = this;
    const settingDropdown = dropdownHtml.querySelector("#setting-dropdown");
    settingDropdown.insertAdjacentHTML("beforeend", qualityBtn);
    dropdownHtml.insertAdjacentHTML("beforeend", qualityList);
    this.dropdownHeightAdjust();
    func();
    dropdownHtml
      .querySelector("#quality-btn")
      .addEventListener("click", function () {
        dropdownHtml.classList.add("show-quality");
        dropdownHtml.classList.add("dropdown-active");
        dropdownHtml.querySelector("nav.active").classList.remove("active");
        dropdownHtml.querySelector("#quality-list").classList.add("active");
        self.dropdownHeightAdjust();
      });
  }

  async subtitleList() {
    const player = this.parentElement;
    const subtitles = player.subtitleList();
    if (subtitles.list.length) {
      const subtitleBtnElement = document.createElement("button");
      subtitleBtnElement.id = "subtitle-btn";
      this.dropdown
        .querySelector("#setting-dropdown")
        .append(subtitleBtnElement);
      this.dropdownHeightAdjust();
      const { subtitleIcon } = await import("../../icons.js");
      const subtitleBtn = `${subtitleIcon} Subtitle <span>Off</span>`;
      subtitleBtnElement.innerHTML = subtitleBtn;
      const { onCueChange } = await import("../../utils.js");

      subtitles.list.forEach((subtitle) => {
        const track = document.createElement("track");
        track.src = subtitle.url;
        track.srclang = subtitle.lang;
        track.kind = "captions";
        track.default = true;
        player.video.append(track);
        player.video.addEventListener("timeupdate", (event) =>
          onCueChange(event, subtitles.toggleSubtitle)
        );
      });
      const subtitleBtnSpan = subtitleBtnElement.querySelector("span");
      subtitleBtnSpan.textContent = subtitles.toggleSubtitle ? "On" : "Off";
      subtitleBtnElement.addEventListener("click", function () {
        player.toggleSubtitle(!subtitles.toggleSubtitle);
        subtitles.toggleSubtitle = !subtitles.toggleSubtitle;
        subtitleBtnSpan.textContent = subtitles.toggleSubtitle ? "On" : "Off";
        const event = subtitles.toggleSubtitle
          ? events.showSubtitle
          : events.hideSubtitle;
        triggerEvent(event, player);
      });
      player.addEventListener(events.toggleSubtitle, function () {
        triggerEvent("click", subtitleBtnElement);
      });
    }
  }

  async videoManiaLive() {
    const { liveIcon } = await import("../../icons.js");
    const live = document.createElement("live");
    live.innerHTML = liveIcon;
    live.append("Live");
    this.play.after(live);
  }

  async initiate(showTimeline = true) {
    const player = this.parentElement;
    const self = this;
    const { videoDurationFormat } = await import("../../utils.js");
    const end = document.createElement("end");
    end.tabIndex = "4";
    end.role = "button";
    end.textContent = videoDurationFormat(
      player.video,
      self.#durationSubstract
    );

    // Audio Button
    const checkAudio = player.checkIfVideoContainsAudio();
    if (checkAudio) {
      const { muteIcon, audioIcon } = await import("../../icons.js");
      self.audioIconButton = document.createElement("audio-icon");
      const audioSpan = document.createElement("span");
      audioSpan.role = "button";
      audioSpan.tabIndex = "4";
      audioSpan.innerHTML = player.video.muted ? muteIcon : audioIcon;
      self.audioIconButton.append(audioSpan);

      // Audion Button Click Event
      self.audioIconButton.addEventListener("click", function () {
        player.video.muted = !player.video.muted;
      });

      // Player Video Volume Change Event
      player.addEventListener(events.volumechange, (e) => {
        audioSpan.innerHTML = player.video.muted ? muteIcon : audioIcon;
      });
    }
    self.append(
      self.play,
      self.audioIconButton,
      self.setting,
      self.miniplayerBtn,
      self.toggleFullscreen
    );

    // End Duration Click
    end.addEventListener("click", function (e) {
      e.preventDefault();
      self.#durationSubstract = !self.#durationSubstract;
      end.textContent = videoDurationFormat(
        player.video,
        self.#durationSubstract
      );
    });

    // Video
    const { video } = player;

    if (showTimeline) {
      const timeline = document.createElement("timeline");
      const timelineProgressbar = document.createElement(
        "timeline-progressbar"
      );
      const timelineBuffer = document.createElement("timeline-buffer");
      const timelineProgress = document.createElement("timeline-progress");

      const clonedTimelineProgress = timelineProgress.cloneNode();
      clonedTimelineProgress.classList.add("hover-timeline");

      timelineProgressbar.append(
        timelineBuffer,
        timelineProgress,
        clonedTimelineProgress
      );
      timeline.append(timelineProgressbar, end);
      timelineProgressbar.role = "button";
      timelineProgressbar.tabIndex = "3";
      timelineBuffer.style.width = "0px";
      timelineProgress.style.width = "0px";
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
      self.play.after(timeline);
    } else {
      this.videoManiaLive();
    }
    
    triggerEvent("playerbar-initial-ready", self);
  }

  async connectedCallback() {
    this.parentElement.playerbar = this;
    const self = this;
    const player = self.parentElement;
    const { setDropdownSettingHeight } = await import(
      "../../utils.js"
    );

    // Play Button Click Event
    this.play.addEventListener("click", function () {
      player.userTrigger(player.video.paused ? "play" : "pause");
      triggerEvent(events.playPause, player);
    });

    // Toggle Fullscren Click Event
    this.toggleFullscreen.addEventListener("click", function () {
      triggerEvent(events.toggleFullScreen, player);
    });

    // Playable Event (for custom html5 supported video)
    player.addEventListener(
      events.playable,
      async function () {
        const html5Video = await import(
          "./html5video.js"
        );
        html5Video.default(player);
      },
      true
    );

    // Dynamic Dash Js Event
    player.addEventListener(
      events.dynamicDashJs,
      async function () {
        const dashjs = await import("./dash.js");
        dashjs.default(player);
      }
    );

    // Dynamic HLS Js Event
    player.addEventListener(events.dynamicHlsJs, async function () {
      const hlsjs = await import("./hls.js");
      hlsjs.default(player);
    });

    // Setting Plackback Button Click Event
    this.setting
      .querySelector("#playback-btn")
      .addEventListener("click", function () {
        self.dropdown.classList.add("show-playback");
        self.dropdown.classList.add("dropdown-active");
        self.querySelector("nav.active").classList.remove("active");
        self.querySelector("#playback-list").classList.add("active");
        self.dropdownHeightAdjust();
      });

    // Setting Button Click Event
    this.setting.querySelector("span").addEventListener("click", function () {
      self.setting.classList.toggle("show-dropdown");
      self.dropdown.classList = [];
      self.dropdown
        .querySelector("#setting-dropdown:not(.active)")
        ?.classList.add("active");
      self.dropdown
        .querySelector("nav.active:not(#setting-dropdown)")
        ?.classList.remove("active");
      self.dropdownHeightAdjust();
    });

    // Dropdown All Button(s) (not back button) Click Event
    this.dropdown
      .querySelectorAll("#playback-list button:not(.dropdown-back)")
      .forEach((elm) => {
        elm.addEventListener("click", function () {
          if (!elm.classList.contains("active")) {
            const playback =
              elm.textContent === "Normal"
                ? player.video.defaultPlaybackRate
                : Number(elm.textContent);
            player.video.playbackRate = playback;
            self.dropdown
              .querySelector("#playback-list .dropdown-back")
              .dispatchEvent(new Event("click"));
            elm.parentElement
              .querySelector(".active")
              .classList.remove("active");
            elm.classList.add("active");
          }
        });
      });

    self.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("dropdown-back") ||
        e.target.parentElement.classList.contains("dropdown-back")
      ) {
        self.dropdown.classList.remove("dropdown-active");
        self.dropdown.querySelector("nav.active").classList.remove("active");
        self.dropdown
          .querySelector("#setting-dropdown")
          .classList.add("active");
        self.dropdownHeightAdjust();
        setTimeout(() => {
          self.dropdown.classList = [];
        }, 150);
      }
    });

    // Video Time Update Event
    this.parentElement.video.addEventListener("timeupdate", async function () {
      const { videoDurationFormat } = await import("../../utils.js");
      const timelineProgress = self.querySelector("timeline-progress");
      const timelineBuffer = self.querySelector("timeline-buffer");
      if (timelineProgress && timelineBuffer) {
        timelineProgress.style.width =
          (this.currentTime / this.duration) * 100 + "%";
        if (self.#durationSubstract) {
          self.querySelector("end").textContent = videoDurationFormat(this, self.#durationSubstract);
        }
        if (this.buffered.length)
          timelineBuffer.style.width =
            ((this?.buffered?.end(this.buffered.length - 1) ?? 0) /
              this?.duration) *
              100 +
            "%";
      }
    });

    // Player Initiated Event
    player.addEventListener(events.initiated, async function () {
      self.subtitleList();
      setDropdownSettingHeight(self);
      self.pictureInPictureMode();
    });

    // Player Unactive Event
    player.addEventListener(events.playerUnActive, function () {
      const settingDropdown = self.dropdown.querySelector("#setting-dropdown");
      if (self.setting.classList.contains("show-dropdown")) {
        self.setting.classList.remove("show-dropdown");
        if (!settingDropdown.classList.contains("active")) {
          self.dropdown.classList = [];
          self.dropdown.querySelector("nav.active").classList.remove("active");
          settingDropdown.classList.add("active");
          self.dropdownHeightAdjust();
        }
      }
    });
  }
}

export default PlayerBar;

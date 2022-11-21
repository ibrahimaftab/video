const supportedVideoFormat = ["mp4", "webm", "ogg"];
let videoManiaHlsjs = null;
let videoManiaDashjs = null;

const hlsDashjs = (selector, url) => ({
  m3u8: {
    url: `https://cdn.jsdelivr.net/npm/hls.js@1`,
    init: async () => {
      if (!videoManiaHlsjs) {
        const file = await import("./hls.js");
        videoManiaHlsjs = file.default;
      }
      videoManiaHlsjs(selector, url);
    },
  },
  mpd: {
    url: `https://cdnjs.cloudflare.com/ajax/libs/dashjs/4.5.0/dash.all.min.js`,
    init: async () => {
      if (!videoManiaDashjs) {
        const file = await import("./dash.js");
        videoManiaDashjs = file.default;
      }
      videoManiaDashjs(selector, url);
    },
  },
});

async function videoMania(obj) {
  const initiate = await import("./functions/initiate.js");
  initiate.default(obj);
  const { playPauseIcon, fullscreenIcon, audioIcon, muteIcon, settingIcon } =
    await import("./icons.js");
  const { addLoader, removeLoader } = await import("./loader.js");
  const { playbackHtml, qualityBtn, qualityList } = await import(
    "./defaultsHtml.js"
  );
  const {
    forwardRewindIcon,
    initialObj,
    videoDurationFormat,
    setDropdownSettingHeight,
    volumeIcon,
    replayIconBtn,
  } = await import("./utils.js");
  const settings = {
    ...initialObj,
    ...obj,
  };
  document.head.insertAdjacentHTML(
    "beforeend",
    '<style id="videomania-style"></style>'
  );
  const player = document.createElement("player");
  const video = document.createElement("video");
  const overlayplay = document.createElement("overlayplay");
  const playerbar = document.createElement("playerbar");
  const play = document.createElement("play");
  const timeline = document.createElement("timeline");
  const end = document.createElement("end");
  const toggleScreen = document.createElement("toggle-screen");
  const timelineProgressbar = document.createElement("timeline-progressbar");
  const timelineBuffer = document.createElement("timeline-buffer");
  const timelineProgress = document.createElement("timeline-progress");
  const audioIconButton = document.createElement("audio-icon");
  const audioSpan = document.createElement("span");
  let toggleSubtitle = settings.toggleSubtitle;

  timelineBuffer.style.width = "0px";
  timelineProgress.style.width = "0px";

  const dropdown = document.createElement("dropdown");
  dropdown.innerHTML = playbackHtml;

  dropdown
    .querySelector("#playback-btn")
    .addEventListener("click", function () {
      dropdown.classList.add("show-playback");
      dropdown.classList.add("dropdown-active");
    });

  dropdown.querySelectorAll(".dropdown-back").forEach((elm) => {
    elm.addEventListener("click", function () {
      dropdown.classList.remove("dropdown-active");
      setTimeout(() => {
        dropdown.classList = [];
      }, 150);
    });
  });

  dropdown
    .querySelectorAll("#playback-list button:not(.dropdown-back)")
    .forEach((elm) => {
      elm.addEventListener("click", function () {
        const playback =
          elm.textContent === "Normal"
            ? video.defaultPlaybackRate
            : Number(elm.textContent);
        video.playbackRate = playback;
        dropdown
          .querySelector("#playback-list .dropdown-back")
          .dispatchEvent(new Event("click"));
      });
    });

  audioSpan.role = "button";
  audioSpan.tabIndex = "4";
  audioSpan.innerHTML = settings.muted ? muteIcon : audioIcon;
  audioIconButton.append(audioSpan);
  audioIconButton.addEventListener("click", function () {
    video.muted = !video.muted;
  });

  const settingButton = document.createElement("setting");
  const settingButtonSpan = document.createElement("span");
  settingButtonSpan.role = "button";
  settingButtonSpan.tabIndex = "5";
  settingButtonSpan.innerHTML = settingIcon;
  settingButton.append(dropdown);
  settingButton.append(settingButtonSpan);

  settingButtonSpan.addEventListener("click", () => {
    settingButton.classList.toggle("show-dropdown");
    dropdown.classList = [];
  });

  let paused = !settings.autoplay;
  let fullscreen = false;
  let endSubtract = false;

  let unactivePlayer;

  player.classList.add("videoMania");
  player.id = settings.id;
  player.style = `width: ${settings.width}px; height: ${settings.height}px; margin: auto`;
  player.dataset.toggle = settings.autoplay ? "played" : "paused";

  async function videoAppend() {
    const hoverTimelineProgress = timelineProgress.cloneNode();
    hoverTimelineProgress.classList.add("hover-timeline");
    timelineProgressbar.append(
      timelineBuffer,
      timelineProgress,
      hoverTimelineProgress
    );
    timeline.append(timelineProgressbar, end);
    playerbar.append(
      play,
      timeline,
      audioIconButton,
      settingButton
    );

    // Picture in picture mode
    if ("pictureInPictureEnabled" in document) {
      const miniplayerBtn = document.createElement('miniplayer-btn')
      const { picInPicIcon } = await import('./icons.js')
      miniplayerBtn.innerHTML = picInPicIcon;
      miniplayerBtn.addEventListener('click', function() {
        try {
          video.requestPictureInPicture()
        } catch (error) {
          console.log(error)
        }
      })
      playerbar.append(miniplayerBtn);
    }

    playerbar.append(toggleScreen)
    player.append(video, overlayplay, playerbar);

    const selector = document.querySelector(settings.selector);
    selector.append(player);
    addLoader(selector);
    setDropdownSettingHeight(settings.selector);
  }

  function togglePlayer() {
    unactivePlayer && clearTimeout(unactivePlayer);
    player.classList.add("active");
    unactivePlayer = setTimeout(() => {
      player.classList.remove("active");
    }, 5e3);
  }

  player.addEventListener("mouseenter", togglePlayer);
  player.addEventListener("mousemove", togglePlayer);

  player.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "f":
        document.fullscreen
          ? document.exitFullscreen()
          : player.requestFullscreen();
        break;
      case "ArrowLeft":
        video.currentTime = video.currentTime - 10;
        forwardRewindIcon(player, "ArrowLeft");
        break;
      case "ArrowRight":
        video.currentTime = video.currentTime + 10;
        forwardRewindIcon(player, "ArrowRight");
        break;
      case "m":
        video.muted = !video.muted;
        volumeIcon(player, "m");
        break;
    }
  });

  player.addEventListener("mouseleave", function () {
    const showDropdown = player.querySelector(".show-dropdown");
    if (showDropdown) {
      showDropdown.querySelector("dropdown").classList = [];
      showDropdown.classList.remove("show-dropdown");
    }
  });

  toggleScreen.addEventListener("click", (e) => {
    e.preventDefault();
    fullscreen = !fullscreen;
    fullscreen ? player.requestFullscreen() : document.exitFullscreen();
  });

  toggleScreen.addEventListener("keydown", (e) => {
    e.preventDefault();
    const selectedKeys = ["Enter", " "];
    selectedKeys.includes(e.key) &&
      toggleScreen.dispatchEvent(new Event("click"));
  });

  play.addEventListener("click", (e) => {
    e.preventDefault();
    paused = !paused;
    paused ? video.pause() : video.play();
    player.dataset.toggle = paused ? "paused" : "played";
  });

  play.addEventListener("keydown", (e) => {
    e.preventDefault();
    const selectedKeys = ["Enter", " "];
    selectedKeys.includes(e.key) && play.dispatchEvent(new Event("click"));
  });

  overlayplay.role = "button";
  overlayplay.tabIndex = "0";

  overlayplay.addEventListener("click", (e) => {
    player.querySelector(".show-dropdown")?.classList.remove("show-dropdown");
    play.dispatchEvent(new Event("click"));
  });

  overlayplay.addEventListener("keydown", (e) => {
    e.preventDefault();
    const selectedKeys = ["Enter", " "];
    selectedKeys.includes(e.key) && play.dispatchEvent(new Event("click"));
  });

  video.id = `videoMania-video-${settings.id}`;
  video.width = settings.width;
  video.height = settings.height;
  video.autoplay = settings.autoplay;
  video.muted = settings.muted;
  video.loop = settings.loop;

  video.addEventListener("play", function () {
    overlayplay.classList.add("active");
    if (end.textContent == "0:00") {
      const formatDuration = videoDurationFormat(video, endSubtract);
      end.textContent = formatDuration;
    }
    setTimeout(() => {
      overlayplay.classList.remove("active");
    }, 200);
    removeLoader(document.querySelector(settings.selector));
  });

  video.addEventListener("loadedVideoData", function () {
    player.dataset.toggle =
      video.autoplay && video.played ? "played" : "paused";
  });

  video.addEventListener("loadeddata", function () {
    const formatDuration = videoDurationFormat(video, endSubtract);
    end.textContent = formatDuration;
  });

  video.addEventListener("timeupdate", function () {
    const getEndSubsctract = endSubtract;
    timelineProgress.style.width =
      (video.currentTime / video.duration) * 100 + "%";
    timelineBuffer.style.width =
      ((video.buffered?.end(video.buffered.length - 1) ?? 0) / video.duration) *
        100 +
      "%";
    currentUrl = video.src;
    if (endSubtract) {
      const formatDuration = videoDurationFormat(video, getEndSubsctract);
      end.textContent = formatDuration;
    }
  });

  video.addEventListener("pause", function () {
    overlayplay.classList.add("active");
    setTimeout(() => {
      overlayplay.classList.remove("active");
    }, 200);
  });

  video.addEventListener("seeking", function () {
    addLoader(document.querySelector(settings.selector));
  });

  video.addEventListener("seeked", function () {
    removeLoader(document.querySelector(settings.selector));
  });

  video.addEventListener("volumechange", (e) => {
    const audioIconSpan = document.querySelector(
      `${settings.selector} audio-icon span`
    );
    audioIconSpan &&
      (audioIconSpan.innerHTML = video.muted ? muteIcon : audioIcon);
  });

  video.addEventListener("ended", function () {
    player.dataset.toggle = "paused";
    replayIconBtn(player);
  });

  video.onerror = () => {
    console.error(`Error ${video.error.code}; details: ${video.error.message}`);
  };

  video.addEventListener("error", function () {
    console.log("error");
  });

  timelineProgressbar.addEventListener("mousemove", (e) => {
    const hoverTimeline = document.querySelector(
      `${settings.selector} .hover-timeline`
    );
    const calcPosition = (e.layerX / e.target.clientWidth) * 100 + "%";
    hoverTimeline.style.width = calcPosition;
  });

  timelineProgressbar.addEventListener("mouseleave", (e) => {
    document.querySelector(
      `${settings.selector} .hover-timeline`
    ).style.width = `0px`;
  });

  timelineProgressbar.addEventListener("click", (e) => {
    const clientRectLeft = timelineProgressbar.getBoundingClientRect().x;
    const clientRectWidth = timelineProgressbar.getBoundingClientRect().width;
    const timelineWidth = clientRectWidth;
    const timelinePosition = e.clientX - clientRectLeft;
    video.currentTime = (timelinePosition / timelineWidth) * video.duration;
    timelineProgress.style.width =
      (video.currentTime / video.duration) * timelineProgressbar.clientWidth +
      "px";
  });

  overlayplay.innerHTML = playPauseIcon;

  play.role = "button";
  play.tabIndex = "1";
  play.innerHTML = playPauseIcon;

  end.role = "button";
  end.tabIndex = "3";
  end.textContent = "0:00";

  end.addEventListener("click", function () {
    endSubtract = !endSubtract;
    const formatDuration = videoDurationFormat(video, endSubtract);
    end.textContent = formatDuration;
  });

  toggleScreen.role = "button";
  toggleScreen.tabIndex = "6";
  toggleScreen.innerHTML = fullscreenIcon;

  timelineProgressbar.role = "button";
  timelineProgressbar.tabIndex = "2";

  if (settings.subtitles.length) {
    const subtitleBtnElement = document.createElement("button");
    subtitleBtnElement.id = "subtitle-btn";
    dropdown.querySelector("#setting-dropdown").append(subtitleBtnElement);
    const { subtitleBtn } = await import("./defaultsHtml.js");
    subtitleBtnElement.innerHTML = subtitleBtn;
    const { onCueChange } = await import("./utils.js");

    settings.subtitles.forEach((subtitle) => {
      const track = document.createElement("track");
      track.src = subtitle.url;
      track.srclang = subtitle.lang;
      track.kind = "captions";
      track.default = true;
      video.append(track);
      video.addEventListener("timeupdate", (event) =>
        onCueChange(event, toggleSubtitle)
      );
    });
    const subtitleBtnSpan = subtitleBtnElement.querySelector("span");
    subtitleBtnSpan.textContent = toggleSubtitle ? "On" : "Off";
    subtitleBtnElement.addEventListener("click", function () {
      toggleSubtitle = !toggleSubtitle;
      subtitleBtnSpan.textContent = toggleSubtitle ? "On" : "Off";
    });
  }

  if (settings.url && settings.selector) {
    const urlSplit = settings.url.split(".");

    if (urlSplit.length > 1) {
      const format = urlSplit[urlSplit.length - 1].toLowerCase();
      const checkHlsDash = hlsDashjs(settings.selector, settings.url);

      // Dynamic Adaptive Dash / HTTP Live Steam
      if (checkHlsDash[format]) {
        const obj = checkHlsDash[format];
        if (!document.querySelector(`script#videomania-${format}`)) {
          const { addScript } = await import("./utils.js");
          const script = addScript(obj.url, format);
          script.onload = obj.init;
        } else {
          obj.init();
        }
      }
      // Supported HTML 5 Video Format
      else if (supportedVideoFormat.includes(format)) {
        const { checkVideoBuffer } = await import("./utils.js");
        checkVideoBuffer(video, settings.selector);
        if (settings.qualities.length) {
          dropdown
            .querySelector("#setting-dropdown")
            .insertAdjacentHTML("beforeend", qualityBtn);
          video.src = settings.url;
          dropdown.insertAdjacentHTML("beforeend", qualityList);
          settings.qualities.forEach((quality) => {
            dropdown
              .querySelector("#quality-list")
              .insertAdjacentHTML(
                "beforeend",
                `<button>${quality.size}</button>`
              );
          });
          dropdown
            .querySelector("#quality-list")
            .insertAdjacentHTML(
              "beforeend",
              '<button class="active">Auto</button>'
            );
        } else {
          video.src = settings.url;
        }
        videoAppend();

        if (document.querySelector(`${settings.selector} #quality-list`)) {
          const { qualityListHeight } = await import("./utils.js");
          qualityListHeight(settings.selector);
        }

        document
          .querySelector(`${settings.selector} #quality-btn`)
          ?.addEventListener("click", () => {
            dropdown.classList.add("show-quality");
            dropdown.classList.add("dropdown-active");
          });

        document
          .querySelector(`${settings.selector} #quality-list .dropdown-back`)
          ?.addEventListener("click", () => {
            dropdown.classList.remove("dropdown-active");
            setTimeout(() => {
              dropdown.classList = [];
            }, 150);
          });
        document
          .querySelectorAll(
            `${settings.selector} #quality-list button:not(.dropdown-back)`
          )
          .forEach(function (elm) {
            elm.addEventListener("click", (e) => {
              const btn = e.target;
              if (!elm.classList.contains("active")) {
                const size = elm.textContent;
                if (size != "Auto") {
                  const src = settings.qualities.find(
                    (q) => q.size == size
                  )?.src;
                  if (src) {
                    const { currentTime } = video;
                    video.src = src;
                    video.currentTime = currentTime;
                  }
                } else {
                  const { currentTime } = video;
                  video.src = settings.url;
                  video.currentTime = currentTime;
                }
                document
                  .querySelector(
                    `${settings.selector} #quality-list button.active`
                  )
                  .classList.remove("active");
                btn.classList.add("active");
              }
            });
          });
      } else {
        document
          .querySelector(settings.selector)
          .insertAdjacentHTML(
            "beforeend",
            `<div class="player-error" style="width: ${settings.width}px; height: ${settings.height}px"><?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 612 792;" version="1.1" viewBox="0 0 612 792" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon class="st0" points="382.2,396.4 560.8,217.8 484,141 305.4,319.6 126.8,141 50,217.8 228.6,396.4 50,575 126.8,651.8    305.4,473.2 484,651.8 560.8,575 382.2,396.4  "/></g></svg>Please add a valid video url</div>`
          );
      }
    }

    document
      .querySelector(settings.selector)
      .addEventListener("videoManiaInit", videoAppend);
  }
}

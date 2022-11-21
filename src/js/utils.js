export function addScript(url, id) {
  const script = document.createElement("script");
  script.src = url;
  script.id = `videomania-${id}`;
  document.body.append(script);
  return script;
}

export function qualityListHeight(selector) {
  const selectorElement = document.querySelector(`${selector} dropdown`);
  const selectorComputed = getComputedStyle(selectorElement);
  const { paddingTop, paddingBottom } = selectorComputed;
  const { offsetHeight } = document.querySelector(`${selector} #quality-list`);
  const style = `@layer settings {${selector} dropdown.show-quality{height: ${
    offsetHeight + parseInt(paddingTop) + parseInt(paddingBottom)
  }px}}`;
  document
    .querySelector("#videomania-style")
    .insertAdjacentHTML("beforeend", style);
}

export async function forwardRewindIcon(player, key) {
  const { rewindIcon, forwardIcon } = await import("./icons.js");
  if (key === "ArrowLeft" || key === "ArrowRight") {
    const forwardRewind = document.createElement("forward-rewind");
    forwardRewind.innerHTML = key === "ArrowLeft" ? rewindIcon : forwardIcon;
    forwardRewind.id = "forward-rewind";
    player.append(forwardRewind);
    setTimeout(() => {
      player.querySelector("#forward-rewind").remove();
    }, 300);
  }
}

export async function volumeIcon(player, key) {
  const { muteIcon, audioIcon } = await import("./icons.js");
  if (key === "m") {
    const forwardRewind = document.createElement("forward-rewind");
    const video = player.querySelector("video");
    forwardRewind.innerHTML = video.muted ? muteIcon : audioIcon;
    forwardRewind.id = "volume-change";
    player.append(forwardRewind);
    setTimeout(() => {
      player.querySelector("#volume-change").remove();
    }, 300);
  }
}

export async function replayIconBtn(player) {
  const { replayIcon } = await import("./icons.js");
  const replay = document.createElement("replay");
  const { video } = player;
  replay.innerHTML = replayIcon;
  player.append(replay);
  replay.addEventListener("click", function (e) {4
    e.preventDefault()
    replay.remove()
    video.play()
    player.dataset.toggle = 'played'
  });
}

export const initialObj = {
  selector: null,
  width: 800,
  height: 450,
  autoplay: false,
  muted: false,
  loop: false,
  url: null,
  id: null,
  qualities: [],
  subtitles: [],
  toggleSubtitle: false,
  forward: 10,
  backward: 10
};

export const videoManiaInitEvent = new Event("videoManiaInit");

export async function videoManiaLive(selector) {
  const { liveIcon } = await import('./icons.js')
  const live = document.createElement("live");
  live.innerHTML = liveIcon;
  live.append("Live");
  selector.querySelector("timeline").remove();
  selector.querySelector("play").after(live);
}

export function videoDurationFormat(video, subtract = false) {
  const date = new Date(null);
  const seconds = subtract
    ? video.duration - video.currentTime
    : video.duration;
  if (seconds != Infinity) {
    date.setSeconds(seconds);
    const formatDuration = date.toISOString().substr(11, 8);
    if (formatDuration.split(":")[0] != "00") {
      return (subtract ? "-" : "") + formatDuration;
    }
    const splitHMS = formatDuration.split(":");
    return `${subtract ? "-" : ""}${splitHMS[1]}:${splitHMS[2]}`;
  }
}

export function setDropdownSettingHeight(selector) {
  const selectorElementList = selector.setting.querySelector('#setting-dropdown')
  const selectorElement = selector.dropdown;
  const player = selector.parentElement
  const { offsetHeight } = selectorElementList;
  const selectorComputed = getComputedStyle(selectorElement);
  const { paddingTop, paddingBottom } = selectorComputed;
  console.log({ paddingTop, paddingBottom } );
  const totalHeight =
    offsetHeight + parseInt(paddingTop) + parseInt(paddingBottom);
  const style = `@layer settings ${player.dataset.selector} dropdown{height: ${totalHeight}px}}`;
  document
    .querySelector("#videomania-style") 
    .insertAdjacentHTML("beforeend", style);
}

export function onCueChange(event, toggleSubtitle) {
  for (let j = 0; j < event.target.textTracks.length; j++) {
    event.target.textTracks[j].mode = toggleSubtitle ? "showing" : "hidden";
    for (let i = 0; i < event.target.textTracks[j].cues.length; i++) {
      event.target.textTracks[j].cues[i].line = -2.5;
    }
  }
}

export async function checkVideoBuffer(element) {
  let checkInterval = 50.0; // check every 50 ms (do not use lower values)
  let lastPlayPos = 0;
  let currentPlayPos = 0;
  let bufferingDetected = false;
  const evts = await import('./events.js')

  const { video } = element

  setInterval(checkBuffering, checkInterval);

  function checkBuffering() {
    currentPlayPos = video.currentTime;

    // checking offset should be at most the check interval
    // but allow for some margin
    const offset = (checkInterval - 20) / 1000;

    // if no buffering is currently detected,
    // and the position does not seem to increase
    // and the player isn't manually paused...
    if (
      !bufferingDetected &&
      currentPlayPos < lastPlayPos + offset &&
      !video.paused && video.playable >= 1
    ) {
      bufferingDetected = true;
    }

    // if we were buffering but the player has advanced,
    // then there is no buffering
    if (
      bufferingDetected &&
      currentPlayPos > lastPlayPos + offset &&
      !video.paused
    ) {
      bufferingDetected = false;
    }
    lastPlayPos = currentPlayPos;
    
    const event = bufferingDetected ? evts.default.loading : evts.default.loaded;
    triggerEvent(event, element);
  }
}

export const retrieveFormat = (url) => url.split('.')[url.split('.').length - 1].toLowerCase();

export const triggerEvent = (eventName, element) => element.dispatchEvent(new Event(eventName))
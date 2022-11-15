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
  const style = `${selector} dropdown.show-quality{height: ${
    offsetHeight + parseInt(paddingTop) + parseInt(paddingBottom)
  }px}`;
  document
    .querySelector("#videomania-style")
    .insertAdjacentHTML("beforeend", style);
}

export async function forwardRewindIcon(player, key) {
  const { rewindIcon, forwardIcon } = await import('./icons.js')
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
};

export const videoManiaInitEvent = new Event("videoManiaInit");

export function videoManiaLive(selector) {
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
  const selectorElementList = document.querySelector(
    `${selector} #setting-dropdown`
  );
  const selectorElement = document.querySelector(`${selector} dropdown`);
  const { offsetHeight } = selectorElementList;
  const selectorComputed = getComputedStyle(selectorElement);
  const { paddingTop, paddingBottom } = selectorComputed;
  const totalHeight =
    offsetHeight + parseInt(paddingTop) + parseInt(paddingBottom);
  const style = `${selector} dropdown{height: ${totalHeight}px}`;
  document
    .querySelector("#videomania-style")
    .insertAdjacentHTML("beforeend", style);
}
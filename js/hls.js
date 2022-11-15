export default async function (selector, url) {
  const { videoManiaInitEvent, setDropdownSettingHeight, qualityListHeight } =
    await import("./utils.js");
  const { qualityBtn, qualityList } = await import("./defaultsHtml.js");
  document.querySelector(selector).dispatchEvent(videoManiaInitEvent);
  const appendedSelector = document.querySelector(selector);
  const appendedVideo = appendedSelector.querySelector(`${selector} video`);
  const videoSrc = url;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(appendedVideo);
    console.log(Hls.Events);
    hls.on(Hls.Events.LEVEL_UPDATED, async function (name, event) {
      if (event.details.live && !appendedSelctor.querySelector("live")) {
        videoManiaLive(appendedSelector);
      }
    });
    hls.on(Hls.Events.BUFFER_CREATED, async function (name, event) {
      if (hls.levels.length > 1) {
        appendedSelector
          .querySelector("#setting-dropdown")
          .insertAdjacentHTML("beforeend", qualityBtn);
        setDropdownSettingHeight(selector);
        appendedSelector
          .querySelector("dropdown")
          .insertAdjacentHTML("beforeend", qualityList);
        appendedSelector
          .querySelector(`#quality-btn`)
          ?.addEventListener("click", () => {
            const dropdown = appendedSelector.querySelector("dropdown");
            dropdown.classList.add("show-quality");
            dropdown.classList.add("dropdown-active");
          });
        hls.levels.forEach((level) => {
          appendedSelector
            .querySelector("dropdown #quality-list")
            .insertAdjacentHTML(
              "beforeend",
              `<button data-id="${level.id}">${level.height}</button>`
            );
        });
        appendedSelector
          .querySelector("dropdown #quality-list")
          .insertAdjacentHTML(
            "beforeend",
            '<button class="active" data-index="-1">Auto</button>'
          );
        qualityListHeight(selector);
      }
    });
    document
      .querySelector(`${selector} video`)
      .addEventListener("loadedVideoData", function () {
        console.log(hls.levels);
      });
  } else if (appendedVideo.canPlayType("application/vnd.apple.mpegurl")) {
    appendedVideo.src = videoSrc;
  } else {
    return null
  }
}

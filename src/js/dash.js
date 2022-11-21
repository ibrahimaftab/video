export default async function (selector, url) {
  const { addLoader, removeLoader } = await import("./loader.js");
  const { qualityBtn, qualityList } = await import("./defaultsHtml.js");
  const { qualityListHeight, videoManiaInitEvent, setDropdownSettingHeight } =
    await import("./utils.js");
  document.querySelector(selector).dispatchEvent(videoManiaInitEvent);
  const vdo = dashjs.MediaPlayer().create();
  const appendedSelector = document.querySelector(selector);
  const appendedVideo = appendedSelector.querySelector(`video`);
  let defaultQuality = NaN;
  vdo.initialize(appendedVideo, url, true);
  vdo.on(dashjs.MediaPlayer.events.BUFFER_EMPTY, function () {
    addLoader(appendedSelector);
  });
  vdo.on(dashjs.MediaPlayer.events.BUFFER_LOADED, function () {
    removeLoader(appendedSelector);
  });
  vdo.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, async function (e) {
    const { videoManiaLive } = await import("./utils.js");
    const bitrates = vdo.getBitrateInfoListFor("video");
    defaultQuality = bitrates[0].qualityIndex
    if (e.streamInfo.manifestInfo.isDynamic) {
      videoManiaLive(appendedSelector);
    }
    // set max quality
    vdo.setQualityFor("video", -1);

    if (bitrates.length > 1) {
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
      bitrates.forEach((bitrate, index) => {
        appendedSelector
          .querySelector("dropdown #quality-list")
          .insertAdjacentHTML(
            "beforeend",
            `<button data-index="${bitrate.qualityIndex}">${bitrate.height}</button>`
          );
      });
      appendedSelector
        .querySelector("dropdown #quality-list")
        .insertAdjacentHTML(
          "beforeend",
          `<button class="active" data-index="-1">Auto <span class="quality-auto">${bitrates[0].height}</span></button>`
        );
      qualityListHeight(selector);
      appendedSelector
        .querySelector(`#quality-list .dropdown-back`)
        ?.addEventListener("click", () => {
          const dropdown = appendedSelector.querySelector("dropdown");
          if (dropdown.classList.contains("dropdown-active")) {
            dropdown.classList.remove("dropdown-active");
            setTimeout(() => {
              dropdown.classList = [];
            }, 150);
          }
        });
      appendedSelector
        .querySelectorAll(`#quality-list button:not(.dropdown-back)`)
        .forEach(function (elm) {
          elm.addEventListener("click", (e) => {
            const btn = e.target;
            if (!elm.classList.contains("active")) {
              const { index } = btn.dataset;
              appendedSelector
                .querySelector(`#quality-list button.active`)
                .classList.remove("active");
              btn.classList.add("active");
              appendedSelector.querySelector(".quality-auto").textContent =
                btn.textContent;
              defaultQuality = Number(index)
              vdo.setQualityFor("video", defaultQuality);
            }
          });
        });
      appendedSelector.querySelector("timeline-progressbar").addEventListener('click', function() {
        vdo.setQualityFor("video", defaultQuality);
      });
    }
  });
}

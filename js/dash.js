export default async function (selector, url) {
  const { addLoader, removeLoader } = await import('./loader.js')
  const { qualityBtn, qualityList } = await import("./defaultsHtml.js");
  const { qualityListHeight, videoManiaInitEvent, setDropdownSettingHeight } =
    await import("./utils.js");
  document.querySelector(selector).dispatchEvent(videoManiaInitEvent);
  const vdo = dashjs.MediaPlayer().create();
  const appendedSelector = document.querySelector(selector);
  const appendedVideo = appendedSelector.querySelector(`video`);
  vdo.initialize(appendedVideo, url, true);
  vdo.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_STATE_CHANGED, function () {
    addLoader(appendedSelector);
  });
  vdo.on(dashjs.MediaPlayer.events.BUFFER_LOADED, function () {
    removeLoader(appendedSelector);
  });
  vdo.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {
    const bitrates = vdo.getBitrateInfoListFor("video");
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
          '<button class="active" data-index="-1">Auto</button>'
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
              vdo.setQualityFor("video", index);
              console.log(index);
            }
          });
        });
    }
  });
}

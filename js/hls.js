export default async function (selector, url) {
  const { videoManiaInitEvent, setDropdownSettingHeight, qualityListHeight } =
    await import("./utils.js");
  const { qualityBtn, qualityList } = await import("./defaultsHtml.js");
  const { addLoader, removeLoader } = await import("./loader.js")
  const appendedSelector = document.querySelector(selector);
  appendedSelector.dispatchEvent(videoManiaInitEvent);
  const appendedVideo = appendedSelector.querySelector(`${selector} video`);
  const videoSrc = url;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(appendedVideo);
    hls.on(Hls.Events.LEVEL_UPDATED, async function (name, event) {
      removeLoader(appendedSelector);
      if (event.details.live && !appendedSelctor.querySelector("live")) {
        videoManiaLive(appendedSelector);
      }
    });
    hls.on(Hls.Events.LEVEL_SWITCHING, async function (name, event) {
      addLoader(appendedSelector);
    });
    hls.on(Hls.Events.LEVEL_SWITCHED, async function (name, event) {
      removeLoader(appendedSelector);
      if (
        hls.currentLevel > 0 ||
        appendedSelector.querySelector("#quality-list.active").textContent == 'Auto'
      ) {
        appendedSelector.querySelector(".quality-auto").textContent =
          hls.levels.find((level, i) => i === hls.currentLevel).height;
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
        hls.levels.forEach((level,i) => {
          appendedSelector
            .querySelector("dropdown #quality-list")
            .insertAdjacentHTML(
              "beforeend",
              `<button data-id="${i}">${level.height}</button>`
            );
        });
        appendedSelector
          .querySelector("dropdown #quality-list")
          .insertAdjacentHTML(
            "beforeend",
            `<button class="active" data-id="-1">Auto <span class="quality-auto">${hls.levels[0].height}</span></button>`
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
          .forEach(function (elm, i) {
            elm.addEventListener("click", (e) => {
              const btn = e.target;
              if (!elm.classList.contains("active")) {
                const { id } = btn.dataset;
                appendedSelector
                  .querySelector(`#quality-list button.active`)
                  .classList.remove("active");
                btn.classList.add("active");
                hls.currentLevel = Number(id)
                if (Number(id) > 0) {
                  appendedSelector.querySelector(".quality-auto").textContent =
                    hls.levels.find((level, i) => i === Number(id)).height;
                }
              }
            });
          });
          setInterval(()=> {
                console.log(hls.currentLevel);

          }, 1e3)
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

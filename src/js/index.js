import defaultConfig from "./defaultConfig.js"

const allSupportedFormat = ["mp4", "webm", "ogg", "m3u8", "mpd"];

function videoMania(config, placement = "beforeend") {
  const element = document.querySelector(config?.selector);

  if (element) {
    const splitUrl = config.url.split(".");
    const extension = splitUrl[splitUrl.length - 1];
    if (!customElements.get("vm-player")) {
       import("./components/player.js")
          .then(Player => {
            customElements.define("vm-player", Player.default);
          })
    }
    if (allSupportedFormat.includes(extension)) {
      const setting = {
        ...defaultConfig,
        ...config,
      };;
      element.videoManiaConfig = setting

      element.insertAdjacentHTML(
        placement,
        `<vm-player data-selector="${setting.selector}" />`
      );
      const playerHtml = element.querySelector("vm-player");
      return playerHtml;
    } else {
      // handling error if invalid url
      element.insertAdjacentHTML(
        "beforeend",
        `<div class="player-error" style="width: ${setting.width}px; height: ${setting.height}px"><?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 612 792;" version="1.1" viewBox="0 0 612 792" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon class="st0" points="382.2,396.4 560.8,217.8 484,141 305.4,319.6 126.8,141 50,217.8 228.6,396.4 50,575 126.8,651.8    305.4,473.2 484,651.8 560.8,575 382.2,396.4  "/></g></svg><p>Incorrect <strong>{video url}</strong></p></div>`
      );
      throw new Error("Incorrect {video url}");
    }
  } else {
    const msg = setting.selector
      ? `Could not find element {${setting.selector}}`
      : "Please add selector {selector: (class or id)}";
    // handling error if selector is invalid
    throw new Error(msg);
  }
  return {
    addEventListener: () => {},
  };
}

export default videoMania
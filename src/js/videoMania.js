~include("./events.js");
~include("./components/player.js");

function videoMania(config, placement = "beforeend") {
  if(!customElements.get('vm-player')) {
    customElements.define("vm-player", Player);
  }
  if (document.querySelector(config?.selector)) {
    if (config.url.split(".").length > 1) {
      document.querySelector(config?.selector).videoManiaConfig = {
        width: 800, // default width
        height: 450, // default height
        autoplay: false,
        muted: false,
        loop: false,
        url: null,
        id: null,
        qualities: [],
        subtitles: [],
        toggleSubtitle: false,
        forward: 10, // 10 second by default
        backward: 10, // 10 second by default
        controls: true,
        rounded: true,
        ...config,
      };
    } else {
      // handling error if invalid url
    }
    const element = document.querySelector(config.selector);

    element.insertAdjacentHTML(
      placement,
      `<vm-player data-selector="${config.selector}" />`
    );
    const player = element.querySelector('vm-player')
    
    // player.on = function (eventName, func) {
    //   const event = events[eventName];
    //   if (event) {
    //     player.addEventlistener(event, func, false);
    //   } else {
    //     player.addEventlistener(eventName, func, false);
    //   }
    // };

    return player
    
  } else {
    // handling error if selector is invalid
  }
}

// console.log(videoMania.prototype.on)

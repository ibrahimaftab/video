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

export default async function initiate(config, placement = 'beforeend') {
  if(document.querySelector(config?.selector)) {

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

    const player = await import('../components/player.js')
    const element = document.querySelector(config.selector)
    customElements.define("vm-player", player.default);
    element.insertAdjacentHTML(placement, `<vm-player data-selector="${config.selector}" />`)
  } else {
    // handling error if selector is invalid
  }
}
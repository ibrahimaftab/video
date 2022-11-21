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
}

export const dynamicFormats = ['m3u8','mpd']

const initDynamic = (selector, url) => ({
  // HTTP Live Streaming
  m3u8: {
    url: `https://cdn.jsdelivr.net/npm/hls.js@1`,
    init: async () => {
      if (!window.videoManiaHlsjs) {
        const file = await import("../hls.js");
        window.videoManiaHlsjs = file.default;
      }
      window.videoManiaHlsjs(selector, url);
    },
  },

  // Dynamic Adaptive Streaming over HTTP
  mpd: {
    url: `https://cdnjs.cloudflare.com/ajax/libs/dashjs/4.5.0/dash.all.min.js`,
    init: async () => {
      if (!videoManiaDashjs) {
        const file = await import("../dash.js");
        videoManiaDashjs = file.default;
      }
      videoManiaDashjs(selector, url);
    },
  },
});

export default initDynamic;
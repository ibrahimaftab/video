export const dynamicFormats = ["m3u8","mpd"]

const initiate = async (functionName, path, selector, url) => {
	if (!window[functionName]) {
		const file = await import(`./${path}`)
		window[functionName] = file.default
	}
	window[functionName](selector, url)
}

const initDynamic = (selector, url) => ({
	// HTTP Live Streaming
	m3u8: {
		url: "https://cdn.jsdelivr.net/npm/hls.js@1",
		init: async () =>
			await initiate("videoManiaHlsjs", "hls.js", selector, url),
	},

	// Dynamic Adaptive Streaming over HTTP
	mpd: {
		url: "https://cdnjs.cloudflare.com/ajax/libs/dashjs/4.5.0/dash.all.min.js",
		init: async () => await initiate("videoManiaDashjs", "dash.js", selector, url),
	},
})

export default initDynamic
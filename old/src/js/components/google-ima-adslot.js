import "../../css/google-ads.css"
import events from "../events"
import { triggerEvent } from "../utils"

let self = null
export default class AdSlot extends HTMLElement {
	player = null
	adDisplayContainer = null
	adsLoader = false
	adsManager = null
	adsLoaded = false
	video = null
	#adsTagUrl = null

	constructor() {
		super()
		this.player = this.parentElement
		this.video = this.player.video
		// this.#adsTagUrl = this.player.#setting.googleAdsTagUrl;
		this.id = "ad-container"
		self = this
	}

	initializeIMA() {
		// imaScript.onload = function () {
		self.adDisplayContainer = new google.ima.AdDisplayContainer(
			self,
			self.video
		)
		self.adsLoader = new google.ima.AdsLoader(self.adDisplayContainer)
		self.adsLoader.addEventListener(
			google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
			self.onAdsManagerLoaded,
			false
		)
		self.adsLoader.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			self.onAdError,
			false
		)

		// Let the AdsLoader know when the video has ended
		self.video.addEventListener("ended", function () {
			self.adsLoader.contentComplete()
		})

		var adsRequest = new google.ima.AdsRequest()
		adsRequest.adTagUrl =
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="

		// Specify the linear and nonlinear slot sizes. self helps the SDK to
		// select the correct creative if multiple are returned.
		adsRequest.linearAdSlotWidth = self.video.clientWidth
		adsRequest.linearAdSlotHeight = self.video.clientHeight
		adsRequest.nonLinearAdSlotWidth = self.video.clientWidth
		adsRequest.nonLinearAdSlotHeight = self.video.clientHeight / 3

		// Pass the request to the adsLoader to request ads
		self.adsLoader.requestAds(adsRequest)
		// };
	}

	adContainerClick(event) {
		if (self.player.dataset.toggled === "played") {
			triggerEvent(events.pause, self.player)
		} else {
			triggerEvent(events.play, self.player)
		}
	}

	onAdsManagerLoaded(adsManagerLoadedEvent) {
		// Instantiate the AdsManager from the adsLoader response and pass it the video element
		self.adsManager = adsManagerLoadedEvent.getAdsManager(self.video)
		self.adsManager.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			self.onAdError
		)
		self.adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
			self.onContentPauseRequested
		)
		self.adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
			self.onContentResumeRequested
		)
		self.adsManager.addEventListener(
			google.ima.AdEvent.Type.LOADED,
			self.onAdLoaded
		)
		self.adsManager.addEventListener(
			google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
			self.onAdComplete
		)
	}

	onAdLoaded(adEvent) {
		self.classList.add("active")
		self.player.adsActive = true
		var ad = adEvent.getAd()
		if (!ad.isLinear()) {
			// check if ads is non linear
			self.video.play()
		}
	}

	onAdComplete(adEvent) {
		self.classList.remove("active")
		self.player.adsActive = false
	}

	onContentPauseRequested() {
		triggerEvent(events.pause, self.player)
	}

	onContentResumeRequested() {
		triggerEvent(events.play, self.player)
	}

	onAdError(adErrorEvent) {
		// Handle the error logging.
		if (self.adsManager) {
			self.adsManager.destroy()
		}
	}

	loadAds(event) {
		console.log(self.adsLoaded)
		// Prevent this function from running on if there are already ads loaded
		if (self.adsLoaded) {
			return
		}
		self.adsLoaded = true

		// Prevent triggering immediate playback when ads are loading
		event.preventDefault()

		// Initialize the container. Must be done via a user action on mobile devices.
		self.video.load()
		self.adDisplayContainer.initialize()

		var width = self.video.clientWidth
		var height = self.video.clientHeight
		try {
			self.adsManager.init(width, height, google.ima.ViewMode.NORMAL)
			self.adsManager.start()
		} catch (adError) {
			// Play the video without ads, if an error occurs
			self.video.play()
		}
	}

	connectedCallback() {
		self.player.addEventListener(events.initiated, function (event) {
			self.addEventListener("imascript-loaded", function () {
				self.initializeIMA()
				self.video.addEventListener("play", function (event) {
					self.loadAds(event)
				})
				// document.addEventListener('visibilitychange', function() {
				//   !document.hidden && self.video.play();
				// })
				// self.video.addEventListener("playing", function (event) {
				//   self.loadAds(event);
				// });
			})

			// Appending Google SDK Loader IMA
			const imaScript = document.createElement("script")
			imaScript.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
			document.body.append(imaScript)

			imaScript.onload = function () {
				triggerEvent("imascript-loaded", self)
			}
		})

		window.addEventListener("resize", function (event) {
			if (self.adsManager) {
				var width = self.video.clientWidth
				var height = self.video.clientHeight
				self.adsManager.resize(width, height, google.ima.ViewMode.NORMAL)
			}
		})
	}
}

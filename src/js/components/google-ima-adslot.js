export default class AdSlot extends HTMLElement {
  player = null;
  adDisplayContainer = null;
  adsLoader = false;
  adsManager = null;
  adsLoaded = false;
  video = null;
  #adsTagUrl = null;

  constructor() {
    super();
    this.player = this.parentElement;
    this.video = this.player.video;
    // this.#adsTagUrl = this.player.#setting.googleAdsTagUrl;
    this.id = "ad-container";
  }

  initializeIMA() {

    // Appending Google SDK Loader IMA
    // const imaScript = document.createElement("script");
    // imaScript.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js";
    // document.body.append(imaScript);

    // imaScript.onload = function () {
    this.adDisplayContainer = new google.ima.AdDisplayContainer(
      this,
      this.video
    );
    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
    this.adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.onAdsManagerLoaded,
      false
    );
    this.adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError,
      false
    );

    // Let the AdsLoader know when the video has ended
    this.addEventListener("ended", function () {
      this.adsLoader.contentComplete();
    });

    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl =
      "https://pubads.g.doubleclick.net/gampad/ads?" +
      "iu=/21775744923/external/single_ad_samples&sz=640x480&" +
      "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&" +
      "gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.
    adsRequest.linearAdSlotWidth = this.video.clientWidth;
    adsRequest.linearAdSlotHeight = this.video.clientHeight;
    adsRequest.nonLinearAdSlotWidth = this.video.clientWidth;
    adsRequest.nonLinearAdSlotHeight = this.video.clientHeight / 3;

    // Pass the request to the adsLoader to request ads
    this.adsLoader.requestAds(adsRequest);
    // };
  }

  adContainerClick(event) {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Instantiate the AdsManager from the adsLoader response and pass it the video element
    this.adsManager = adsManagerLoadedEvent.getAdsManager(this.video);
    this.adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError
    );
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      this.onContentPauseRequested
    );
    adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      this.onContentResumeRequested
    );
    adsManager.addEventListener(
      google.ima.AdEvent.Type.LOADED,
      this.onAdLoaded
    );
  }

  onAdLoaded(adEvent) {
    var ad = adEvent.getAd();
    if (!ad.isLinear()) {
      // check if ads is non linear
      this.video.play();
    }
  }

  onContentPauseRequested() {
    this.video.pause();
  }

  onContentResumeRequested() {
    this.video.play();
  }

  onAdError(adErrorEvent) {
    // Handle the error logging.
    if (this.adsManager) {
      this.adsManager.destroy();
    }
  }

  loadAds(event) {
    // Prevent this function from running on if there are already ads loaded
    if (this.adsLoaded) {
      return;
    }
    this.adsLoaded = true;

    // Prevent triggering immediate playback when ads are loading
    event.preventDefault();

    // Initialize the container. Must be done via a user action on mobile devices.
    this.video.load();
    this.adDisplayContainer.initialize();

    var width = this.video.clientWidth;
    var height = this.video.clientHeight;
    try {
      this.adsManager.init(width, height, google.ima.ViewMode.NORMAL);
      this.adsManager.start();
    } catch (adError) {
      // Play the video without ads, if an error occurs
      this.video.play();
    }
  }

  connectedCallback() {
    const self = this;
    window.addEventListener("load", function (event) {
      self.initializeIMA();
      self.video.addEventListener("play", function (event) {
        self.loadAds(event);
      });
    });

    window.addEventListener("resize", function (event) {
      if (self.adsManager) {
        var width = self.video.clientWidth;
        var height = self.video.clientHeight;
        self.adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
      }
    });
  }
}

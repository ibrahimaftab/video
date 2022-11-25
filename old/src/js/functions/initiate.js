export default async function initiate(config, func, placement = 'beforeend') {
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
    const playerHtml = element.querySelector("vm-player");
    func(playerHtml)
  } else {
    // handling error if selector is invalid
  }
}
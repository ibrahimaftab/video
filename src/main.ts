class SonicVibe extends HTMLElement {
  // #video: HTMLVideoElement
  constructor() {
    super();

    console.log(this);
  }
}

customElements.define("sonic-vibe", SonicVibe);

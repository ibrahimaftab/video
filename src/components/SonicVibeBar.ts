import type SonicVibe from "./SonicVibe";

export default class SonicVibeBar extends HTMLElement {
  constructor() {
    super();
    const player = this.parentElement as SonicVibe;
  }
}

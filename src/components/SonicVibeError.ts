export default class SonicVibeError extends HTMLElement {
  message = "No Video File Found";

  constructor(message?: string) {
    super();
    this.textContent = message ?? this.message;
  }
}

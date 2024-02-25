import { addStylesheet } from "../utils/functions";

export default class SonicVibeError extends HTMLElement {
  defaultMessage = "No Video File Found";
  message: string | null = null;

  constructor(message?: string) {
    super();
    this.message = message ?? this.defaultMessage;
  }
  connectedCallback() {
    addStylesheet("error");
    this.textContent = this.message;
  }
}

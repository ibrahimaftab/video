import { addStylesheet } from "../utils/functions";

export default class SonicVibeError extends HTMLElement {
  defaultMessage = "No Video File Found";
  message: string | null = null;
  constructor() {
    super();
  }
  connectedCallback() {
    addStylesheet("error");
  }
}

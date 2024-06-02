import type SonicVibe from "../components/SonicVibe";

export enum MediaType {
  video = "video",
  audio = "audio",
}

export abstract class SonicVibeChildComponent {
  protected player!: SonicVibe;
  create!: () => void;
}

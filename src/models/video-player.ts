import type SonicVibe from "../components/SonicVibe";

export interface VideoOptions {
  src: string;
  aspectRatio: string;
  autoplay: boolean;
  playsInline: boolean;
  muted: boolean;
}

export type VideoHtml = [
  HTMLVideoElement,
  HTMLElement,
  HTMLSpanElement,
  HTMLSpanElement,
  HTMLSpanElement
];

export default interface IVideoPlayer {
  createVideo: (options: VideoOptions, player: SonicVibe) => VideoHtml;
}

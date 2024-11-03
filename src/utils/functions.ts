import type SonicVibe from "../components/SonicVibe";
import SonicVibeEvents from "../events";
import { MediaType } from "../models/default-options";

/**
 * Check media file extension.
 * @param {string} file The Media File URL.
 * @returns {boolean} The value of the attribute or property.
 */
export function checkMediaFile(file: string) {
  return checkVideoFile(file) || checkAudioFile(file);
}

/**
 * Check video file extension.
 * @param {string} file The Video File URL.
 * @returns {boolean} The value of the attribute or property.
 */
export function checkVideoFile(file: string) {
  return /\.(mpd|m3u8|mp4|webm)$/g.test(file) && MediaType.video;
}

/**
 * Check audio file extension.
 * @param {string} file The Audio File URL.
 * @returns {boolean} The value of the attribute or property.
 */
export function checkAudioFile(file: string) {
  return /\.(ogg|mp3|wav|m4a)$/g.test(file) && MediaType.audio;
}

/**
 * Add stylesheet.
 * @param {string} filename Name Of The CSS File.
 * @returns {void}
 */
export function addStylesheet(filename: string) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/src/style/${filename}.css`;
  document.head.append(link);
}

/**
 * Format video duration
 * @param {number} seconds Video Duration.
 * @returns {string} Output should be "MM:SS" or "HH:MM:SS"
 */
export function formatVideoDuration(seconds: number) {
  type numstr = number | string;
  let hours: numstr = Math.floor(seconds / 3600);
  let minutes: numstr = Math.floor((seconds % 3600) / 60);
  let remainingSeconds: numstr = Math.floor(seconds % 60);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  if (+hours > 0) {
    return `${hours}:${minutes}:${remainingSeconds}`;
  } else {
    return `${minutes}:${remainingSeconds}`;
  }
}

/**
 * Media Total Buffered Duration
 * @param media Media Element of Video or Audio
 * @returns {number}
 */
export function calculateBufferedDuration(
  media: HTMLVideoElement | HTMLAudioElement
) {
  const buffered = media?.buffered;
  return buffered.end(buffered.length - 1);
}

/**
 * Dispatch Sonic Vibe Event
 * @param {SonicVibeEvents} event
 * @param {SonicVibe} player
 */
export function triggerEvent<T>(
  event: SonicVibeEvents,
  player: SonicVibe,
  payload?: T
) {
  player.dispatchEvent(
    new CustomEvent(event, { detail: payload, bubbles: true, cancelable: true })
  );
}

/**
 * Check boolean as string
 * @param {string} value
 */
export function checkBooleanString(value: string) {
  return value === "true";
}

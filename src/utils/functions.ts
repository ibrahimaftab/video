/**
 * Retrieves the default attribute value of an HTML element based on a property name.
 * @param {string} property The name of the attribute or property.
 * @param {T} element The HTML element from which to retrieve the attribute value.
 * @returns {string} The value of the attribute or property.
 */

export function elementDefaultAttribute<T extends HTMLElement, Y>(
  property: string,
  element: T
): Y {
  return (
    element.getAttribute(property) ??
    Object.getOwnPropertyDescriptor(element, property)?.value
  );
}

/**
 * Check media file extension.
 * @param {string} file The Video File URL.
 * @returns {boolean} The value of the attribute or property.
 */
export function checkMediaFile(file: string) {
  return /\.(mpd|m3u8|mp4|webm|ogg|mp3|wav)$/g.test(file);
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

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
 * @param {string} file The name of the attribute or property.
 * @returns {boolean} The value of the attribute or property.
 */
export function checkMediaFile(file: string) {
  const extensions = ["mpd", "m3u8", "mp4", "webm", "ogg", "mp3", "wav"];
  return Boolean(extensions.find((extension) => file.includes(extension)));
}

/**
 * Add stylesheet.
 * @param {string} filename The name of the css file.
 * @returns {void}
 */
export function addStylesheet(filename: string) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/src/style/${filename}.css`;
  document.head.append(link);
}

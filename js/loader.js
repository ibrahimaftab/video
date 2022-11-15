export async function addLoader(selector) {
  if (
    !selector.querySelector("loader") &&
    !selector.querySelector("#forward-rewind")
  ) {
    const loader = document.createElement("loader");
    const { loaderAnimatedIcon } = await import("./icons.js");
    loader.innerHTML = loaderAnimatedIcon;
    loader.id = "videoManiaLoader";
    selector.querySelector("player").append(loader);
  }
}

export function removeLoader(selector) {
  if (selector.querySelector("loader")) {
    selector.querySelector("#videoManiaLoader").remove();
  }
}

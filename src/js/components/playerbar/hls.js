export default async function (player) {
  const self = player.playerbar;
  const hls = player.hlsjs;
  const { triggerEvent } = await import("../../utils.js");
  triggerEvent(events.initiated, player);
  hls.on(Hls.Events.LEVEL_SWITCHED, async function (name, event) {
    if (
      hls.currentLevel > 0 ||
      player.querySelector("#quality-list.active")?.textContent == "Auto"
    ) {
      player.querySelector(".quality-auto").textContent = hls.levels.find(
        (level, i) => i === hls.currentLevel
      ).height;
    }
  });
  hls.on(Hls.Events.BUFFER_CREATED, async function (name, event) {
    if (hls.levels.length > 1) {
      self.createQualityDropdown(function () {
        hls.levels.forEach((level, i) => {
          player
            .querySelector("dropdown #quality-list")
            .insertAdjacentHTML(
              "beforeend",
              `<button data-id="${i}">${level.height}</button>`
            );
        });
        player
          .querySelector("dropdown #quality-list")
          .insertAdjacentHTML(
            "beforeend",
            `<button class="active" data-id="-1">Auto <span class="quality-auto">${hls.levels[0].height}</span></button>`
          );
        player
          .querySelectorAll(`#quality-list button:not(.dropdown-back)`)
          .forEach(function (elm, i) {
            elm.addEventListener("click", (e) => {
              const btn = e.target;
              if (!elm.classList.contains("active")) {
                const { id } = btn.dataset;
                player
                  .querySelector(`#quality-list button.active`)
                  .classList.remove("active");
                btn.classList.add("active");
                hls.currentLevel = Number(id);
                if (Number(id) > 0) {
                  player.querySelector(".quality-auto").textContent =
                    hls.levels.find((level, i) => i === Number(id)).height;
                }
              }
            });
          });
      });
    }
  });
  let initiate = false
  hls.on(Hls.Events.LEVEL_UPDATED, async function (name, event) {
    if(!initiate) {
      initiate = true
      const live = event.details.live
      self.initiate(!live);
    }
  });
}

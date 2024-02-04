import events from "../../events";
import { triggerEvent } from "../../utils";

export default function (player) {
  const self = player.playerbar;
  const hls = player.hlsjs;
  hls.on(Hls.Events.LEVEL_SWITCHED, function () {
    if (
      hls.currentLevel > 0 ||
      player.querySelector("#quality-list.active")?.textContent == "Auto"
    ) {
      player.querySelector(".quality-auto").textContent = hls.levels.find(
        (level, i) => i === hls.currentLevel
      ).height;
    }
  });
  player.addEventListener("hlsBufferCreated", function () {
    if (player.levels.length > 1) {
      self.createQualityDropdown(function () {
        player.levels.forEach((level, i) => {
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
            `<button class="active" data-id="-1">Auto <span class="quality-auto">${player.levels[0].height}</span></button>`
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
                    player.levels.find((level, i) => i === Number(id)).height;
                }
              }
            });
          });
      });
    }
  });
  triggerEvent(events.initiated, player);
}

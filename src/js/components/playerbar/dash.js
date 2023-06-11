import events from "../../events";

export default async function (player) {
  const self = player.playerbar;
  const vdo = player.dashjs;
  self.addEventListener("playerbar-initial-ready", async function (e) {
    let defaultQuality = player.bitrates[0].qualityIndex;
    
    vdo.setQualityFor("video", -1);

    if (player.bitrates.length > 1) {
      self.createQualityDropdown(function () {
        player.bitrates.forEach((bitrate, index) => {
          player
            .querySelector("dropdown #quality-list")
            .insertAdjacentHTML(
              "beforeend",
              `<button data-index="${bitrate.qualityIndex}">${bitrate.height}</button>`
            );
        });
        player
          .querySelector("dropdown #quality-list")
          .insertAdjacentHTML(
            "beforeend",
            `<button class="active" data-index="-1">Auto <span class="quality-auto">${player.bitrates[0].height}</span></button>`
          );
        player
          .querySelector(`#quality-list .dropdown-back`)
          ?.addEventListener("click", () => {
            const dropdown = player.querySelector("dropdown");
            if (dropdown.classList.contains("dropdown-active")) {
              dropdown.classList.remove("dropdown-active");
              setTimeout(() => {
                dropdown.classList = [];
              }, 150);
            }
          });
        player
          .querySelectorAll(`#quality-list button:not(.dropdown-back)`)
          .forEach(function (elm) {
            elm.addEventListener("click", (e) => {
              const btn = e.target;
              if (!elm.classList.contains("active")) {
                const { index } = btn.dataset;
                player
                  .querySelector(`#quality-list button.active`)
                  .classList.remove("active");
                btn.classList.add("active");
                player.querySelector(".quality-auto").textContent =
                  btn.textContent;
                defaultQuality = Number(index);
                vdo.setQualityFor("video", defaultQuality);
              }
            });
          });
      });
      
      player
        .querySelector("timeline-progressbar")
        ?.addEventListener("click", function () {
          vdo.setQualityFor("video", defaultQuality);
        });
    }
  });
  self.initiate(!player.live);
}

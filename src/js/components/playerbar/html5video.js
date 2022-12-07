const playableInitiate = function (player) {
  // Dropdown Qualities List
  const qualitiesList = player.qaulitiesList();
  const playerbar = player.playerbar

  // Dropdown Qualities List
  if (qualitiesList.length) {
    playerbar.createQualityDropdown(function () {
      const qualityDropdown = playerbar.dropdown.querySelector("#quality-list");

      // Qualities List Foreach
      qualitiesList.forEach((quality, index) => {
        qualityDropdown.insertAdjacentHTML(
          "beforeend",
          `<button class="vm-quality-btn" data-size="${quality.size}">${quality.size}</button>`
        );

        // Change Quality Button Click Event
        const btn = playerbar.dropdown.querySelector(
          `.vm-quality-btn[data-size="${quality.size}"]`
        );
        btn.addEventListener("click", function () {
          if (!btn.classList.contains("active")) {
            const url = qualitiesList.find(
              (quality) => quality.size == btn.dataset.size
            ).src;
            if (url) {
              const video = player.video;
              btn.parentElement
                .querySelector(".active")
                ?.classList.remove("active");
              btn.classList.add("active");
              const paused = video.paused;
              const currentTime = video.currentTime;
              video.src = url;
              video.currentTime = currentTime;
              if (paused) {
                video.pause();
              } else {
                video.play();
              }
            }
          }
        });
      });
    });
  }
};

export default playableInitiate
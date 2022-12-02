const playableInitiate = async function () {
  // Dropdown Qualities List
  const qualitiesList = player.qaulitiesList();

  // Dropdown Qualities List
  if (qualitiesList.length) {
    self.createQualityDropdown(function () {
      const qualityDropdown = self.dropdown.querySelector("#quality-list");

      // Qualities List Foreach
      qualitiesList.forEach((quality, index) => {
        qualityDropdown.insertAdjacentHTML(
          "beforeend",
          `<button class="vm-quality-btn" data-size="${quality.size}">${quality.size}</button>`
        );

        // Change Quality Button Click Event
        const btn = self.dropdown.querySelector(
          `.vm-quality-btn[data-size="${quality.size}"]`
        );
        btn.addEventListener("click", function () {
          if (!btn.classList.contains("active")) {
            const url = qualitiesList.find(
              (quality) => quality.size == btn.dataset.size
            ).src;
            if (url) {
              const video = self.parentElement.video;
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
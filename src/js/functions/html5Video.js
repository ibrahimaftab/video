export const supportedVideoFormat = ["mp4", "webm", "ogg"];

const html5Video = async (element) => {
  const { triggerEvent, checkVideoBuffer } = await import("../utils.js");
  const evts = await import("../events.js");
  checkVideoBuffer(element);
  setTimeout(() => {
    triggerEvent(evts.default.playable, element);
  }, 200);
};

export const playableInitiate = async function (element) {
  const player = element;
  const self = element.querySelector("vm-playerbar");
  const { videoDurationFormat } = await import("../utils.js");
  const timeline = document.createElement("timeline");
  const timelineProgressbar = document.createElement("timeline-progressbar");
  const timelineBuffer = document.createElement("timeline-buffer");
  const timelineProgress = document.createElement("timeline-progress");
  const end = document.createElement("end");
  timelineProgressbar.role = "button";
  timelineProgressbar.tabIndex = "3";
  const clonedTimelineProgress = timelineProgress.cloneNode();
  clonedTimelineProgress.classList.add("hover-timeline");
  timelineBuffer.style.width = "0px";
  timelineProgress.style.width = "0px";
  end.tabIndex = "4";
  end.role = "button";
  end.textContent = videoDurationFormat(player.video, self.durationSubstract);
  timelineProgressbar.append(
    timelineBuffer,
    timelineProgress,
    clonedTimelineProgress
  );
  timeline.append(timelineProgressbar, end);
  self.append(self.play, timeline, self.setting, self.toggleFullscreen);

  // Duration Substract
  let durationSubstract = false;

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

  // End Duration Click
  end.addEventListener("click", function (e) {
    e.preventDefault();
    durationSubstract = !durationSubstract;
    end.textContent = videoDurationFormat(player.video, durationSubstract);
  });

  // Video
  const { video } = player;

  // Timeline Progress Bar Mouse Move
  timelineProgressbar.addEventListener("mousemove", (e) => {
    const calcPosition = (e.layerX / e.target.clientWidth) * 100 + "%";
    clonedTimelineProgress.style.width = calcPosition;
  });

  // Timeline Progress Bar Mouse leave
  timelineProgressbar.addEventListener("mouseleave", (e) => {
    e.preventDefault();
    clonedTimelineProgress.style.width = `0px`;
  });

  // Timeline Progress Bar Click
  timelineProgressbar.addEventListener("click", function (e) {
    e.preventDefault();
    const calcPosition = e.layerX / e.target.clientWidth;
    timelineProgress.style.width = calcPosition * 100 + "%";
    video.currentTime = video.duration * calcPosition;
  });
};

export default html5Video;

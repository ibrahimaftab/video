import SonicVibeEvents from "../../events";
import {
  calculateBufferedDuration,
  formatVideoDuration,
} from "../../utils/functions";

const addTimeline = (id: string, plaberBarElement: HTMLElement) => {
  const { media } = player[id].instance;
  const timeline = document.createElement("div");
  timeline.classList.add("timeline");
  timeline.id = id + "-timeline";

  const updateProperties = (currentTime: number) => {
    const duration = media.duration;
    const percentage = (currentTime / duration) * 100;
    const formattedCurrentTime = formatVideoDuration(currentTime);
    const formattedDuration = formatVideoDuration(duration - currentTime);

    timeline.style.setProperty("--sonic-vibe-timeline", `${percentage}%`);
    timeline.style.setProperty(
      "--sonic-vibe-timeline-current",
      `"${formattedCurrentTime}"`
    );
    timeline.style.setProperty(
      "--sonic-vibe-timeline-duration",
      `"${
        timeline.classList.contains("timer-remaining")
          ? `-${formattedDuration}`
          : formatVideoDuration(duration)
      }"`
    );
  };

  const updateTimeline = () => updateProperties(media.currentTime);

  const toggleTimer = (event: MouseEvent) => {
    const { width, y, height } = plaberBarElement.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (isTimerButtonClicked(clientX, clientY, width, y, height)) {
      timeline.classList.toggle("timer-remaining");
    } else {
      seekTo(clientX, timeline.offsetWidth, media.duration);
    }
  };

  const isTimerButtonClicked = (
    clientX: number,
    clientY: number,
    width: number,
    y: number,
    height: number
  ) =>
    clientX > width - 60 &&
    clientX < width - 9 &&
    clientY > y - 30 &&
    clientY < y + height - 9;

  const seekTo = (clientX: number, barWidth: number, duration: number) => {
    const percentage = (clientX / barWidth) * 100;
    media.currentTime = (percentage / 100) * duration;
  };

  media.addEventListener("timeupdate", updateTimeline);
  media.addEventListener("progress", () => {
    timeline.style.setProperty(
      "--sonic-vibe-timeline-buffered",
      `${(calculateBufferedDuration(media) / media.duration) * 100}%`
    );
  });
  player[id].functions.click[id + "-timeline"] = toggleTimer;
  player[id].instance.addEventListener(SonicVibeEvents.forward, updateTimeline);
  player[id].instance.addEventListener(
    SonicVibeEvents.backward,
    updateTimeline
  );
  plaberBarElement.append(timeline);
};

export default addTimeline;

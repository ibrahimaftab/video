import type SonicVibe from "../components/SonicVibe";
import SonicVibeEvents from "../events";

/**
 * Adds event listeners to a player element.
 * @param {SonicVibe} player - The player element to add event listeners to.
 * @listens SonicVibeEvents.wheel - Adds a wheel event listener.
 * @listens SonicVibeEvents.keydown - Adds a keydown event listener.
 * @listens SonicVibeEvents.forward - Adds a forward event listener.
 * @listens SonicVibeEvents.backward - Adds a backward event listener.
 * @listens SonicVibeEvents.amplify - Adds an amplify event listener.
 * @listens SonicVibeEvents.deminish - Adds a deminish event listener.
 * @listens SonicVibeEvents.fullscreen - Adds a fullscreen event listener.
 * @listens SonicVibeEvents.play - Adds a play event listener.
 * @listens SonicVibeEvents.pause - Adds a pause event listener.
 * @listens SonicVibeEvents.mute - Adds a mute event listener.
 * @listens SonicVibeEvents.unmute - Adds an unmute event listener.
 * @listens SonicVibeEvents.click - Adds a click event listener.
 */
const addPlayerEvents = (player: SonicVibe) => {
  const { id } = player;
  player.addEventListener(SonicVibeEvents.wheel, handleWheel);
  player.addEventListener(SonicVibeEvents.keydown, handleKeyDown);
  player.addEventListener(SonicVibeEvents.forward, handleForward);
  player.addEventListener(SonicVibeEvents.backward, handleBackward);
  player.addEventListener(SonicVibeEvents.amplify, handleAmplify);
  player.addEventListener(SonicVibeEvents.deminish, handleDeminish);
  player.addEventListener(SonicVibeEvents.fullscreen, handleFullScreen);
  player.addEventListener(SonicVibeEvents.play, (e) => handlePlay(e, id));
  player.addEventListener(SonicVibeEvents.pause, (e) => handlePause(e, id));
  player.addEventListener(SonicVibeEvents.mute, handleMute);
  player.addEventListener(SonicVibeEvents.unmute, handleUnmute);
  player.addEventListener(SonicVibeEvents.click, (e) => handleClick(e, id));
};

/**
 * Handles a wheel event on a player element.
 * @param {WheelEvent} e - The wheel event.
 * @listens wheel - Adds a wheel event listener.
 * @fires SonicVibeEvents.forward - Fires a forward event if the user scrolls
 *   to the right.
 * @fires SonicVibeEvents.backward - Fires a backward event if the user scrolls
 *   to the left.
 * @fires SonicVibeEvents.amplify - Fires an amplify event if the user scrolls
 *   up.
 * @fires SonicVibeEvents.deminish - Fires a deminish event if the user scrolls
 *   down.
 */
const handleWheel = (e: WheelEvent) => {
  const { deltaX, deltaY, target } = e;
  const player = target as SonicVibe;
  const { currentTime, duration } = player.media;
  let event!: SonicVibeEvents;

  if (deltaX < -10 && currentTime + 1 < duration) {
    event = SonicVibeEvents.forward;
  } else if (deltaX > 10 && currentTime - 1 > 0) {
    event = SonicVibeEvents.backward;
  } else if (deltaY > 2) {
    event = SonicVibeEvents.amplify;
  } else if (deltaY < -2) {
    event = SonicVibeEvents.deminish;
  } else {
    return;
  }

  player.triggerEvent(event);

  e.stopPropagation();
  e.preventDefault();
};

/**
 * Toggles between play and pause for a player's media element.
 * @param {SonicVibe} player - The player element.
 * @returns {void}
 */
const togglePlayPause = (player: SonicVibe) =>
  player.media[player.media.paused ? "play" : "pause"]();

/**
 * Toggles mute and unmute for a player's media element.
 * @param {SonicVibe} player - The player element.
 * @returns {void}
 */
const toggleMute = (player: SonicVibe) => {
  const toggleMuteEvent = player.media.muted
    ? SonicVibeEvents.unmute
    : SonicVibeEvents.mute;
  player.triggerEvent(toggleMuteEvent, player);
};

// Define a helper function to handle key actions
const keyHandlers: { [key: string]: (player: SonicVibe) => void } = {
  /**
   * Handles the space bar key press.
   *
   * @param {SonicVibe} player - The SonicVibe instance.
   *
   * @fires SonicVibeEvents.play - If the media is paused.
   * @fires SonicVibeEvents.pause - If the media is playing.
   */
  " ": togglePlayPause,
  /**
   * If the right arrow key is pressed and the media allows it, triggers a
   * forward event.
   */
  ArrowRight: (player: SonicVibe) => {
    if (player.media.currentTime + 10 < player.media.duration) {
      player.triggerEvent(SonicVibeEvents.forward, player);
    }
  },
  /**
   * If the left arrow key is pressed and the media is more than 10 seconds into
   * the video, triggers a backward event.
   */
  ArrowLeft: (player: SonicVibe) => {
    if (player.media.currentTime > 10) {
      player.triggerEvent(SonicVibeEvents.backward, player);
    }
  },

  /**
   * Triggers a fullscreen event for the player.
   * @param {SonicVibe} player - The player element to trigger the fullscreen event on.
   */
  f: (player: SonicVibe) => {
    player.triggerEvent(SonicVibeEvents.fullscreen, player);
  },

  /**
   * Triggers a mute/unmute event for the player.
   * @param {SonicVibe} player - The player element to trigger the mute/unmute event on.
   */
  m: toggleMute,
};

/**
 * Handles a keydown event on a player element.
 * @param {KeyboardEvent} e - The keyboard event.
 * @listens keydown - Adds a keydown event listener.
 * @fires SonicVibeEvents.play - Triggers play event if space key is pressed and media is paused.
 * @fires SonicVibeEvents.pause - Triggers pause event if space key is pressed and media is playing.
 * @fires SonicVibeEvents.forward - Triggers a forward event if the right arrow key is pressed and the media allows it.
 * @fires SonicVibeEvents.backward - Triggers a backward event if the left arrow key is pressed and the media allows it.
 * @fires SonicVibeEvents.fullscreen - Triggers a fullscreen event if the 'f' key is pressed.
 * @fires SonicVibeEvents.mute - Triggers a mute event if the 'm' key is pressed and media is not muted.
 * @fires SonicVibeEvents.unmute - Triggers an unmute event if the 'm' key is pressed and media is muted.
 */
const handleKeyDown = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  const player = e.target as SonicVibe;
  keyHandlers[e.key]?.(player);
};

/**
 * Handles a forward event on a player element.
 * @param {Event} e - The forward event.
 * @fires SonicVibeEvents.forward - Triggers a forward event.
 */
const handleForward = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.currentTime += player.bidirectional;
};

/**
 * Handles a backward event on a player element.
 * @param {Event} e - The backward event.
 * @fires SonicVibeEvents.backward - Triggers a backward event.
 */
const handleBackward = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.currentTime -= player.bidirectional;
};

/**
 * Handles an amplify event on a player element.
 * @param {Event} e - The amplify event.
 * @fires SonicVibeEvents.unmute - Triggers an unmute event if the player is muted.
 * @description Increases the player's volume by 0.012 or sets it to 1 if it's
 *   already greater than 0.975.
 */
const handleAmplify = (e: Event) => {
  const player = e.target as SonicVibe;
  if (player.media.muted) player.triggerEvent(SonicVibeEvents.unmute, player);
  player.media.volume = Math.min(player.media.volume + 0.012, 1);
};

/**
 * Handles a deminish event on a player element.
 * @param {Event} e - The deminish event.
 * @fires SonicVibeEvents.unmute - Triggers an unmute event if the player is muted.
 * @description Decreases the player's volume by 0.012 or sets it to 0 if it's already
 *   less than 0.012.
 */
const handleDeminish = (e: Event) => {
  const player = e.target as SonicVibe;
  if (player.media.muted) player.triggerEvent(SonicVibeEvents.unmute, player);
  player.media.volume = Math.max(player.media.volume - 0.012, 0);
};

/**
 * Handles a fullscreen event on a player element.
 * @param {Event} e - The fullscreen event.
 * @description Toggles the player element's fullscreen mode on and off.
 */
const handleFullScreen = (e: Event) => {
  const player = e.target as SonicVibe;
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen();
};

/**
 * Handles a play event on a player element.
 * @param {Event} e - The play event.
 * @param {string} id - The id of the player.
 * @description Triggers any play event listeners associated with the player and
 *   plays the player's media.
 */
const handlePlay = (e: Event, id: string) => {
  const eventFor = (e.target as HTMLElement).id;
  player[id].functions.play[eventFor]?.(e);
  player[id].instance.media.play();
};

/**
 * Handles a pause event on a player element.
 * @param {Event} e - The pause event.
 * @param {string} id - The id of the player.
 * @description Triggers any pause event listeners associated with the player and
 *   pauses the player's media.
 */
const handlePause = (e: Event, id: string) => {
  const eventFor = (e.target as HTMLElement).id;
  player[id].functions.pause[eventFor]?.(e);
  player[id].instance.media.pause();
};

/**
 * Handles a mute event on a player element.
 * @param {Event} e - The mute event.
 * @description Sets the player's media's muted property to true.
 */
const handleMute = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.muted = true;
};

/**
 * Handles an unmute event on a player element.
 * @param {Event} e - The unmute event.
 * @description Sets the player's media's muted property to false.
 */
const handleUnmute = (e: Event) => {
  const player = e.target as SonicVibe;
  player.media.muted = false;
};

/**
 * Handles a click event on a player element.
 * @param {MouseEvent} e - The click event.
 * @param {string} id - The id of the player.
 * @description Triggers any click event listeners associated with the player.
 */
const handleClick = (e: MouseEvent, id: string) => {
  const eventFor = (e.target as HTMLElement).id;
  player[id].functions.click[eventFor](e);
};

export default addPlayerEvents;

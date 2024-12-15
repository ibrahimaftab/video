import type SonicVibe from "../components/SonicVibe";
import { SonicVibeEventsOps } from "../events";

type SonicVibeKeyboardEvent = {
  [key: string | symbol]: (e: KeyboardEvent) => void;
};
type SonicVibeMouseEvent = { [key: string | symbol]: (e: MouseEvent) => void };
type SonicVibeEvent = { [key: string | symbol]: (e: Event) => void };

enum SonicVibeGlobalEvents {
  instance = "instance",
  media = "media",
  click = SonicVibeEventsOps.click,
  play = SonicVibeEventsOps.play,
  pause = SonicVibeEventsOps.pause,
  keydown = SonicVibeEventsOps.keydown,
  mouseenter = SonicVibeEventsOps.mouseenter,
  mouseleave = SonicVibeEventsOps.mouseleave,
  mousemove = SonicVibeEventsOps.mousemove,
  mousedown = SonicVibeEventsOps.mousedown,
  mouseup = SonicVibeEventsOps.mouseup,
}

interface ISonicVibeGlobal {
  [SonicVibeGlobalEvents.instance]: { [key: string | symbol]: SonicVibe };
  [SonicVibeGlobalEvents.media]: { [key: string | symbol]: HTMLMediaElement };
  [SonicVibeGlobalEvents.click]: SonicVibeMouseEvent;
  [SonicVibeGlobalEvents.play]: SonicVibeEvent;
  [SonicVibeGlobalEvents.pause]: SonicVibeEvent;
  [SonicVibeGlobalEvents.keydown]: SonicVibeKeyboardEvent;
  [SonicVibeGlobalEvents.mouseenter]: SonicVibeMouseEvent;
  [SonicVibeGlobalEvents.mouseleave]: SonicVibeMouseEvent;
  [SonicVibeGlobalEvents.mousemove]: SonicVibeMouseEvent;
  [SonicVibeGlobalEvents.mousedown]: SonicVibeMouseEvent;
  [SonicVibeGlobalEvents.mouseup]: SonicVibeMouseEvent;
}

const sonicVibeGlobal: ISonicVibeGlobal = {
  [SonicVibeGlobalEvents.instance]: {},
  [SonicVibeGlobalEvents.media]: {},
  [SonicVibeEventsOps.click]: {},
  [SonicVibeEventsOps.play]: {},
  [SonicVibeEventsOps.pause]: {},
  [SonicVibeEventsOps.keydown]: {},
  [SonicVibeEventsOps.mouseenter]: {},
  [SonicVibeEventsOps.mouseleave]: {},
  [SonicVibeEventsOps.mousemove]: {},
  [SonicVibeEventsOps.mousedown]: {},
  [SonicVibeEventsOps.mouseup]: {},
};

/**
 * Proxy for accessing and modifying SonicVibe global data.
 * @const
 * @type {ProxyHandler<{ [key: string | symbol]: any }>}
 */
const sonicVibeProxy = new Proxy<ISonicVibeGlobal>(sonicVibeGlobal, {
  /**
   * Retrieves the value associated with the given key from the target.
   * @param {Object<string | symbol, any>} target - The target object.
   * @param {string | symbol} key - The key of the property to get.
   * @returns {*} The value associated with the key.
   */
  get: <T>(target: { [key: string | symbol]: T }, key: string | symbol): T =>
    target[key],

  /**
   * Sets the value for the given key in the target.
   * @param {Object<string | symbol, any>} target - The target object.
   * @param {string | symbol} key - The key of the property to set.
   * @param {*} value - The value to set for the key.
   * @returns {boolean} True if the value was set successfully.
   */
  set: <T>(
    target: { [key: string | symbol]: T },
    key: string | symbol,
    value: T
  ): boolean => {
    target[key] = value;
    return Boolean(value);
  },

  /**
   * Checks if the given key exists in the target.
   * @param {Object<string | symbol, any>} target - The target object.
   * @param {string | symbol} key - The key to check for existence.
   * @returns {boolean} True if the key exists, otherwise false.
   */
  has: (
    target: { [key: string | symbol]: any },
    key: string | symbol
  ): boolean => key in target,

  /**
   * Prevents deletion of properties from the target.
   * @returns {boolean} Always returns false.
   */
  deleteProperty: (): boolean => false,
});

export default sonicVibeProxy;

import type SonicVibe from "../components/SonicVibe";
import type { SonicVibeEventsOps } from "../events";

export interface SonicVibeOpMouse {
  [key: string]: <T extends MouseEvent>(e: T) => void;
}

export interface SonicVibeOpKeyboard {
  [key: string]: <T extends KeyboardEvent>(e: T) => void;
}

export interface SonicVibeOp {
  instance: SonicVibe;
  functions: {
    [SonicVibeEventsOps.click]: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
    [SonicVibeEventsOps.play]: {
      [key: string]: <T extends Event>(e: T) => void;
    };
    [SonicVibeEventsOps.pause]: {
      [key: string]: <T extends Event>(e: T) => void;
    };
    [SonicVibeEventsOps.keydown]: {
      [key: string]: <T extends KeyboardEvent>(e: T) => void;
    };
    [SonicVibeEventsOps.mouseenter]: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
    [SonicVibeEventsOps.mouseleave]: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
    [SonicVibeEventsOps.mousemove]: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
    [SonicVibeEventsOps.mousedown]: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
    [SonicVibeEventsOps.mouseup]: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
  };
}

export default interface SonicVibeOps {
  [key: string]: SonicVibeOp;
}

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
    click: {
      [key: string]: <T extends MouseEvent>(e: T) => void;
    };
    play: {
      [key: string]: <T extends Event>(e: T) => void;
    };
    pause: {
      [key: string]: <T extends Event>(e: T) => void;
    };
  };
}

export default interface SonicVibeOps {
  [key: string]: SonicVibeOp;
}

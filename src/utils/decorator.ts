import type SonicVibe from "../components/SonicVibe";
import sonicVibeProxy from "./global";

export default function WithPlayer(id: string) {
  return function (
    _: any,
    _2: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const player = sonicVibeProxy[id] as SonicVibe;
      // Optionally, store the player on `this` if needed

      // Call the original method with the player logic in place
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
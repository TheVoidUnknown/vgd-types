import { Uuid } from "../common";
import { Keyframe } from "../common/keyframe";

export type ThemeKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  theme: Uuid
};

export function serializeThemeKeyframesSync(ThemeKeyframes: ThemeKeyframe[]) {
  const object = [];

  for (const keyframe of ThemeKeyframes) {
    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.theme !== undefined && { evs: [keyframe.theme] }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom })
    })
  }

  return object;
}

export function deserializeThemeKeyframesSync(themeKeyframes: any): ThemeKeyframe[] {
  const object: ThemeKeyframe[] = [];

  for (const keyframe of themeKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      theme: keyframe.evs[0],

      eventRandom: keyframe.er
    })
  }

  return object;
}
import { ColorIndex } from "../common";
import { filterUndefined, Keyframe } from "../common/keyframe";

export type VignetteKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  smoothness: number;
  isRound: boolean;
  
  unknownIndex3: any;

  centerX: number;
  centerY: number;
  color: ColorIndex;
};

export function serializeVignetteKeyframesSync(vignetteKeyframes: VignetteKeyframe[]) {
  const object = [];

  for (const keyframe of vignetteKeyframes) {
    const ev = filterUndefined([
      keyframe.intensity,
      keyframe.smoothness,
      keyframe.isRound,
      
      keyframe.unknownIndex3,

      keyframe.centerX,
      keyframe.centerY,
      keyframe.color
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),

      ...(ev.length > 0 && { ev }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom })
    });
  }

  return object;
}

export function deserializeVignetteKeyframesSync(vignetteKeyframes: any): VignetteKeyframe[] {
  const object: VignetteKeyframe[] = [];

  for (const keyframe of vignetteKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      smoothness: keyframe.ev[1],
      isRound: keyframe.ev[2],
      centerX: keyframe.ev[4],
      centerY: keyframe.ev[5],
      color: keyframe.ev[6],

      unknownIndex3: keyframe.ev && keyframe.ev[3],
      eventRandom: keyframe.er
    })
  }

  return object;
}
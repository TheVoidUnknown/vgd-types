import { ColorIndex } from "../common";
import { Keyframe } from "../common/keyframe";

export type VignetteKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  smoothness: number;
  isRound: boolean;
  // 0.0 ?
  centerX: number;
  centerY: number;
  color: ColorIndex;
};

export function serializeVignetteKeyframesSync(vignetteKeyframes: VignetteKeyframe[]) {
  const object = [];

  for (const keyframe of vignetteKeyframes) {
    const evValues = [
      keyframe.intensity,
      keyframe.smoothness,
      keyframe.isRound,
      0, // seems to be left over?
      keyframe.centerX,
      keyframe.centerY,
      keyframe.color
    ];

    const filteredEv = evValues.filter(v => v !== undefined);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),

      ...(filteredEv.length > 0 && { ev: filteredEv }),

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

      eventRandom: keyframe.er
    })
  }

  return object;
}
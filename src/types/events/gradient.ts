import { ColorIndex } from "../common";
import { filterUndefined, Keyframe, MixingMode } from "../common/keyframe";

export type GradientKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  rotation: number;
  colorB: ColorIndex;
  colorA: ColorIndex;
  mixingMode: MixingMode;
};

export function serializeGradientKeyframesSync(gradientKeyframes: GradientKeyframe[]) {
  const object = [];

  for (const keyframe of gradientKeyframes) {
    const ev = filterUndefined([
      keyframe.intensity,
      keyframe.rotation,
      keyframe.colorB,
      keyframe.colorA,
      keyframe.mixingMode
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

export function deserializeGradientKeyframesSync(gradientKeyframes: any): GradientKeyframe[] {
  const object: GradientKeyframe[] = [];

  for (const keyframe of gradientKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      rotation: keyframe.ev[1],
      colorB: keyframe.ev[2],
      colorA: keyframe.ev[3],
      mixingMode: keyframe.ev[4],

      eventRandom: keyframe.er
    })
  }

  return object;
}
import { ColorIndex } from "../common";
import { filterUndefined, Keyframe } from "../common/keyframe";

export type BloomKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  diffusion: number;
  color: ColorIndex;
};

export function serializeBloomKeyframesSync(bloomKeyframes: BloomKeyframe[]) {
  const object = [];

  for (const keyframe of bloomKeyframes) {
    const ev = filterUndefined([
      keyframe.intensity,
      keyframe.diffusion,
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

export function deserializeBloomKeyframesSync(bloomKeyframes: any): BloomKeyframe[] {
  const object: BloomKeyframe[] = [];

  for (const keyframe of bloomKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      diffusion: keyframe.ev[1],
      color: keyframe.ev[2],

      eventRandom: keyframe.er
    })
  }

  return object;
}
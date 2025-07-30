import { Keyframe } from "../common/keyframe";

export type ChromaKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  // 0.0 ?
};

export function serializeChromaKeyframesSync(chromaKeyframes: ChromaKeyframe[]) {
  const object = [];

  for (const keyframe of chromaKeyframes) {
    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.intensity !== undefined && { ev: [keyframe.intensity, 0] }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom })
    })
  }

  return object;
}

export function deserializeChromaKeyframesSync(chromaKeyframes: any): ChromaKeyframe[] {
  const object: ChromaKeyframe[] = [];

  for (const keyframe of chromaKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],

      eventRandom: keyframe.er
    })
  }

  return object;
}
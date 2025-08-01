import { filterUndefined, Keyframe } from "../common/keyframe";

export type ChromaKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  
  unknownIndex1?: any;
};

export function serializeChromaKeyframesSync(chromaKeyframes: ChromaKeyframe[]) {
  const object = [];

  for (const keyframe of chromaKeyframes) {
    const ev = filterUndefined([
      keyframe.intensity,
      keyframe.unknownIndex1
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),

      ...(ev !== undefined && { ev }),

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

      unknownIndex1: keyframe.ev && keyframe.ev[1],
      eventRandom: keyframe.er
    })
  }

  return object;
}
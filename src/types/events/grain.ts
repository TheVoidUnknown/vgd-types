import { filterUndefined, Keyframe } from "../common/keyframe";

export type GrainKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  
  unknownIndex1?: any

  grainSize: number;
  mix: number;
};

export function serializeGrainKeyframesSync(grainKeyframes: GrainKeyframe[]) {
  const object = [];

  for (const keyframe of grainKeyframes) {
    const ev = filterUndefined([
      keyframe.intensity,

      keyframe.unknownIndex1,

      keyframe.grainSize,
      keyframe.mix
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

export function deserializeGrainKeyframesSync(grainKeyframes: any): GrainKeyframe[] {
  const object: GrainKeyframe[] = [];

  for (const keyframe of grainKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      grainSize: keyframe.ev[2],
      mix: keyframe.ev[3],

      unknownIndex1: keyframe.ev && keyframe.ev[1],
      eventRandom: keyframe.er
    })
  }

  return object;
}
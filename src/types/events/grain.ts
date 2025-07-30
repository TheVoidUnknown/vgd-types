import { Keyframe } from "../common/keyframe";

export type GrainKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  // 0.0 ?
  grainSize: number;
  mix: number;
};

export function serializeGrainKeyframesSync(grainKeyframes: GrainKeyframe[]) {
  const object = [];

  for (const keyframe of grainKeyframes) {
    const evValues = [
      keyframe.intensity,
      0, // presumably left over from the color option
      keyframe.grainSize,
      keyframe.mix
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

export function deserializeGrainKeyframesSync(grainKeyframes: any): GrainKeyframe[] {
  const object: GrainKeyframe[] = [];

  for (const keyframe of grainKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      grainSize: keyframe.ev[2],
      mix: keyframe.ev[3],

      eventRandom: keyframe.er
    })
  }

  return object;
}
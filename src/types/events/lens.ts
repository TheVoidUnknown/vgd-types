import { Keyframe } from "../common/keyframe";

export type LensKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  centerX: number;
  centerY: number;
};

export function serializeLensKeyframesSync(lensKeyframes: LensKeyframe[]) {
  const object = [];

  for (const keyframe of lensKeyframes) {
    const evValues = [
      keyframe.intensity,
      keyframe.centerX,
      keyframe.centerY
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

export function deserializeLensKeyframesSync(lensKeyframes: any): LensKeyframe[] {
  const object: LensKeyframe[] = [];

  for (const keyframe of lensKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      centerX: keyframe.ev[1],
      centerY: keyframe.ev[2],

      eventRandom: keyframe.er
    })
  }

  return object;
}
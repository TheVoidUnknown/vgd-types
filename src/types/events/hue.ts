import { filterUndefined, Keyframe } from "../common/keyframe";

export type HueKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  hue: number;
  
  unknownIndex1?: any;
  unknownIndex2?: any;
};

export function serializeHueKeyframesSync(hueKeyframes: HueKeyframe[]) {
  const object = [];

  for (const keyframe of hueKeyframes) {
    const ev = filterUndefined([
      keyframe.hue,
      keyframe.unknownIndex1,
      keyframe.unknownIndex2, // left over from preset of 3 values by default, according to pidge
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

export function deserializeHueKeyframesSync(hueKeyframes: any): HueKeyframe[] {
  const object: HueKeyframe[] = [];

  for (const keyframe of hueKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      hue: keyframe.ev && keyframe.ev[0],

      unknownIndex1: keyframe.ev && keyframe.ev[1],
      unknownIndex2: keyframe.ev && keyframe.ev[2],
      eventRandom: keyframe.er
    })
  }

  return object;
}
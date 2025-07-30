import { Keyframe } from "../common/keyframe";

export type HueKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  hue: number;
  // 0.0 ?
  // 0.0 ?
};

export function serializeHueKeyframesSync(hueKeyframes: HueKeyframe[]) {
  const object = [];

  for (const keyframe of hueKeyframes) {
    const evValues = [
      keyframe.hue,
      0,
      0, // left over from preset of 3 values by default, according to pidge
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

export function deserializeHueKeyframesSync(hueKeyframes: any): HueKeyframe[] {
  const object: HueKeyframe[] = [];

  for (const keyframe of hueKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      hue: keyframe.ev && keyframe.ev[0],

      eventRandom: keyframe.er
    })
  }

  return object;
}
import { Keyframe } from "../common/keyframe";

export type PlayerKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  forceX: number;
  forceY: number;
  // 0.0 ?
};

export function serializePlayerKeyframesSync(playerKeyframes: PlayerKeyframe[]) {
  const object = [];

  for (const keyframe of playerKeyframes) {
    const evValues = [
      keyframe.forceX,
      keyframe.forceY,
      0 // left over from preset of 3 values by default, according to pidge
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

export function deserializePlayerKeyframesSync(playerKeyframes: any): PlayerKeyframe[] {
  const object: PlayerKeyframe[] = [];

  for (const keyframe of playerKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      forceX: keyframe.ev[0],
      forceY: keyframe.ev[1],

      eventRandom: keyframe.er
    })
  }

  return object;
}
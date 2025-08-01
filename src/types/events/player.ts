import { filterUndefined, Keyframe } from "../common/keyframe";

export type PlayerKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  forceX: number;
  forceY: number;

  unknownIndex2?: any;
};

export function serializePlayerKeyframesSync(playerKeyframes: PlayerKeyframe[]) {
  const object = [];

  for (const keyframe of playerKeyframes) {
    const ev = filterUndefined([
      keyframe.forceX,
      keyframe.forceY,
      keyframe.unknownIndex2 // left over from preset of 3 values by default, according to pidge
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

export function deserializePlayerKeyframesSync(playerKeyframes: any): PlayerKeyframe[] {
  const object: PlayerKeyframe[] = [];

  for (const keyframe of playerKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      forceX: keyframe.ev[0],
      forceY: keyframe.ev[1],

      unknownIndex2: keyframe.ev && keyframe.ev[2],
      eventRandom: keyframe.er
    })
  }

  return object;
}
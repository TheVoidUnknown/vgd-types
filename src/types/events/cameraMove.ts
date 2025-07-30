import { Keyframe } from "../common/keyframe";

export type CameraMoveKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  x: number;
  y: number;
};

export function serializeCameraMoveKeyframesSync(cameraMoveKeyframes: CameraMoveKeyframe[]) {
  const object = [];

  for (const keyframe of cameraMoveKeyframes) {
    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),

      ...((
        keyframe.x !== undefined 
        && keyframe.y !== undefined
      ) && { 
        ev: [keyframe.x, keyframe.y] 
      }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom })
    })
  }

  return object;
}

export function deserializeCameraMoveKeyframesSync(cameraMoveKeyframes: any): CameraMoveKeyframe[] {
  const object: CameraMoveKeyframe[] = [];

  for (const keyframe of cameraMoveKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      x: keyframe.ev[0],
      y: keyframe.ev[1],

      eventRandom: keyframe.er
    })
  }

  return object;
}
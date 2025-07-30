import { Keyframe } from "../common/keyframe";

export type CameraRotateKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  rotation: number;
};

export function serializeCameraRotateKeyframesSync(cameraRotateKeyframes: CameraRotateKeyframe[]) {
  const object = [];

  for (const keyframe of cameraRotateKeyframes) {
    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.rotation !== undefined && { ev: [keyframe.rotation] }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom }),
    })
  }

  return object;
}

export function deserializeCameraRotateKeyframesSync(cameraRotateKeyframes: any): CameraRotateKeyframe[] {
  const object: CameraRotateKeyframe[] = [];

  for (const keyframe of cameraRotateKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      rotation: keyframe.ev[0],

      eventRandom: keyframe.er
    })
  }

  return object;
}
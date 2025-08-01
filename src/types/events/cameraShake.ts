import { filterUndefined, Keyframe } from "../common/keyframe";

export type CameraShakeKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  shakeSpeed: number;

  intensityX: number;
  intensityY: number;
};

export function serializeCameraShakeKeyframesSync(cameraShakeKeyframes: CameraShakeKeyframe[]) {
  const object = [];

  for (const keyframe of cameraShakeKeyframes) {
    const ev = filterUndefined([
      keyframe.intensity,
      keyframe.shakeSpeed,
      keyframe.intensityX,
      keyframe.intensityY
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),

      ...(ev.length > 0 && { ev }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom }),
    });
  }

  return object;
}

export function deserializeCameraShakeKeyframesSync(cameraShakeKeyframes: any): CameraShakeKeyframe[] {
  const object: CameraShakeKeyframe[] = [];

  for (const keyframe of cameraShakeKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      shakeSpeed: keyframe.ev[1],
      intensityX: keyframe.ev[2],
      intensityY: keyframe.ev[3],

      eventRandom: keyframe.er
    })
  }

  return object;
}
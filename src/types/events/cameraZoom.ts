import { Keyframe } from "../common/keyframe";

export type CameraZoomKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  zoom: number;
};

export function serializeCameraZoomKeyframesSync(cameraZoomKeyframes: CameraZoomKeyframe[]) {
  const object = [];

  for (const keyframe of cameraZoomKeyframes) {
    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.zoom !== undefined && { ev: [keyframe.zoom ] }),

      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom }),
    })
  }

  return object;
}

export function deserializeCameraZoomKeyframesSync(cameraZoomKeyframes: any): CameraZoomKeyframe[] {
  const object: CameraZoomKeyframe[] = [];

  for (const keyframe of cameraZoomKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      zoom: keyframe.ev[0],

      eventRandom: keyframe.er
    })
  }

  return object;
}
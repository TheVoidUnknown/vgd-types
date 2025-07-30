import { Keyframe } from "../common/keyframe";

export type GlitchKeyframe = Omit<Keyframe, 'eventData' | 'random'> & {
  intensity: number;
  glitchWidth: number;
  glitchSpeed: number;
};

export function serializeGlitchKeyframesSync(glitchKeyframes: GlitchKeyframe[]) {
  const object = [];

  for (const keyframe of glitchKeyframes) {
    const evValues = [
      keyframe.intensity,
      keyframe.glitchSpeed,
      keyframe.glitchWidth
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

export function deserializeGlitchKeyframesSync(glitchKeyframes: any): GlitchKeyframe[] {
  const object: GlitchKeyframe[] = [];

  for (const keyframe of glitchKeyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      intensity: keyframe.ev[0],
      glitchSpeed: keyframe.ev[1],
      glitchWidth: keyframe.ev[2],

      eventRandom: keyframe.er
    })
  }

  return object;
}
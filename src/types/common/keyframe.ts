export interface Keyframe {
  /**
   * Timestamp in seconds for this keyframe to trigger, relative to beatmap object if applicable.
   * @property {number} timestamp
   */
  timestamp?: number;

  /**
   * Easing type of this keyframe.
   * @property {EaseType} easing
   */
  easing?: EaseType;

  /**
   * Random selection between `eventData and `eventRandom`.
   * @property {RandomType} random
   */
  random?: RandomType;

  /**
   * Standard event data, usually served as X, Y format.
   * @property {[number, number]} eventData 
   */
  eventData: [
    number,
    number | undefined
  ];

  /**
   * Extra data used for randomness. Indices 0-1 are X2, Y2, third index is randomize interval if `random: RandomType.Linear`
   * @property {[number, number, number]} eventRandom 
   */
  eventRandom?: [
    number,
    number | undefined,
    number | undefined
  ]
}

export enum EaseType {
  Instant = "Instant",
  Linear = "Linear",

  InSine = "InSine",
  OutSine = "OutSine",
  InOutSine = "InOutSine",

  InElastic = "InElastic",
  OutElastic = "OutElastic",
  InOutElastic = "InOutElastic",

  InBack = "InBack",
  OutBack = "OutBack",
  InOutBack = "InOutBack",

  InBounce = "InBounce",
  OutBounce = "OutBounce",
  InOutBounce = "InOutBounce",

  InQuad = "InQuad",
  OutQuad = "OutQuad",
  InOutQuad = "InOutQuad",

  InCirc = "InCirc",
  OutCirc = "OutCirc",
  InOutCirc = "InOutCirc",

  InExpo = "InExpo",
  OutExpo = "OutExpo",
  InOutExpo = "InOutExpo"
}

export enum RandomType {
  None = 0,
  Linear = 1,
  Toggle = 3,
  Relative = 4
}

export enum MixingMode {
  Linear = 0,
  Additive = 1,
  Multiply = 2,
  Screen = 3
}

export function serializeKeyframes(keyframes: Keyframe[]) {
  const object: Array<any> = [];

  for (const keyframe of keyframes) {
    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.random !== undefined && { r: keyframe.random }),
      ...(keyframe.eventData !== undefined && { ev: keyframe.eventData }),
      ...(keyframe.eventRandom !== undefined && { er: keyframe.eventRandom })
    })
  }

  return object;
}

export function deserializeKeyframes(keyframes: Array<any>): Keyframe[] {
  const object: Keyframe[] = [];

  for (const keyframe of keyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      random: keyframe.r,
      eventData: keyframe.ev,
      eventRandom: keyframe.er
    })
  }

  return object;
}
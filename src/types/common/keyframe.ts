import { ColorIndex } from "./color";

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
   * Raw event data, usually served as X, Y format.
   * @property {[number, number]} eventData 
   */
  eventData?: [
    number,
    number | undefined
  ];

  /**
   * Raw extra data used for randomness. Indices 0-1 are X2, Y2, third index is randomize interval if `random: RandomType.Linear`
   * @property {[number, number, number]} eventRandom 
   */
  eventRandom?: [
    number,
    number | undefined,
    number | undefined
  ]
}

export interface MoveKeyframe extends Keyframe {
  x: number;
  y: number;

  randomX?: number;
  randomY?: number;
  randomInterval?: number;
}

export interface ScaleKeyframe extends Keyframe {
  x: number;
  y: number;

  randomX?: number;
  randomY?: number;
  randomInterval?: number;
}

export interface RotationKeyframe extends Keyframe {
  rotation: number;
  useAbsoluteRotation?: boolean;

  randomMin?: number;
  randomMax?: number;
  randomInterval?: number;
}

export interface ColorKeyframe extends Keyframe {
  color: ColorIndex;
  gradientColor?: ColorIndex;
  opacity?: number;
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

export enum KeyframeType {
  Move = "Move",
  Scale = "Scale",
  Rotation = "Rotation",
  Color = "Color"
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

export function serializeMoveKeyframes(keyframes: MoveKeyframe[]) {
  const object: Array<any> = [];

  for (const keyframe of keyframes) {
    const ev = filterUndefined([
      keyframe.x,
      keyframe.y
    ]);

    const er = filterUndefined([
      keyframe.randomX,
      keyframe.randomY,
      keyframe.randomInterval
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.random !== undefined && { r: keyframe.random }),

      ...(ev.length > 0 && { ev }),
      ...(er.length > 0 && { er }),

    })
  }

  return object;
}

export function deserializeMoveKeyframes(keyframes: Array<any>): MoveKeyframe[] {
  const object: MoveKeyframe[] = [];

  for (const keyframe of keyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      random: keyframe.r,
      x: keyframe.ev[0],
      y: keyframe.ev[1],
      randomX: keyframe.er && keyframe.er[0],
      randomY: keyframe.er && keyframe?.er[1],
      randomInterval: keyframe.er && keyframe?.er[2]
    })
  }

  return object;
}

export function serializeScaleKeyframes(keyframes: ScaleKeyframe[]) {
  const object: Array<any> = [];

  for (const keyframe of keyframes) {
    const ev = filterUndefined([
      keyframe.x,
      keyframe.y
    ]);

    const er = filterUndefined([
      keyframe.randomX,
      keyframe.randomY,
      keyframe.randomInterval
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.random !== undefined && { r: keyframe.random }),

      ...(ev.length > 0 && { ev }),
      ...(er.length > 0 && { er }),

    })
  }

  return object;
}

export function deserializeScaleKeyframes(keyframes: Array<any>): ScaleKeyframe[] {
  const object: ScaleKeyframe[] = [];

  for (const keyframe of keyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      random: keyframe.r,
      x: keyframe?.ev[0],
      y: keyframe?.ev[1],
      randomX: keyframe.er && keyframe?.er[0],
      randomY: keyframe.er && keyframe?.er[1],
      randomInterval: keyframe.er && keyframe?.er[2]
    })
  }

  return object;
}

export function serializeRotationKeyframes(keyframes: RotationKeyframe[]) {
  const object: Array<any> = [];

  for (const keyframe of keyframes) {
    const ev = filterUndefined([
      keyframe.rotation,
      boolToNumber(keyframe.useAbsoluteRotation)
    ]);

    const er = filterUndefined([
      keyframe.randomMin,
      keyframe.randomMax,
      keyframe.randomInterval
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.random !== undefined && { r: keyframe.random }),

      ...(ev.length > 0 && { ev }),
      ...(er.length > 0 && { er }),

    })
  }

  return object;
}

export function deserializeRotationKeyframes(keyframes: Array<any>): RotationKeyframe[] {
  const object: RotationKeyframe[] = [];

  for (const keyframe of keyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      random: keyframe.r,
      rotation: keyframe?.ev[0],
      useAbsoluteRotation: numberToBool(keyframe?.ev[1]),
      randomMin: keyframe.er && keyframe?.er[0],
      randomMax: keyframe.er && keyframe?.er[1],
      randomInterval: keyframe.er && keyframe?.er[2]
    })
  }

  return object;
}

export function serializeColorKeyframes(keyframes: ColorKeyframe[]) {
  const object: Array<any> = [];

  for (const keyframe of keyframes) {
    const ev = filterUndefined([
      keyframe.color,
      keyframe.opacity,
      keyframe.gradientColor
    ]);

    object.push({
      ...(keyframe.timestamp !== undefined && { t: keyframe.timestamp }),
      ...(keyframe.easing !== undefined && { ct: keyframe.easing }),
      ...(keyframe.random !== undefined && { r: keyframe.random }),

      ...(ev.length > 0 && { ev }),
      ...(keyframe.eventRandom && keyframe.eventRandom.length > 0 && { er: keyframe.eventRandom })
    })
  }

  return object;
}

export function deserializeColorKeyframes(keyframes: Array<any>): ColorKeyframe[] {
  const object: ColorKeyframe[] = [];

  for (const keyframe of keyframes) {
    object.push({
      timestamp: keyframe.t,
      easing: keyframe.ct,
      random: keyframe.r,
      color: keyframe?.ev[0],
      gradientColor: keyframe?.ev[2],
      opacity: keyframe?.ev[1],

      eventRandom: keyframe.er
    })
  }

  return object;
}

export function filterUndefined(array: Array<string | number | undefined>) {
  return array.filter(v => v !== undefined)
}

function boolToNumber(b: boolean | undefined): number | undefined {
    if (b === undefined) return undefined;
    return b ? 1 : 0;
}

function numberToBool(n: number | undefined): boolean | undefined {
    if (n === undefined) return undefined;
    return n !== 0;
} 
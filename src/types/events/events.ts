import { BloomKeyframe, serializeBloomKeyframesSync, deserializeBloomKeyframesSync } from "./bloom";
import { CameraMoveKeyframe, serializeCameraMoveKeyframesSync, deserializeCameraMoveKeyframesSync } from "./cameraMove";
import { CameraRotateKeyframe, serializeCameraRotateKeyframesSync, deserializeCameraRotateKeyframesSync } from "./cameraRotate";
import { CameraShakeKeyframe, serializeCameraShakeKeyframesSync, deserializeCameraShakeKeyframesSync } from "./cameraShake";
import { CameraZoomKeyframe, serializeCameraZoomKeyframesSync, deserializeCameraZoomKeyframesSync } from "./cameraZoom";
import { ChromaKeyframe, serializeChromaKeyframesSync, deserializeChromaKeyframesSync } from "./chroma";
import { GlitchKeyframe, serializeGlitchKeyframesSync, deserializeGlitchKeyframesSync } from "./glitch";
import { GradientKeyframe, serializeGradientKeyframesSync, deserializeGradientKeyframesSync } from "./gradient";
import { GrainKeyframe, serializeGrainKeyframesSync, deserializeGrainKeyframesSync } from "./grain";
import { HueKeyframe, serializeHueKeyframesSync, deserializeHueKeyframesSync } from "./hue";
import { LensKeyframe, serializeLensKeyframesSync, deserializeLensKeyframesSync } from "./lens";
import { PlayerKeyframe, serializePlayerKeyframesSync, deserializePlayerKeyframesSync } from "./player";
import { ThemeKeyframe, serializeThemeKeyframesSync, deserializeThemeKeyframesSync } from "./theme";
import { VignetteKeyframe, serializeVignetteKeyframesSync, deserializeVignetteKeyframesSync } from "./vignette";

export interface Events {
  cameraMove: CameraMoveKeyframe[];
  cameraZoom: CameraZoomKeyframe[];
  cameraRotate: CameraRotateKeyframe[];
  cameraShake: CameraShakeKeyframe[];
  theme: ThemeKeyframe[];
  chroma: ChromaKeyframe[];
  bloom: BloomKeyframe[];
  vignette: VignetteKeyframe[];
  lens: LensKeyframe[];
  grain: GrainKeyframe[];
  gradient: GradientKeyframe[];
  glitch: GlitchKeyframe[];
  hue: HueKeyframe[];
  player: PlayerKeyframe[];
}

export function serializeEventsSync(events: Events) {
  const object = [
    serializeCameraMoveKeyframesSync(events.cameraMove),
    serializeCameraZoomKeyframesSync(events.cameraZoom),
    serializeCameraRotateKeyframesSync(events.cameraRotate),
    serializeCameraShakeKeyframesSync(events.cameraShake),
    serializeThemeKeyframesSync(events.theme),
    serializeChromaKeyframesSync(events.chroma),
    serializeBloomKeyframesSync(events.bloom),
    serializeVignetteKeyframesSync(events.vignette),
    serializeLensKeyframesSync(events.lens),
    serializeGrainKeyframesSync(events.grain),
    serializeGradientKeyframesSync(events.gradient),
    serializeGlitchKeyframesSync(events.glitch),
    serializeHueKeyframesSync(events.hue),
    serializePlayerKeyframesSync(events.player),
  ];

  return object;
}

export function deserializeEventsSync(events: any): Events {
  const object: Events = {
    cameraMove: deserializeCameraMoveKeyframesSync(events[0]),
    cameraZoom: deserializeCameraZoomKeyframesSync(events[1]),
    cameraRotate: deserializeCameraRotateKeyframesSync(events[2]),
    cameraShake: deserializeCameraShakeKeyframesSync(events[3]),
    theme: deserializeThemeKeyframesSync(events[4]),
    chroma: deserializeChromaKeyframesSync(events[5]),
    bloom: deserializeBloomKeyframesSync(events[6]),
    vignette: deserializeVignetteKeyframesSync(events[7]),
    lens: deserializeLensKeyframesSync(events[8]),
    grain: deserializeGrainKeyframesSync(events[9]),
    gradient: deserializeGradientKeyframesSync(events[10]),
    glitch: deserializeGlitchKeyframesSync(events[11]),
    hue: deserializeHueKeyframesSync(events[12]),
    player: deserializePlayerKeyframesSync(events[13])
  }

  return object;
}
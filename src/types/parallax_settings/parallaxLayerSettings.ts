import { ColorIndex } from "../common";
import { ParallaxObject, serializeParallaxObjectsSync, deserializeParallaxObjectsSync } from "./parallaxObject";

export interface ParallaxLayerSettings {
  depth: number;
  color: ColorIndex;
  objects: ParallaxObject[];
}

export function serializeParallaxLayerSettingsSync(parallaxLayerSettings: ParallaxLayerSettings) {
  const object = {
    d: parallaxLayerSettings.depth,
    c: parallaxLayerSettings.color,
    ...(parallaxLayerSettings.objects.length > 0 && { o: serializeParallaxObjectsSync(parallaxLayerSettings.objects) }),
  };

  return object;
}

export function deserializeParallaxLayerSettingsSync(parallaxLayerSettings: any): ParallaxLayerSettings {
  const object: ParallaxLayerSettings = {
    depth: parallaxLayerSettings.d,
    color: parallaxLayerSettings.c,
    objects: deserializeParallaxObjectsSync(parallaxLayerSettings.o || [])
  }

  return object;
}
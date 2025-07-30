import { deserializeParallaxLayerSettingsSync, ParallaxLayerSettings, serializeParallaxLayerSettingsSync } from "./parallaxLayerSettings";

export interface ParallaxSettings {
  depthOfField: boolean;
  depthOfFieldBlur: number;

  layers: ParallaxLayerSettings[];
}

export function serializeParallaxSettingsSync(parallaxSettings: ParallaxSettings) {
  const object = [];

  for (const layer of parallaxSettings.layers) {
    object.push(serializeParallaxLayerSettingsSync(layer));
  }

  return { 
    ...(parallaxSettings.depthOfField !== undefined && { dof_active: parallaxSettings.depthOfField }),
    ...(parallaxSettings.depthOfFieldBlur !== undefined && { dof_value: parallaxSettings.depthOfFieldBlur }),
    l: object 
  };
}

export function deserializeParallaxSettingsSync(parallaxSettings: any): ParallaxSettings {
  const object: ParallaxLayerSettings[] = [];

  for (const layer of parallaxSettings.l) {
    object.push(deserializeParallaxLayerSettingsSync(layer));
  }

  return { 
    depthOfField: parallaxSettings.dof_active,
    depthOfFieldBlur: parallaxSettings.dof_value,
    layers: object 
  };
}
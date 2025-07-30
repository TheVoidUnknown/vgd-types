export interface BpmSnapSettings {
  objects?: boolean;
  checkpoints?: boolean;
}

export function serializeBpmSnapSettingsSync(bpmSnapSettings: BpmSnapSettings) {
  const object: any = {
    ...(bpmSnapSettings.objects !== undefined && { objects: bpmSnapSettings.objects }),
    ...(bpmSnapSettings.checkpoints !== undefined && { checkpoints: bpmSnapSettings.checkpoints })
  };

  return object;
}

export function deserializeBpmSnapSettingsSync(bpmSnapSettings: any): BpmSnapSettings {
  const object: BpmSnapSettings = {
    objects: bpmSnapSettings.objects,
    checkpoints: bpmSnapSettings.checkpoints
  };

  return object;
}
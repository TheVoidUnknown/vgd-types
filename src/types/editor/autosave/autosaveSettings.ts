export interface AutosaveSettings {
  /**
   * Maximum number of autosaves before overwiting the oldest autosave.
   * @property {number} maxSaves
   */
  maxSaves?: number

  /**
   * Number of minutes between each save.
   * @property {number} saveInterval
   */
  saveInterval?: number
}

export function serializeAutosaveSettingsSync(autosaveSettings: AutosaveSettings) {
  const object: any = {
    ...(autosaveSettings.maxSaves !== undefined && { as_max: autosaveSettings.maxSaves }),
    ...(autosaveSettings.saveInterval !== undefined && { as_interval: autosaveSettings.saveInterval })
  };

  return object;
}

export function deserializeAutosaveSettingsSync(autosaveSettings: any): AutosaveSettings {
  const object: AutosaveSettings = {
    maxSaves: autosaveSettings.as_max,
    saveInterval: autosaveSettings.as_interval
  };

  return object;
}
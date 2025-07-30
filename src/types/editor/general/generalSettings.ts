export interface GeneralSettings {
  /**
   * Visual size of collapsed timeline objects.
   * @property {number} objectCollapseLength
   */
  objectCollapseLength: number;

  /**
   * Default test mode when using fullscreen.
   * @property {0 | 1} testMode
   * 
   * @example
   * testMode: 0 // Zen Mode by default
   * testMode: 1 // Normal Mode by default
   */
  testMode: 0 | 1;

  /**
   * Whether to enable selecting text objects by clicking in the preview window.
   * @property {boolean} selectTextObjects
   */
  selectTextObjects: boolean

  /**
   * Whether to enable selecting parallax objects by clicking in the preview window.
   * @property {boolean} selectParallaxObjects
   */
  selectParallaxObjects: boolean

  /**
   * Sets the visual outline mode for selected objects.
   * @property {0 | 1 | 2} selectionOutlineMode
   * 
   * @example
   * selectionOutlineMode: 0 // Standard
   * selectionOutlineMode: 1 // Reduced
   * selectionOutlineMode: 2 // None
   */
  selectionOutlineMode: 0 | 1 | 2
}

export function serializeGeneralSettingsSync(generalSettings: GeneralSettings) {
  const object: any = {
    ...(generalSettings.objectCollapseLength !== undefined && { collapse_length: generalSettings.objectCollapseLength }),
    ...(generalSettings.testMode !== undefined && { test_mode: generalSettings.testMode }),
    ...(generalSettings.selectTextObjects !== undefined && { text_select_objects: generalSettings.selectTextObjects }),
    ...(generalSettings.selectParallaxObjects !== undefined && { text_select_backgrounds: generalSettings.selectParallaxObjects }),
    ...(generalSettings.selectionOutlineMode !== undefined && { outline_mode: generalSettings.selectionOutlineMode }),
  };

  return object;
}

export function deserializeGeneralSettingsSync(generalSettings: any): GeneralSettings {
  const object: GeneralSettings = {
    objectCollapseLength: generalSettings.collapse_length,
    testMode: generalSettings.test_mode,
    selectTextObjects: generalSettings.text_select_objects,
    selectParallaxObjects: generalSettings.text_select_backgrounds,
    selectionOutlineMode: generalSettings.outline_mode
  };

  return object;
}
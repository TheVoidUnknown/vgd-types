import { Uuid } from "../common";

/**
 * Governs quick prefab spawn settings.
 * @interface EditorPrefabSpawnSettings
 */
export interface EditorPrefabSpawnSettings {
  /**
   * Not sure what this is for, seems to always be `true`.
   * @property {true} expanded
   */
  expanded: true;

  /**
   * Whether this keybind remains active in-editor.
   * @property {boolean} active
   */
  active: boolean

  /**
   * UUID of the prefab to be spawned.
   * @property {boolean} prefab
   */
  prefab: Uuid

  /**
   * Seems to be an array with keystroke representations such as `["Ctrl", "F"]` for `Ctrl+F`
   * @property {Array<string>} keycodes
   */
  keycodes: Array<string>
}


export function serializeEditorPrefabSpawnSettingsSync(editorPrefabSpawnSettings: EditorPrefabSpawnSettings[]) {
  const object: any = [];
  
  for (const settings of editorPrefabSpawnSettings) {
    object.push({
      ...(settings.expanded !== undefined && { expanded: settings.expanded }),
      ...(settings.active !== undefined && { active: settings.active }),
      ...(settings.prefab !== undefined && { prefab: settings.prefab }),
      ...(settings.keycodes !== undefined && { keycodes: settings.keycodes }),
    })
  }

  return object;
}

export function deserializeEditorPrefabSpawnSettingsSync(editorPrefabSpawnSettings: any): EditorPrefabSpawnSettings[] {
  const object: EditorPrefabSpawnSettings[] = [];

  for (const settings of editorPrefabSpawnSettings) {
    object.push({
      expanded: settings.expanded,
      active: settings.active,
      prefab: settings.prefab,
      keycodes: settings.keycodes
    })
  }

  return object;
}
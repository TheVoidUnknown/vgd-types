import { AutosaveSettings, serializeAutosaveSettingsSync, deserializeAutosaveSettingsSync } from "./autosave";
import { BpmSettings, serializeBpmSettingsSync, deserializeBpmSettingsSync } from "./bpm";
import { GeneralSettings, serializeGeneralSettingsSync, deserializeGeneralSettingsSync } from "./general";
import { GridSettings, serializeGridSettingsSync, deserializeGridSettingsSync } from "./grid";
import { PreviewSettings, serializePreviewSettingsSync, deserializepreviewSettingsSync } from "./preview";

export interface EditorSettings {
  autosaveSettings: AutosaveSettings;
  bpmSettings: BpmSettings;
  generalSettings: GeneralSettings;
  gridSettings: GridSettings;
  previewSettings: PreviewSettings;
}

export function serializeEditorSettingsSync(editorSettings: EditorSettings) {
  const object: any = {
    ...(editorSettings.autosaveSettings !== undefined && { autosave: serializeAutosaveSettingsSync(editorSettings.autosaveSettings) }),
    ...(editorSettings.bpmSettings !== undefined && { bpm: serializeBpmSettingsSync(editorSettings.bpmSettings) }),
    ...(editorSettings.generalSettings !== undefined && { general: serializeGeneralSettingsSync(editorSettings.generalSettings) }),
    ...(editorSettings.gridSettings !== undefined && { grid: serializeGridSettingsSync(editorSettings.gridSettings) }),
    ...(editorSettings.previewSettings !== undefined && { preview: serializePreviewSettingsSync(editorSettings.previewSettings) })
  };

  return object;
}

export function deserializeEditorSettingsSync(editorSettings: any): EditorSettings {
  const object: EditorSettings = {
    autosaveSettings: deserializeAutosaveSettingsSync(editorSettings.autosave),
    bpmSettings: deserializeBpmSettingsSync(editorSettings.bpm),
    generalSettings: deserializeGeneralSettingsSync(editorSettings.general),
    gridSettings: deserializeGridSettingsSync(editorSettings.grid),
    previewSettings: deserializepreviewSettingsSync(editorSettings.preview),
  };

  return object;
}
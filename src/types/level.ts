import { Checkpoint, serializeCheckpointsSync, deserializeCheckpointsSync } from './checkpoints';
import { EditorSettings, serializeEditorSettingsSync, deserializeEditorSettingsSync } from './editor';
import { EditorPrefabSpawnSettings, serializeEditorPrefabSpawnSettingsSync, deserializeEditorPrefabSpawnSettingsSync } from './editor_prefab_spawn';
import { Events, serializeEventsSync, deserializeEventsSync } from './events';
import { Marker, serializeMarkersSync, deserializeMarkersSync } from './markers';
import { LevelObject, serializeLevelObjectsSync, deserializeLevelObjectsSync } from './objects';
import { ParallaxSettings, serializeParallaxSettingsSync, deserializeParallaxSettingsSync } from './parallax_settings';
import { Prefab, serializePrefabsSync, deserializePrefabsSync } from './prefabs';
import { Theme, serializeThemesSync, deserializeThemesSync } from './themes';
import { Trigger, serializeTriggersSync, deserializeTriggersSync } from './triggers';

export interface LevelData {
  checkpoints: Checkpoint[];
  editorSettings: EditorSettings;
  editorPrefabSpawn: EditorPrefabSpawnSettings[];
  events: Events;
  markers?: Marker[];
  objects: LevelObject[];
  parallaxSettings: ParallaxSettings;
  prefabs?: Prefab[];
  prefabObjects?: Array<any>;
  themes?: Theme[];
  triggers?: Trigger[];
}

export function serializeLevelDataSync(level: LevelData) {
  const object = {
    ...(level.checkpoints !== undefined && { checkpoints: serializeCheckpointsSync(level.checkpoints) }),
    ...(level.editorSettings !== undefined && { editor: serializeEditorSettingsSync(level.editorSettings) }),
    ...(level.editorPrefabSpawn !== undefined && { editor_prefab_spawn: serializeEditorPrefabSpawnSettingsSync(level.editorPrefabSpawn) }),
    ...(level.events !== undefined && { events: serializeEventsSync(level.events) }),
    ...(level.markers !== undefined && { markers: serializeMarkersSync(level.markers) }),
    ...(level.objects !== undefined && { objects: serializeLevelObjectsSync(level.objects) }),
    ...(level.parallaxSettings !== undefined && { parallax_settings: serializeParallaxSettingsSync(level.parallaxSettings) }),
    ...(level.prefabs !== undefined && { prefabs: serializePrefabsSync(level.prefabs) }),
    ...(level.prefabObjects !== undefined && { prefab_objects: level.prefabObjects }),
    ...(level.themes && level.themes?.length > 0 && { themes: serializeThemesSync(level.themes) }),
    ...(level.triggers && level.triggers.length > 0 && { triggers: serializeTriggersSync(level.triggers) })
  };

  return object;
}

export function deserializeLevelDataSync(level: any): LevelData {
  const object: LevelData = {
    checkpoints: deserializeCheckpointsSync(level.checkpoints),
    editorSettings: deserializeEditorSettingsSync(level.editor),
    editorPrefabSpawn: deserializeEditorPrefabSpawnSettingsSync(level.editor_prefab_spawn),
    events: deserializeEventsSync(level.events),
    markers: deserializeMarkersSync(level.markers),
    objects: deserializeLevelObjectsSync(level.objects),
    parallaxSettings: deserializeParallaxSettingsSync(level.parallax_settings),
    prefabs: deserializePrefabsSync(level.prefabs),
    prefabObjects: level.prefab_objects,
    themes: deserializeThemesSync(level.themes),
    triggers: deserializeTriggersSync(level.triggers)
  }

  return object;
}
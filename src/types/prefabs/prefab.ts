import { Uuid } from "../common";
import { LevelObject, serializeLevelObjectsSync, deserializeLevelObjectsSync } from "../objects";

export interface Prefab {
  name: string;
  description: string;
  type: number;
  id: Uuid;
  preview: string;
  offset: number;

  objects: LevelObject[];
}

export function serializePrefabsSync(prefabs: Prefab[]) {
  if (prefabs.length < 1) { return undefined; }

  const object: Array<any> = [];

  for (const prefab of prefabs) {
    object.push({
      n: prefab.name,
      ...(prefab.description !== undefined && { description: prefab.description }),
      ...(prefab.type !== undefined && { type: prefab.type }),
      ...(prefab.id !== undefined && { id: prefab.id }),
      ...(prefab.preview !== undefined && { preview: prefab.preview }),
      o: prefab.offset,
      objs: serializeLevelObjectsSync(prefab.objects)
    })
  }

  return object;
}

export function deserializePrefabsSync(prefabs: any): Prefab[] {
  if (!prefabs) { return []; }

  const object: Prefab[] = [];

  for (const prefab of prefabs) {
    object.push({
      name: prefab.n,
      description: prefab.description,
      type: prefab.type,
      id: prefab.id,
      preview: prefab.preview,
      offset: prefab.o,
      objects: deserializeLevelObjectsSync(prefab.objs)
    })
  }

  return object;
}
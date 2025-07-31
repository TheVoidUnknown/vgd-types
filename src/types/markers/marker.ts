import { ColorIndex, Uuid } from "../common";

/**
 * Represents an in-editor marker.
 * @interface Marker
 */
export interface Marker {
  /**
   * Immutable ID of this marker.
   * @property {Uuid} id
   */
  id: Uuid;

  /**
   * Visual color of this marker.
   * @property {ColorIndex} color
   */
  color?: ColorIndex;

  /**
   * Description of this marker in-editor.
   * @property {string} name
   */
  description?: string;

  /**
   * Display name of this marker in-editor.
   * @property {string} name
   */
  name?: string;

  /**
   * Timestamp of this marker
   * @property {number} timestamp
   */
  timestamp: number;
}

export function serializeMarkersSync(markers: Marker[]) {
  if (markers.length < 1) { return undefined; }

  const object: Array<any> = [];

  for (const marker of markers) {
    object.push({
      ID: marker.id,
      ...(marker.color !== undefined && { c: marker.color }),
      ...(marker.description !== undefined && { d: marker.description }),
      ...(marker.name !== undefined && { n: marker.name }),
      t: marker.timestamp
    })
  }

  return object;
}

export function deserializeMarkersSync(markers: Array<any>): Marker[] {
  if (!markers) { return []; }

  const object: Marker[] = [];

  for(const marker of markers) {
    object.push({
      id: marker.ID,
      color: marker?.c,
      description: marker?.d,
      name: marker.n,
      timestamp: marker?.t
    })
  }

  return object;
}
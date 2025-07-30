import { ColorIndex, Vector2d } from "../../common";

/**
 * Visual grid settings in-editor.
 * @interface GridSettings
 */
export interface GridSettings {
  /**
   * Visual size of the grid.
   * @property {Vector2d} scale
   */
  scale: Vector2d

  /**
   * Visual thickness of grid lines.
   * @property {number} thickness
   */
  thickness?: number


  /**
   * Visual opacity of grid lines.
   * @property {number} opacity
   */
  opacity?: number
  
  /**
   * Visual color of grid lines.
   * @property {ColorIndex} color
   */
  color?: ColorIndex
}

export function serializeGridSettingsSync(gridSettings: GridSettings) {
  const object: any = {
    ...(gridSettings.scale !== undefined && { scale: gridSettings.scale }),
    ...(gridSettings.thickness !== undefined && { thickness: gridSettings.thickness }),
    ...(gridSettings.opacity !== undefined && { opacity: gridSettings.opacity }),
    ...(gridSettings.color !== undefined && { color: gridSettings.color }),
  };

  return object;
}

export function deserializeGridSettingsSync(gridSettings: any): GridSettings {
  const object: GridSettings = {
    scale: gridSettings.scale,
    thickness: gridSettings.thickness,
    opacity: gridSettings.opacity,
    color: gridSettings.color
  };

  return object;
}
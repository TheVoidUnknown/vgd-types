import { Color, ColorPalette, Uuid } from "../common"

/**
 * Represents a color palette to inherit colors from.
 * @interface Theme
 */
export interface Theme {
  /**
   * Immutable UUID of this theme.
   * @property {Uuid} name
   */
  id: Uuid

  /**
   * Display name of this theme.
   * @property {string} name
   */
  name: string

  /**
   * Hex color to use as the background.
   * @property {Color} background
   */
  background: Color;

  /**
   * Hex color to use as the level progress and credit text GUI.
   * @property {Color} guiColor
   */
  guiColor: Color;

  /**
   * Hex color to use as the nanobot's tail.
   * @property {Color} tailColor
   */
  tailColor: Color;

  /**
   * 4 colors to represent players 1-4.
   * @property {ColorPalette} playerColors
   */
  playerColors: ColorPalette;

  /**
   * 9 colors to represent level objects.
   * @property {ColorPalette} objectColors
   */
  objectColors: ColorPalette;

  /**
   * 9 colors to represent event keyframe colors.
   * @property {ColorPalette} playerColors
   */
  effectsColors: ColorPalette;

  /**
   * 9 colors to represent parallax objects.
   * @property {ColorPalette} parallaxColors
   */
  parallaxColors: ColorPalette;
}

export function serializeThemesSync(themes: Theme[]) {
  if (themes.length < 1) { return undefined; }

  const object: Array<any> = [];

  for (const theme of themes) {
    object.push({
      id: theme.id,
      name: theme.name,
      base_bg: theme.background,
      base_gui: theme.guiColor,
      base_gui_accent: theme.tailColor,
      pla: theme.playerColors,
      obj: theme.objectColors,
      fx: theme.effectsColors,
      bg: theme.parallaxColors
    })
  }

  return object;
}

export function deserializeThemesSync(themes: Array<any>): Theme[] {
  if (!themes) { return []; }

  const object: Theme[] = [];

  for(const theme of themes) {
    object.push({
      id: theme.id,
      name: theme.name,
      background: theme.base_bg,
      guiColor: theme.base_gui,
      tailColor: theme.base_gui_accent,
      playerColors: theme.pla,
      objectColors: theme.obj,
      effectsColors: theme.fx,
      parallaxColors: theme.bg
    })
  }

  return object;
}
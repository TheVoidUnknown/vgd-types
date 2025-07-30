import { BpmSnapSettings, serializeBpmSnapSettingsSync, deserializeBpmSnapSettingsSync } from "./bpmSnapSettings";

export interface BpmSettings {
  /**
   * Timeline snapping settings, toggles snapping for objects and checkpoints.
   * @property {BpmSnapSettings} snap
   */
  snap: BpmSnapSettings;

  /**
   * BPM to snap objects to on the timeline.
   * @property {number} bpmValue
   */
  bpmValue: number;

  /**
   * Number of seconds to offset BPM snapping by.
   * @property {number} bpmOffset
   */
  bpmOffset: number;

  /**
   * Beat fraction to snap to when `bpm_snap_fraction` is `true`.
   * @property {number} bpmSnap
   * 
   * @example bpmSnap: 8 // will snap to 1/8th notes
   */
  snapFraction?: number;

  /**
   * Toggle for applying `bpm_snap`.
   * @property {boolean} bpmSnapFraction
   */
  snapToFractions?: boolean;
}

export function serializeBpmSettingsSync(bpmSettings: BpmSettings) {
  const object: any = {
    ...(bpmSettings.snap !== undefined && { snap: serializeBpmSnapSettingsSync(bpmSettings.snap) }),
    ...(bpmSettings.bpmValue !== undefined && { bpm_value: bpmSettings.bpmValue }),
    ...(bpmSettings.bpmOffset !== undefined && { bpm_offset: bpmSettings.bpmOffset }),
    ...(bpmSettings.snapFraction !== undefined && { bpm_snap: bpmSettings.snapFraction }),
    ...(bpmSettings.snapToFractions !== undefined && { bpm_snap_fraction: bpmSettings.snapToFractions }),
  };

  return object;
}

export function deserializeBpmSettingsSync(bpmSettings: any): BpmSettings {
  const object: BpmSettings = {
    snap: deserializeBpmSnapSettingsSync(bpmSettings.snap),
    bpmValue: bpmSettings.bpm_value,
    bpmOffset: bpmSettings.bpm_offset,
    snapFraction: bpmSettings.bpm_snap,
    snapToFractions: bpmSettings.bpm_snap_fraction
  };

  return object;
}
import { ColorIndex } from "../../common";

export interface PreviewSettings {
  /**
   * Artificial zoom offset in the preview window.
   * @property {number} cameraZoomOffset
   */
  cameraZoomOffset: number;

  /**
   * Color of the true zoom border box in the preview window.
   * @property {ColorIndex} boundaryColor
   */
  boundaryColor: ColorIndex;
}

export function serializePreviewSettingsSync(previewSettings: PreviewSettings) {
  const object: any = {
    ...(previewSettings.cameraZoomOffset !== undefined && { cam_zoom_offset: previewSettings.cameraZoomOffset }),
    ...(previewSettings.boundaryColor !== undefined && { cam_zoom_offset_color: previewSettings.boundaryColor }),
  };

  return object;
}

export function deserializepreviewSettingsSync(previewSettings: any): PreviewSettings {
  const object: PreviewSettings = {
    cameraZoomOffset: previewSettings.cam_zoom_offset,
    boundaryColor: previewSettings.cam_zoom_offset_color
  };

  return object;
}
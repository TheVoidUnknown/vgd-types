export interface GradientSettings {
  gradientType: GradientType;
  rotation: number;
  scale: number;
}

export enum GradientType {
  LeftToRight = 0,
  RightToLeft = 1,
  OuterToCenter = 2,
  CenterToOuter = 3
}
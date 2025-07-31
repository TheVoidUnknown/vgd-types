export enum ObjectType {
  Hit = 0,
  NoHit = 5,
  Empty = 6
}

export const ShapeMap = [
  [
    "SquareFilled",
    "SquareOutline",
    "SquareOutlineThin",
    "SquareCustom"
  ],
  [
    "CircleFilled",
    "CircleOutline",
    "CircleHalf",
    "CircleHalfOutline",
    "CircleOutlineThin",
    "CircleQuarter",
    "CircleQuarterOutline",
    "CircleHalfQuarter",
    "CircleHalfQuarterOutline",
    "CircleCustom"
  ],
  [
    "TriangleFilled",
    "TriangleOutline",
    "TriangleRightFilled",
    "TriangleRightOutline",
    "TriangleBottom",
    "TriangleBottomOutline",
    "TriangleCustom"
  ],
  [
    "Arrow",
    "ArrowHead",
    "Custom"
  ],
  [
    "Text"
  ],
  [
    "HexagonFilled",
    "HexagonOutline",
    "HexagonOutlineThin",
    "HexagonHalf",
    "HexagonHalfOutline",
    "HexagonHalfOutlineThin",
    "HexagonCustom"
  ]
] as const;

export type ShapeName = Exclude<typeof ShapeMap[number][number], null>;

type ShapeTypesObject = {
  [K in ShapeName]: { shapeType: number; shapeOffset: number };
};

export const ShapeTypes: ShapeTypesObject = {} as ShapeTypesObject;

ShapeMap.forEach((shapes, shapeType) => {
  shapes.forEach((shapeName, shapeOffset) => {
    if (shapeName) {
      ShapeTypes[shapeName as ShapeName] = { shapeType, shapeOffset };
    }
  });
});

export type ShapeType = keyof typeof ShapeTypes;

export function getShape<K extends ShapeType>(key: K): ShapeTypesObject[K] {
  return ShapeTypes[key];
}

export function getShapeName(shapeType: number, shapeOffset: number): ShapeName {
  if (shapeType >= 0 && shapeType < ShapeMap.length) {
    const shapes = ShapeMap[shapeType];
    if (shapeOffset >= 0 && shapeOffset < shapes.length) {
      return shapes[shapeOffset];
    }
  }
  throw new Error(`Shape with type "${shapeType}" and offset "${shapeOffset}" does not exist.`)
}
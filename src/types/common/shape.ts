export enum ObjectType {
  Hit = 0,
  NoHit = 5,
  Empty = 6
}

export const ShapeMap = [
  [
    "SquareFilled",
    "SquareOutline",
    "SquareOutlineThin"
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
    "CircleHalfQuarterOutline"
  ],
  [
    "TriangleFilled",
    "TriangleOutline",
    "TriangleRightFilled",
    "TriangleRightOutline"
  ],
  [
    "Arrow",
    "ArrowHead"
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
    "HexagonHalfOutlineThin"
  ]
] as const;

type ShapeName = Exclude<typeof ShapeMap[number][number], null>;

type ShapeTypesObject = {
  [K in ShapeName]: { shapeType: number; shapeOffset: number };
};

const ShapeTypes = {} as ShapeTypesObject;

ShapeMap.forEach((shapes, shapeType) => {
  shapes.forEach((shapeName, shapeOffset) => {
    if (shapeName) {
      ShapeTypes[shapeName as ShapeName] = { shapeType, shapeOffset };
    }
  });
});

export type ShapeType = keyof typeof ShapeTypes;
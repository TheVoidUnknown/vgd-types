import { 
  DespawnType,
  GradientSettings,
  Keyframe,
  ObjectType,
  Uuid,
  Vector2d,
  serializeKeyframes,
  deserializeKeyframes, 
  CustomShapeData,
  getShapeName,
  ShapeName,
  getShape,
  MoveKeyframe,
  ScaleKeyframe,
  RotationKeyframe,
  ColorKeyframe,
  serializeMoveKeyframes,
  serializeScaleKeyframes,
  serializeRotationKeyframes,
  serializeColorKeyframes,
  deserializeMoveKeyframes,
  deserializeScaleKeyframes,
  deserializeRotationKeyframes,
  deserializeColorKeyframes,
} from "../common"

export interface LevelObject {
  id: Uuid;
  prefabId?: string;
  prefabInstanceId?: string;
  parentId?: Uuid;

  despawnType?: DespawnType;
  despawnDelay?: number;
  objectType?: ObjectType;

  name: string;
  text?: string;

  renderDepth: number;
  spawnTime: number;
  origin: Vector2d;
  shape: ShapeName;

  shapeType?: number;
  shapeOffset?: number;

  gradientSettings?: GradientSettings;
  customShape?: CustomShapeData;

  keyframes: {
    move: MoveKeyframe[];
    scale: ScaleKeyframe[];
    rotation: RotationKeyframe[];
    color: ColorKeyframe[];
  }

  inherit?: {
    move: boolean;
    scale: boolean;
    rotate: boolean;
  }

  parentOffset?: {
    move: number;
    scale: number;
    rotate: number;
  }

  timelineData?: {
    collapsed: boolean;
    layer: number;
    bin: number;

    colors: {
      text: {
        r: boolean;
        g: boolean;
        b: boolean;
      }

      background: {
        r: boolean;
        g: boolean;
        b: boolean;
      }
    }
  }
}

export function serializeLevelObjectsSync(levelObjects: LevelObject[]) {
  const object: Array<any> = [];

  for (const levelObject of levelObjects) {
    const intermediary = {
      id: levelObject.id,
      ...(levelObject.prefabId !== undefined && { pre_id: levelObject.prefabId }),
      ...(levelObject.prefabInstanceId !== undefined && { pre_iid: levelObject.prefabInstanceId }),
      ...(levelObject.parentId !== undefined && { p_id: levelObject.parentId }),
      
      ...(levelObject.despawnType !== undefined && { ak_t: levelObject.despawnType }),
      ...(levelObject.despawnDelay !== undefined && { ak_o: levelObject.despawnDelay }),
      ...(levelObject.objectType !== undefined && { ot: levelObject.objectType }),

      ...(levelObject.name !== undefined && { n: levelObject.name }),
      ...(levelObject.text !== undefined && { text: levelObject.text }),

      ...(levelObject.renderDepth !== undefined && { d: levelObject.renderDepth }),
      ...(levelObject.spawnTime !== undefined && { st: levelObject.spawnTime }),
      ...(levelObject.origin !== undefined && { o: levelObject.origin }),

      ...(levelObject.shapeType !== undefined && { s: getShape(levelObject.shape).shapeType || levelObject.shapeType }),
      ...(levelObject.shapeOffset !== undefined && { so: getShape(levelObject.shape).shapeOffset || levelObject.shapeOffset }),

      ...(levelObject.gradientSettings && levelObject.gradientSettings.gradientType !== undefined && { gt: levelObject.gradientSettings.gradientType }),
      ...(levelObject.gradientSettings && levelObject.gradientSettings.rotation !== undefined && { gr: levelObject.gradientSettings.rotation }),
      ...(levelObject.gradientSettings && levelObject.gradientSettings.scale !== undefined && { gs: levelObject.gradientSettings.scale }),

      ...(levelObject.customShape?.sides !== undefined && 
        { csp: [
          levelObject.customShape.sides,
          levelObject.customShape.roundness,
          levelObject.customShape.thickness,
          levelObject.customShape.slices,
          0 // seems to be left over
        ] }
      ),

      e: [
        {k: serializeMoveKeyframes(levelObject.keyframes.move)},
        {k: serializeScaleKeyframes(levelObject.keyframes.scale) },
        {k: serializeRotationKeyframes(levelObject.keyframes.rotation)},
        {k: serializeColorKeyframes(levelObject.keyframes.color)}
      ],

      ...((
        levelObject.inherit?.move !== undefined 
        || levelObject.inherit?.scale !== undefined 
        || levelObject.inherit?.rotate !== undefined 
      ) && 
        { p_t: `${levelObject.inherit.move ? 1 : 0}${levelObject.inherit.scale ? 1 : 0}${levelObject.inherit.rotate ? 1 : 0}` }
      ),

      ...((
        levelObject.parentOffset?.move !== undefined 
        || levelObject.parentOffset?.scale !== undefined 
        || levelObject.parentOffset?.rotate !== undefined 
      ) && 
        { p_o: [
          levelObject.parentOffset.move,
          levelObject.parentOffset.scale,
          levelObject.parentOffset.rotate,
        ] }
      ),

      // we love deeply nested inline logic -._-.
      ...(levelObject.timelineData !== undefined && { 
        ed: {
          ...(levelObject.timelineData.collapsed !== undefined && { co: levelObject.timelineData.collapsed }),
          ...(levelObject.timelineData.layer !== undefined && { l: levelObject.timelineData.layer }),
          ...(levelObject.timelineData.bin !== undefined && { b: levelObject.timelineData.bin }),

          ...((
            levelObject.timelineData.colors.text.r !== undefined
            || levelObject.timelineData.colors.text.g !== undefined
            || levelObject.timelineData.colors.text.b !== undefined
          ) && { 
            tc: {
              ...(levelObject.timelineData.colors.text.r !== undefined && { r: levelObject.timelineData.colors.text.r }),
              ...(levelObject.timelineData.colors.text.g !== undefined && { g: levelObject.timelineData.colors.text.g }),
              ...(levelObject.timelineData.colors.text.b !== undefined && { b: levelObject.timelineData.colors.text.b })
            } 
          }),
          
          ...((
            levelObject.timelineData.colors.background.r !== undefined
            || levelObject.timelineData.colors.background.g !== undefined
            || levelObject.timelineData.colors.background.b !== undefined
          ) && { 
            bgc: {
              ...(levelObject.timelineData.colors.background.r !== undefined && { r: levelObject.timelineData.colors.background.r }),
              ...(levelObject.timelineData.colors.background.g !== undefined && { g: levelObject.timelineData.colors.background.g }),
              ...(levelObject.timelineData.colors.background.b !== undefined && { b: levelObject.timelineData.colors.background.b })
            } 
          }),
        }
      }),

    }

    object.push(intermediary);
  }

  return object;
}

export function deserializeLevelObjectsSync(levelObjects: Array<any>): LevelObject[] {
  const object: LevelObject[] = [];

  for(const levelObject of levelObjects) {
    object.push({
      id: levelObject.id,
      prefabId: levelObject.pre_id,
      prefabInstanceId: levelObject.pre_iid,
      parentId: levelObject.p_id,

      despawnType: levelObject.ak_t,
      despawnDelay: levelObject.ak_o,
      objectType: levelObject.ot,

      name: levelObject.n,
      text: levelObject.text,
      
      renderDepth: levelObject.d,
      spawnTime: levelObject.st,
      origin: levelObject.o,
      shape: getShapeName(levelObject.s || 0, levelObject.so || 0),

      shapeType: levelObject.s,
      shapeOffset: levelObject.so,

      gradientSettings: {
        gradientType: levelObject.gt,
        rotation: levelObject.gr,
        scale: levelObject.gs
      },

      customShape: {
        sides: levelObject.csp && levelObject.csp[0],
        roundness: levelObject.csp && levelObject.csp[1],
        thickness: levelObject.csp && levelObject.csp[2],
        slices: levelObject.csp && levelObject.csp[3]
      },

      keyframes: {
        move: deserializeMoveKeyframes(levelObject.e[0].k),
        scale: deserializeScaleKeyframes(levelObject.e[1].k),
        rotation: deserializeRotationKeyframes(levelObject.e[2].k),
        color: deserializeColorKeyframes(levelObject.e[3].k)
      },

      inherit: {
        move: levelObject.p_t && levelObject.p_t.split("")[0] == "1",
        scale: levelObject.p_t && levelObject.p_t.split("")[1] == "1",
        rotate: levelObject.p_t && levelObject.p_t.split("")[2] == "1"
      },

      parentOffset: {
        move: levelObject?.p_o && levelObject?.p_o[0],
        scale: levelObject?.p_o && levelObject?.p_o[1],
        rotate: levelObject?.p_o && levelObject?.p_o[2]
      },

      timelineData: {
        collapsed: levelObject.ed.co,
        layer: levelObject.ed.l,
        bin: levelObject.ed.b,

        colors: {
          text: {
            r: levelObject?.ed?.tc?.r,
            g: levelObject?.ed?.tc?.g,
            b: levelObject?.ed?.tc?.b
          },

          background: {
            r: levelObject?.ed?.bgc?.r,
            g: levelObject?.ed?.bgc?.g,
            b: levelObject?.ed?.bgc?.b
          }
        }
      }
    })
  }

  return object;
}
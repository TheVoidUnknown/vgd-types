import { 
  ColorIndex,
  CustomShapeData,
  ShapeName,
  Uuid, 
  GradientSettings, 
  Vector2d, 
  getShapeName,
  getShape
} from "../common"

export interface ParallaxObject {
  id: Uuid;

  color: ColorIndex;

  shapeData: {
    shape: ShapeName;
    shapeType: number;
    shapeOffset: number;

    gradient?: GradientSettings;
    customShape?: CustomShapeData;
  }

  transforms: {
    position: Vector2d;
    scale: Vector2d;
    rotation: number;
  }

  animation: {
    animatePosition: boolean;
    animateScale: boolean;
    animateRotation: boolean;
    
    position: Vector2d;
    scale: Vector2d;
    rotation: number;

    loops: number;
    loopDelay: number;
  }
}

export function serializeParallaxObjectsSync(parallaxObjects: ParallaxObject[]) {
  const object: Array<any> = [];

  for (const parallaxObject of parallaxObjects) {
    object.push({
      id: parallaxObject.id,
      ...(parallaxObject.color !== undefined && { c: parallaxObject.color }),

      s: {
        ...(parallaxObject.shapeData.shapeType !== undefined && { s: getShape(parallaxObject.shapeData.shape).shapeType || parallaxObject.shapeData.shapeType }),
        ...(parallaxObject.shapeData.shapeOffset !== undefined && { so: getShape(parallaxObject.shapeData.shape).shapeOffset || parallaxObject.shapeData.shapeOffset }),

        ...(parallaxObject.shapeData.gradient?.gradientType !== undefined && { gt: parallaxObject.shapeData.gradient.gradientType }),
        ...(parallaxObject.shapeData.gradient?.scale !== undefined && { gs: parallaxObject.shapeData.gradient.scale }),
        ...(parallaxObject.shapeData.gradient?.rotation !== undefined && { gr: parallaxObject.shapeData.gradient.rotation }),

        ...(parallaxObject.shapeData.customShape?.sides !== undefined && 
          { csp: [
            parallaxObject.shapeData.customShape.sides,
            parallaxObject.shapeData.customShape.roundness,
            parallaxObject.shapeData.customShape.thickness,
            parallaxObject.shapeData.customShape.slices,
            0 // seems to be left over
          ] }
        ),
      },

      t: {
        ...(parallaxObject.transforms.position.x !== undefined && { 
          p: {
            x: parallaxObject.transforms.position.x,
            y: parallaxObject.transforms.position.y
          } 
        }),

        ...(parallaxObject.transforms.scale.x !== undefined && { 
          s: {
            x: parallaxObject.transforms.scale.x,
            y: parallaxObject.transforms.scale.y
          } 
        }),

        ...(parallaxObject.transforms.rotation !== undefined && { r: parallaxObject.transforms.rotation }),
      },

      an: {
        ...(parallaxObject.animation.animatePosition !== undefined && { ap: parallaxObject.animation.animatePosition }),
        ...(parallaxObject.animation.animateScale !== undefined && { as: parallaxObject.animation.animateScale }),
        ...(parallaxObject.animation.animateRotation !== undefined && { ar: parallaxObject.animation.animateRotation }),

        ...(parallaxObject.animation.loops !== undefined && { l: parallaxObject.animation.loops }),
        ...(parallaxObject.animation.loopDelay !== undefined && { ld: parallaxObject.animation.loopDelay }),

        ...(parallaxObject.animation.position.x !== undefined && { 
          p: {
            x: parallaxObject.animation.position.x,
            y: parallaxObject.animation.position.y
          } 
        }),

        ...(parallaxObject.animation.scale.x !== undefined && { 
          s: {
            x: parallaxObject.animation.scale.x,
            y: parallaxObject.animation.scale.y
          } 
        }),

        ...(parallaxObject.animation.rotation !== undefined && { r: parallaxObject.animation.rotation }),
      }
    })
  }

  return object;
}

export function deserializeParallaxObjectsSync(parallaxObjects: any): ParallaxObject[] {
  const object: ParallaxObject[] = [];

  for (const parallaxObject of parallaxObjects) {
    object.push({
      id: parallaxObject.id,
      color: parallaxObject.c,

      shapeData: {
        shape: getShapeName(parallaxObject.s.s || 0, parallaxObject.s.so || 0),
        shapeType: parallaxObject.s.s,
        shapeOffset: parallaxObject.s.so,

        gradient: {
          gradientType: parallaxObject.s.gt,
          rotation: parallaxObject.s.gr,
          scale: parallaxObject.s.gs
        },

        customShape: {
          sides: parallaxObject.s.csp && parallaxObject.s.csp[0],
          roundness: parallaxObject.s.csp && parallaxObject.s.csp[1],
          thickness: parallaxObject.s.csp && parallaxObject.s.csp[2],
          slices: parallaxObject.s.csp && parallaxObject.s.csp[3]
        }
      },

      transforms: {
        position: { 
          x: parallaxObject.t.p && parallaxObject.t.p.x, 
          y: parallaxObject.t.p && parallaxObject.t.p.y 
        },
        scale: { 
          x: parallaxObject.t.s && parallaxObject.t.s.x,
          y: parallaxObject.t.s && parallaxObject.t.s.y
        },
        rotation: parallaxObject.t && parallaxObject.t.r,
      },

      animation: {
        animatePosition: parallaxObject.an.ap,
        animateScale: parallaxObject.an.as,
        animateRotation: parallaxObject.an.ar,

        position: { 
          x: parallaxObject.an.p && parallaxObject.an.p.x, 
          y: parallaxObject.an.p && parallaxObject.an.p.y
        },
        scale: { 
          x: parallaxObject.an.s && parallaxObject.an.s.x,
          y: parallaxObject.an.s && parallaxObject.an.s.y 
        },
        rotation: parallaxObject.an && parallaxObject.an.r,

        loops: parallaxObject.an.l,
        loopDelay: parallaxObject.an.ld
      }
    })
  }

  return object;
}
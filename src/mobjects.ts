import * as p5 from "p5"
import * as Colors from "./colors"
import { UNIT } from "./constants"

export abstract class MObject {
  color: any//Color
  name: string
  dim: number
  target: any
  zIndex: number
  pointHash: any
  submobjects: MObject[]
  // updaters: Updater[]
  updatingSuspended: boolean
  p5: p5
  constructor({
    color = Colors.WHITE,
    name = null,
    dim = 3,
    target = null,
    zIndex = 0,
    ...kwargs
  } = {}) {
    this.color = color
    this.name = !name ? this.constructor.name : name
    this.dim = dim
    this.target = target
    this.zIndex = zIndex
    this.pointHash = null
    this.submobjects = []
    // this.updaters = []
    this.updatingSuspended = false
    // this.reset_points()
    // this.generate_points()
    this.initColors()
  }
  abstract drawOnCanvas(frame?: number): void
  abstract initColors(): void
}

export abstract class VMObject extends MObject {
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeOpacity: number
  strokeWidth: number
  constructor({
    fillColor = null,
    fillOpacity = 0,
    strokeColor = null,
    strokeOpacity = 1,
    strokeWidth = 4,
    ...kwargs
  } = {}) {
    // @ts-expect-error
    this.fillColor = fillColor
    // @ts-expect-error
    this.fillOpacity = fillOpacity
    // @ts-expect-error
    this.strokeColor = strokeColor
    // @ts-expect-error
    this.strokeOpacity = strokeOpacity
    // @ts-expect-error
    this.strokeWidth = strokeWidth
    super(kwargs)
  }
  initColors() {
    this.fillColor = this.fillColor ?? this.color
    this.strokeColor = this.strokeColor ?? this.color
  }
  drawOnCanvas(fr: number = 1) {
    const fillColor = this.p5.color(this.fillColor)
    fillColor.setAlpha(this.fillOpacity * 255)
    const strokeColor = this.p5.color(this.strokeColor)
    strokeColor.setAlpha(this.strokeOpacity * 255)
    this.p5.push()
    this.p5.fill(fillColor)
    this.p5.stroke(strokeColor)
    this.p5.strokeWeight_(this.strokeWidth)
    this.drawShape(fr)
    this.p5.pop()
  }
  abstract drawShape(fr?: number): void
}

export abstract class TipableVMObject extends VMObject {
  tipLength: number
  normalVector: number[]
  tipStyle: {}
  constructor({
    tipLength = 0.35,
    normalVector = [0, 0, 1],
    tipStyle = {},
    ...kwargs
  }) {
    super(kwargs)
    this.tipLength = tipLength
    this.normalVector = normalVector
    this.tipStyle = tipStyle
  }
}

export class Arc extends TipableVMObject {
  radius: number
  numComponents: number
  arcCenter: number[]
  startAngle: number
  angle: number
  constructor({
    startAngle = 0,
    angle = Math.PI / 2,
    radius = 1,
    numComponents = 9,
    arcCenter = [0, 0, 0],
    ...kwargs
  } = {}) {
    super(kwargs)
    this.radius = radius
    this.numComponents = numComponents
    this.arcCenter = arcCenter
    this.startAngle = startAngle
    this.angle = angle
  }
  drawShape(fr: number) {
    this.p5.arc(this.arcCenter[0], this.arcCenter[1], this.radius * 2, this.radius * 2, this.startAngle, this.startAngle + this.angle * fr)
  }
}

export class Circle extends Arc {
  constructor({
    color = Colors.RED,
    close_new_points = true, anchors_span_full_range = false, ...kwargs
  } = {}) {
    super({
      startAngle: 0,
      angle: Math.PI * 2,
      // @ts-expect-error
      color: color,
      close_new_points: close_new_points,
      anchors_span_full_range: anchors_span_full_range,
      ...kwargs
    })
  }
}

export class Polygon extends VMObject {
  points: [number, number, number][]
  // @ts-ignore
  constructor(vertices: [number, number, number][], { color = Colors.BLUE, ...kwargs } = {}) {
    console.log(arguments, vertices)
    // @ts-ignore
    super({ color, ...kwargs })
    this.setPointsAsCorners(...vertices, vertices[0])
  }
  drawShape(fr: number) {
    this.p5.beginShape()
    for (let point of this.points) this.p5.vertex(...point)
    this.p5.endShape()
  }
  setPointsAsCorners(...points: [number, number, number][]) {
    this.points = points
  }
}



// export class Square extends MObject {
//   x: number
//   y: number
//   s: number
//   constructor(x = 0, y = 0, s = 100, opts = {}) {
//     super(opts)
//     this.x = x;
//     this.y = y;
//     this.s = s;
//   }
//   draw() {
//     const p = this.p5
//     p.push()
//     if (this.fill) p.fill(this.fill)
//     if (this.stroke) p.stroke(this.stroke)
//     if (this.strokeWeight) p.strokeWeight(this.strokeWeight)
//     p.square(this.x, this.y, this.s)
//     p.pop()
//   }
//   drawPartial(fr: number) {
//     const p = this.p5
//     throw new Error("broken")
//     p.push()
//     if (this.fill) p.fill(this.fill)
//     if (this.stroke) p.stroke(this.stroke)
//     if (this.strokeWeight) p.strokeWeight(this.strokeWeight)
//     // const v = this.console.
//     p.beginShape()
//     for (let i = 0; i < 4; i++) {
//       if (fr > i * 0.25 && fr <= (i + 1) * 0.25) {
//         // p.vertex()
//       }
//     }
//     p.endShape()
//     p.pop()
//   }
// }


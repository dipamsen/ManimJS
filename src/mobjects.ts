import * as p5 from "p5"

export abstract class MObject {
  fill: string | null
  stroke: string | null
  strokeWeight: number
  p5: p5
  constructor(opt: { fill?: string | null, stroke?: string | null, strokeWeight?: number } = {}) {
    this.fill = opt.fill || null
    this.stroke = opt.stroke || "red"
    this.strokeWeight = opt.strokeWeight || 2
  }
  abstract draw(): void
  abstract drawPartial(frame: number): void
}

export class Circle extends MObject {
  x: number
  y: number
  r: number
  constructor(x = 0, y = 0, r = 100, opts = {}) {
    super(opts)
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    const p = this.p5
    p.push()
    if (this.fill) p.fill(this.fill)
    if (this.stroke) p.stroke(this.stroke)
    if (this.strokeWeight) p.strokeWeight(this.strokeWeight)
    p.circle(this.x, this.y, this.r)
    p.pop()
  }
  drawPartial(fr: number) {
    const p = this.p5
    p.push()
    if (this.fill) p.fill(this.fill)
    if (this.stroke) p.stroke(this.stroke)
    if (this.strokeWeight) p.strokeWeight(this.strokeWeight)
    p.arc(this.x, this.y, this.r, this.r, 0, fr * p.PI * 2)
    p.pop()
  }
}

export class Square extends MObject {
  x: number
  y: number
  s: number
  constructor(x = 0, y = 0, s = 100, opts = {}) {
    super(opts)
    this.x = x;
    this.y = y;
    this.s = s;
  }
  draw() {
    const p = this.p5
    p.push()
    if (this.fill) p.fill(this.fill)
    if (this.stroke) p.stroke(this.stroke)
    if (this.strokeWeight) p.strokeWeight(this.strokeWeight)
    p.square(this.x, this.y, this.s)
    p.pop()
  }
  drawPartial(fr: number) {
    const p = this.p5
    throw new Error("broken")
    p.push()
    if (this.fill) p.fill(this.fill)
    if (this.stroke) p.stroke(this.stroke)
    if (this.strokeWeight) p.strokeWeight(this.strokeWeight)
    // const v = this.console.
    p.beginShape()
    for (let i = 0; i < 4; i++) {
      if (fr > i * 0.25 && fr <= (i + 1) * 0.25) {
        // p.vertex()
      }
    }
    p.endShape()
    p.pop()
  }
}


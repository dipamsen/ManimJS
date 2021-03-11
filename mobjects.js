// @ts-nocheck
class MObject {
  constructor(opt = {}) {
    this.fill = opt.fill || null
    this.stroke = opt.stroke || "red"
    this.strokeWeight = opt.strokeWeight || 2
  }
}

class Circle extends MObject {
  constructor(x = 0, y = 0, r = 100, opts = {}) {
    super(opts)
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    push()
    if (this.fill) fill(this.fill)
    if (this.stroke) stroke(this.stroke)
    if (this.strokeWeight) strokeWeight(this.strokeWeight)
    circle(this.x, this.y, this.r)
    pop()
  }
  drawPartial(fr) {
    push()
    if (this.fill) fill(this.fill)
    if (this.stroke) stroke(this.stroke)
    if (this.strokeWeight) strokeWeight(this.strokeWeight)
    arc(this.x, this.y, this.r, this.r, 0, fr * PI * 2)
    pop()
  }
}

class Square extends MObject {
  constructor(x = 0, y = 0, s = 100, opts = {}) {
    super(opts)
    this.x = x;
    this.y = y;
    this.s = s;
  }
  draw() {
    push()
    if (this.fill) fill(this.fill)
    if (this.stroke) stroke(this.stroke)
    if (this.strokeWeight) strokeWeight(this.strokeWeight)
    square(this.x, this.y, this.s)
    pop()
  }
  drawPartial(fr) {
    throw new Error("broken")
    push()
    if (this.fill) fill(this.fill)
    if (this.stroke) stroke(this.stroke)
    if (this.strokeWeight) strokeWeight(this.strokeWeight)
    // const v = this.console.
    beginShape()
    for (let i = 0; i < 4; i++) {
      if (fr > i * 0.25 && fr <= (i + 1) * 0.25) {
        vertex()
      }
    }
    endShape()
    pop()
  }
}
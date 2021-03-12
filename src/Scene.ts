// <reference path="./extends.d.ts" />

import { MObject } from "./mobjects"
import { Animation } from "./animations"
import p5 from "p5"
import { UNIT } from "./constants"
export default class Scene {
  mobjects: MObject[]
  animations: Animation[]
  p5: p5
  constructor() {
    this.mobjects = []
    this.animations = []
  }
  add(mobject: MObject) {
    mobject.p5 = this.p5.graphics
    this.mobjects.push(mobject)
  }
  play(animation: Animation) {
    animation.obj.p5 = this.p5.graphics
    this.animations.push(animation)
  }
  construct() {
    throw new Error("Not Implemented")
  }
  get totalDuration() {
    return this.animations.reduce((a, b) => a + b.duration, 0)
  }
}

export function renderScene(UserScene: typeof Scene) {
  const s = new UserScene()
  s.p5 = new p5((p: p5) => {
    let g = p.createGraphics(1280, 720)
    g.strokeWeight_ = (val) => {
      g.strokeWeight(val / UNIT)
      return g
    }
    p.graphics = g
    p.setup = () => {
      p.createCanvas(800, 450)
      g.noFill()
      g.noStroke()
      g.rectMode(p.CENTER)
    }
    p.draw = () => {
      g.push()
      g.translate(g.width / 2, g.height / 2)
      g.scale(UNIT, -UNIT)
      g.background(0)
      s.mobjects.forEach(x => x.drawOnCanvas())
      for (let i = 0; i < s.animations.length; i++) {
        let prev
        if (i == 0) prev = 0
        else prev = s.animations[i - 1].duration
        if (p.frameCount > prev && p.frameCount <= s.animations[i].duration + prev) {
          const frame = p.frameCount - prev
          s.animations[i].animate(frame)
          if (frame == s.animations[i].duration) s.mobjects.push(s.animations[i].obj)
        }
      }
      g.pop()
      p.image(g, 0, 0, p.width, p.height)
      if (p.frameCount >= s.totalDuration) {
        p.noLoop()
        p.print("completed")
        // p.remove()
      }
    }
  })
  s.construct()
}
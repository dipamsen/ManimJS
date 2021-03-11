import { MObject } from "./mobjects"
import { Animation } from "./animations"
import * as p5 from "p5"
export default class Scene {
  mobjects: MObject[]
  animations: Animation[]
  p5: p5
  constructor() {
    this.mobjects = []
    this.animations = []
  }
  add(mobject: MObject) {
    mobject.p5 = this.p5
    this.mobjects.push(mobject)
  }
  play(animation: Animation) {
    animation.obj.p5 = this.p5
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
    p.setup = () => {
      p.createCanvas(400, 400)
      p.noFill()
      p.noStroke()
      p.rectMode(p.CENTER)
    }
    p.draw = () => {
      p.translate(p.width / 2, p.height / 2)
      p.scale(1, -1)
      p.background(0)
      s.mobjects.forEach(x => x.draw())
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
      if (p.frameCount >= s.totalDuration) {
        p.noLoop()
        p.print("completed")
        p.remove()
      }
    }
  })
  s.construct()
}
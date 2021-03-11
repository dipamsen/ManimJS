class Scene {
  constructor() {
    this.mobjects = []
    this.animations = []
  }
  add(mobject) {
    this.mobjects.push(mobject)
  }
  play(animation) {
    this.animations.push(animation)
  }
  construct() {
    throw new Error("Not Implemented")
  }
  get totalDuration() {
    return this.animations.reduce((a, b) => a + b.duration, 0)
  }
}


function renderScene(scene) {
  const s = new scene()
  s.construct()
  const sketch = {
    setup() {
      createCanvas(400, 400)
      noFill()
      noStroke()
      rectMode(CENTER)
    },
    draw() {
      translate(width / 2, height / 2)
      scale(1, -1)
      background(0)
      s.mobjects.forEach(x => x.draw())
      for (let i = 0; i < s.animations.length; i++) {
        let prev
        if (i == 0) prev = 0
        else prev = s.animations[i - 1].duration
        if (frameCount > prev && frameCount <= s.animations[i].duration + prev) {
          const frame = frameCount - prev
          s.animations[i].animate(frame)
          if (frame == s.animations[i].duration) s.mobjects.push(s.animations[i].obj)
        }
      }
      if (frameCount >= s.totalDuration) {
        noLoop()
        print("completed")
      }
    }
  }

  window.setup = sketch.setup
  window.draw = sketch.draw
}
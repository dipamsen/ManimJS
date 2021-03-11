// @ts-nocheck
const { Scene, Square, Circle, renderScene, ShowCreation } = Manim.default

class Manimation extends Scene {
  construct() {
    const sq = new Square()
    const c2 = new Circle(-40, 80, 50, {
      fill: "green",
      stroke: "white"
    })
    this.add(sq)
    this.play(new ShowCreation(c2))
  }
}

renderScene(Manimation)

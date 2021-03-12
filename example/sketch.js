// @ts-nocheck
const { Scene, Square, Circle, Polygon, renderScene, ShowCreation, Colors: C } = Manim

class Manimation extends Scene {
  construct() {
    const c2 = new Circle()

    this.add(new Polygon([[0, 0, 0], [1, 0, 0], [1, 1, 0]]))

    // this.play(new ShowCreation(c2))
  }
}

renderScene(Manimation)

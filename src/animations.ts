import { MObject } from "./mobjects"
import { RateFunction, smooth } from "./rateFunctions"
export abstract class Animation {
  obj: MObject
  rateFunc: RateFunction
  duration: number
  constructor(obj: MObject) {
    this.obj = obj
    this.rateFunc = smooth
    this.duration = 60
  }
  abstract animate(frame: number): void
}

export class ShowCreation extends Animation {
  animate(frame: number) {
    this.obj.drawOnCanvas(this.rateFunc(frame / this.duration))
  }
}
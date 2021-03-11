class ShowCreation {
  constructor(obj) {
    this.obj = obj
    this.rateFnc = rateFns.smooth
    this.duration = 60
  }
  animate(frame) {
    this.obj.drawPartial(rateFns.smooth(frame / this.duration))
  }
}
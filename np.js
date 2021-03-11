// @ts-nocheck
class NumPy {
  clip(a, aMin, aMax) {
    return constrain(a, aMin, aMax)
  }
  exp(num) {
    return Math.E ** num
  }
}

const np = new NumPy()
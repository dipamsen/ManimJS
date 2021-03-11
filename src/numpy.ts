class NumPy {
  clip(a: number, aMin: number, aMax: number) {
    return this.minimum(aMax, this.maximum(a, aMin))
  }
  exp(num: number) {
    return Math.E ** num
  }
  minimum(a: number, b: number) {
    return Math.min(a, b)
  }
  maximum(a: number, b: number) {
    return Math.max(a, b)
  }
}

const np = new NumPy()

export default np
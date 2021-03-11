import np from "./numpy"

export function sigmoid(x: number) {
  return 1 / (1 + np.exp(-x))
}
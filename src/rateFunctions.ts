import np from "./numpy"
import { sigmoid } from "./simpleFunctions"

export type RateFunction = (t: number) => number

export function linear(t: number) {
  return t
}

export function smooth(t: number, inflection = 10) {
  const error = sigmoid(-inflection / 2)
  return np.clip(
    (sigmoid(inflection * (t - 0.5)) - error) / (1 - 2 * error),
    0,
    1
  )
}
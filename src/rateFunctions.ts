const rateFns = {
  linear(t) {
    return t
  },
  smooth(t, inflection = 10) {
    const error = fns.sigmoid(-inflection / 2)
    return np.clip(
      (fns.sigmoid(inflection * (t - 0.5)) - error) / (1 - 2 * error),
      0,
      1
    )
  }
}

const fns = {
  sigmoid(x) {
    return 1 / (1 + np.exp(-x))
  }
}
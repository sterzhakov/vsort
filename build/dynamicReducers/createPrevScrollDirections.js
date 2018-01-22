const createPrevScrollDirections = (memo) => {

  const { isNeedScroll, scrollDirections } = memo

  if (!isNeedScroll) return memo

  return Object.assign({}, memo, {
    prevScrollDirections: scrollDirections || []
  })

}

module.exports = createPrevScrollDirections

const B = require('berries')
const { DRAG_MOVE, DRAG_STOP } = require('../constants')
const scrollContainer = require('../core/scrollContainer')

const createScrollActions = (memo) => {

  const {
    config,
    isNeedScroll,
    scrollDirections,
    prevScrollDirections,
    dragType,
    scrollInterval
  } = memo

  const scrollActions = memo.scrollActions || []

  if (dragType == DRAG_STOP) {

    scrollActions.forEach(scrollAction => {

      clearInterval(scrollAction.intervalId)

    })

  }

  if (dragType != DRAG_MOVE || !isNeedScroll) return memo

  const addScrollDirections =
    scrollDirections.filter(scrollDirection => {

      return !B.include(prevScrollDirections, scrollDirection)

    })

  const removeScrollDirections =
    prevScrollDirections.filter(prevScrollDirection => {

      return !B.include(scrollDirections, prevScrollDirection)

    })

  const addedScrollActions = addScrollDirections.map(addScrollDirection => {

    const intervalId = setInterval(() => {

      scrollContainer({
        containerNode: config.scrollNode,
        intervalId,
        scrollDirection: addScrollDirection
      })

    }, config.scrollSpeed)

    return {
      direction: addScrollDirection,
      intervalId
    }

  })

  const removedScrollActions = scrollActions.filter(scrollAction => {

    const isNeedSave = !B.include(
      removeScrollDirections,
      scrollAction.direction
    )

    if (!isNeedSave) {

      clearInterval(scrollAction.intervalId)

    }

    return isNeedSave

  })

  const newScrollActions = [ ...addedScrollActions, ...removedScrollActions ]

  return Object.assign({}, memo, { scrollActions: newScrollActions })

}

module.exports = createScrollActions

const { DRAG_MOVE } = require('../constants')

const inRange = (number, range) => (number >= range.from && number <= range.to)

const createScrollDirections = (memo) => {

  const { isNeedScroll, config, universalEvent, dragType } = memo

  if (!isNeedScroll || dragType != DRAG_MOVE) return memo

  const scrollNodeBox = config.scrollNode.getBoundingClientRect()

  const body = document.documentElement

  const scrollTop = window.pageYOffset || body.scrollTop
  const scrollLeft = window.pageXOffset || body.scrollLeft

  const scrollFrameBox = {
    top: Math.max(
      scrollNodeBox.top + scrollTop,
      scrollTop
    ),
    bottom: Math.min(
      scrollNodeBox.bottom + scrollTop,
      window.innerHeight + scrollTop
    ),
    left: Math.max(
      scrollNodeBox.left + scrollLeft,
      scrollLeft
    ),
    right: Math.min(
      scrollNodeBox.right + scrollLeft,
      window.innerWidth + scrollLeft
    ),
  }

  const scrollHeight = scrollFrameBox.bottom - scrollFrameBox.top
  const scrollWidth = scrollFrameBox.right - scrollFrameBox.left

  const scrollFillHeight = scrollHeight / 2 / 100 * config.scrollFill
  const scrollFillWidth = scrollWidth / 2 / 100 * config.scrollFill

  const grouppedScrollRanges = {
    horizontal: [
      {
        name: 'left',
        from: -Infinity,
        to: scrollFrameBox.left + scrollFillWidth,
      },
      {
        name: 'right',
        from: scrollFrameBox.right - scrollFillWidth,
        to: Infinity,
      }
    ],
    vertical: [
      {
        name: 'top',
        from: -Infinity,
        to: scrollFrameBox.top + scrollFillHeight,
      },
      {
        name: 'bottom',
        from: scrollFrameBox.bottom - scrollFillHeight,
        to: Infinity,
      },
    ]
  }

  const isHorizontalScrollPresent = (
    config.scrollNode.scrollWidth != config.scrollNode.clientWidth
  )

  const isVertivalScrollPresent = (
    config.scrollNode.scrollHeight != config.scrollNode.clientHeight
  )

  const horizontalScrollRange = isHorizontalScrollPresent
    ? grouppedScrollRanges.horizontal
      .find(range => inRange(event.pageX, range))
    : null

  const verticalScrollRange = isVertivalScrollPresent
    ? grouppedScrollRanges.vertical
      .find(range => inRange(event.pageY, range))
    : null

  const scrollDirections = [ horizontalScrollRange, verticalScrollRange ]
    .filter(range => range)
    .map(range => range.name)

  return Object.assign({}, memo, { scrollDirections })

}

module.exports = createScrollDirections

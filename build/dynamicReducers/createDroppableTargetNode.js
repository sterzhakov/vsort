const { DRAG_MOVE } = require('../constants')

const createDroppableTargetNode = (memo) => {

  const { dragType, universalEvent } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableTargetNode =
    document.elementFromPoint(
      universalEvent.clientX,
      universalEvent.clientY
    )

  return Object.assign({}, memo, { droppableTargetNode })

}

module.exports = createDroppableTargetNode

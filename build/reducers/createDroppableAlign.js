const B = require('berries')
const { DRAG_MOVE } = require('../constants')
const getShift = require('../helpers/getShift')
const getAlign = require('../helpers/getAlign')

const createDroppableAlign = (memo) => {

  const { dragType, droppableNode, config, universalEvent } = memo

  if (dragType == DRAG_MOVE && droppableNode) {

    const droppableShift = getShift(droppableNode, universalEvent)

    const droppableBoundings = droppableNode.getBoundingClientRect()

    const droppableAlign = getAlign(
      config.align,
      droppableShift.x,
      droppableShift.y,
      droppableBoundings.width,
      droppableBoundings.height
    )

    return Object.assign({}, memo, { droppableAlign })

  }

  return memo

}

module.exports = createDroppableAlign

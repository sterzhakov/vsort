const { DRAG_START } = require('../constants')
const getShift = require('../helpers/getShift')

const createDraggableShift = (memo) => {

  const { draggableNode, startUniversalEvent, config, dragType } = memo

  if (dragType != DRAG_START) return memo

  const draggableShift = getShift(draggableNode, startUniversalEvent)

  return Object.assign({}, memo, { draggableShift })

}

module.exports = createDraggableShift

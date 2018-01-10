const { DRAG_START } = require('../constants')
const getShift = require('../helpers/getShift')

const createDraggableShift = (memo) => {

  const { draggableNode, startUniversalEvent, config, dragType } = memo

  if (dragType == DRAG_START) {

    const draggableShift = getShift(draggableNode, startUniversalEvent)

    return Object.assign({}, memo, { draggableShift })

  }

  return memo

}

module.exports = createDraggableShift

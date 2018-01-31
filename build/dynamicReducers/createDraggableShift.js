const { DRAG_START } = require('../constants')
const getShift = require('../helpers/getShift')

const createDraggableShift = (memo) => {

  const { draggableCloneNode, startUniversalEvent, config, dragType } = memo

  if (dragType != DRAG_START) return memo

  const draggableShift = getShift(draggableCloneNode, startUniversalEvent)

  return Object.assign({}, memo, { draggableShift })

}

module.exports = createDraggableShift

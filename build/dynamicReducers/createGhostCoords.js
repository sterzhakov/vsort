const { DRAG_START, DRAG_MOVE, DRAG_STOP } = require('../constants')

const createGhostCoords = (memo) => {

  const {
    startUniversalEvent,
    universalEvent,
    draggableShift,
    dragType
  } = memo

  switch (dragType) {

    case DRAG_START: {

      const x = startUniversalEvent.pageX - draggableShift.x
      const y = startUniversalEvent.pageY - draggableShift.y

      return Object.assign({}, memo, { ghostCoords: { x, y } })

    }

    case DRAG_MOVE: {

      const x = universalEvent.pageX - draggableShift.x
      const y = universalEvent.pageY - draggableShift.y

      return Object.assign({}, memo, { ghostCoords: { x, y } })

    }

    default: {

      return memo

    }

  }

}

module.exports = createGhostCoords

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

      return Object.assign({}, memo, { draggableCoords: { x, y } })

    }

    case DRAG_MOVE: {

      const x = universalEvent.clientX - draggableShift.x
      const y = universalEvent.clientY - draggableShift.y

      return Object.assign({}, memo, { draggableCoords: { x, y } })

    }

    default: {

      return memo

    }

  }

}

module.exports = createGhostCoords

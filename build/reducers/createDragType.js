const B = require('berries')
const { DRAG_START, DRAG_STOP, DRAG_MOVE } = require('../constants')

const createDragType = (memo) => {

  const {
    universalEvent,
    handlerNode,
    draggableNode,
    dragStart,
    prevDragStart
  } = memo

  switch (universalEvent.type) {

    case 'start': {

      return Object.assign({}, memo, { dragType: null })

    }

    case 'move': {

      if (!dragStart || !handlerNode || !draggableNode) {

        return Object.assign({}, memo, { dragType: null })

      } else

      if (dragStart && !prevDragStart) {

        return Object.assign({}, memo, { dragType: DRAG_START })

      } else {

        return Object.assign({}, memo, { dragType: DRAG_MOVE })

      }

    }

    case 'stop': {

      if (!B.include([DRAG_MOVE, DRAG_STOP], memo.dragType)) return memo

      return Object.assign({}, memo, { dragType: DRAG_STOP })

    }

    default: {

      throw new Error('Unknow universalEvent.type: ' + universalEvent.type)

    }

  }

}

module.exports = createDragType

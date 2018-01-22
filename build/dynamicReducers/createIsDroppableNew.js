const { DRAG_MOVE } = require('../constants')

const isDroppableNew = (memo) => {

  const {
    dragType,
    droppableNode,
    prevDroppableNode,
    droppableAlign,
    prevDroppableAlign,
    draggableNode,
  } = memo


  const droppableisDraggableNode = (
    droppableNode &&
    droppableNode.isSameNode(draggableNode)
  )

  if (!droppableNode || droppableisDraggableNode || dragType != DRAG_MOVE) {

    return false

  }

  return (
    !prevDroppableNode ||
    !droppableNode.isSameNode(prevDroppableNode) ||
    droppableNode.isSameNode(prevDroppableNode) &&
    droppableAlign != prevDroppableAlign
  )

}

const createIsDroppableNew = (memo) => {

  return Object.assign({}, memo, { isDroppableNew: isDroppableNew(memo) })

}

module.exports = createIsDroppableNew

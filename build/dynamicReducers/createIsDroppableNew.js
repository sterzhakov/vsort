const { DRAG_MOVE } = require('../constants')

const checkIsDroppableNew = (memo) => {

  const {
    dragType,
    prevDroppableNode,
    droppableAlign,
    prevDroppableAlign,
    droppableNode,
    draggableCloneNode
  } = memo

  const droppableIsDraggableNode = (
    droppableNode &&
    droppableNode.isSameNode(draggableCloneNode)
  )

  if (!droppableNode || droppableIsDraggableNode || dragType != DRAG_MOVE) {

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

  const isDroppableNew = checkIsDroppableNew(memo)

  return Object.assign({}, memo, { isDroppableNew })

}

module.exports = createIsDroppableNew

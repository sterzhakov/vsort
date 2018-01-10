const createDroppablePosition = (memo) => {

  const {
    config,
    dragType,
    droppableNode,
    droppableAlign,
    draggableNode,
    isDroppableNew,
    draggablePosition,
  } = memo

  if (!isDroppableNew) return memo

  const sortableDomNodes = Array.from(config.rootNode.childNodes)

  const droppableIndex = sortableDomNodes
    .findIndex(domNode => domNode.isSameNode(droppableNode))

  const droppablePosition = droppableAlign == 'before'
    ? (
        droppableIndex < draggablePosition
          ? droppableIndex
          : droppableIndex - 1
      )
    : (
        droppableIndex < draggablePosition
          ? droppableIndex + 1
          : droppableIndex
      )

  return Object.assign({}, memo, { droppablePosition })

}

module.exports = createDroppablePosition

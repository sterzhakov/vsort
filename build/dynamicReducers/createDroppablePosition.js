const createDroppablePosition = (memo) => {

  const {
    config,
    dragType,
    droppableNode,
    droppableAlign,
    isDroppableNew,
    draggablePosition,
    droppableGroup,
    rootGroup
  } = memo

  if (!isDroppableNew) return memo

  const droppableRootChilds = Array.from(droppableGroup.node.childNodes)

  const droppableIndex = droppableRootChilds
    .findIndex(domNode => domNode.isSameNode(droppableNode))

  const droppablePosition = (() => {

    if (config.isEmptyNode(droppableNode)) return 0

    const groupIndex = (
      droppableGroup.name != rootGroup.name &&
      droppableNode.nextSibling ||
      droppableGroup.name != rootGroup.name &&
      droppableAlign == 'before'
    ) ? 1 : 0

    return (
      droppableAlign == 'before'
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
    ) + groupIndex

  })()

  return Object.assign({}, memo, { droppablePosition })

}

module.exports = createDroppablePosition

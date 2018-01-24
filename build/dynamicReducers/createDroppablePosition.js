const createDroppablePosition = (memo) => {

  const {
    config,
    dragType,
    droppableNode,
    droppableAlign,
    draggableNode,
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

    const groupIndex = droppableGroup.name == rootGroup.name ? 0 : 1

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

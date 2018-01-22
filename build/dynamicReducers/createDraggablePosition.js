const createDraggablePosition = (memo) => {

  const { config, draggableNode, isDroppableNew, rootGroup } = memo

  if (!isDroppableNew) return memo

  const sortableDomNodes = Array.from(rootGroup.node.childNodes)

  const draggablePosition = sortableDomNodes
    .findIndex(domNode => domNode.isSameNode(draggableNode))

  return Object.assign({}, memo, { draggablePosition })

}

module.exports = createDraggablePosition

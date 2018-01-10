const createDraggablePosition = (memo) => {

  const { config, draggableNode, isDroppableNew } = memo

  if (!isDroppableNew) return memo

  const sortableDomNodes = Array.from(config.rootNode.childNodes)

  const draggablePosition = sortableDomNodes
    .findIndex(domNode => domNode.isSameNode(draggableNode))

  return Object.assign({}, memo, { draggablePosition })

}

module.exports = createDraggablePosition

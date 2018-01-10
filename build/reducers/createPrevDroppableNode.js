const createPrevDroppableNode = (memo) => {

  const { droppableNode } = memo

  if (droppableNode) {

    return Object.assign({}, memo, { prevDroppableNode: droppableNode })

  }

  return memo

}

module.exports = createPrevDroppableNode

const createPrevDroppableNode = (memo) => {

  const { droppableNode } = memo

  if (!droppableNode) return memo

  return Object.assign({}, memo, { prevDroppableNode: droppableNode })
  
}

module.exports = createPrevDroppableNode

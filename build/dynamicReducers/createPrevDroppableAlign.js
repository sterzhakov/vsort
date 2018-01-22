const createPrevDroppableAlign = (memo) => {

  const { droppableAlign } = memo

  if (!droppableAlign) return memo

  return Object.assign({}, memo, { prevDroppableAlign: droppableAlign })

}

module.exports = createPrevDroppableAlign

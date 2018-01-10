const createPrevDroppableAlign = (memo) => {

  const { droppableAlign } = memo

  if (droppableAlign) {

    return Object.assign({}, memo, { prevDroppableAlign: droppableAlign })

  }

  return memo

}

module.exports = createPrevDroppableAlign

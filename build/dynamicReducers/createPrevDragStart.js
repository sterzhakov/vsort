const createPrevDragStart = (memo) => {

  const { dragStart } = memo

  return Object.assign({}, memo, { prevDragStart: dragStart })

}

module.exports = createPrevDragStart

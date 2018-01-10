const createIsNewPosition = (memo) => {

  const { isDroppableNew, draggablePosition, droppablePosition } = memo

  const isNewPosition = (
    isDroppableNew &&
    draggablePosition != droppablePosition
  )

  return Object.assign({}, memo, { isNewPosition })

}

module.exports = createIsNewPosition

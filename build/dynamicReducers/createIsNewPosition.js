const createIsNewPosition = (memo) => {

  const { isDroppableNew, draggablePosition, droppablePosition } = memo

  const isNewPosition = (
    isDroppableNew &&
    draggablePosition != droppablePosition
  )

  if (isNewPosition)
    console.log(memo.droppableNode)

  return Object.assign({}, memo, { isNewPosition })

}

module.exports = createIsNewPosition

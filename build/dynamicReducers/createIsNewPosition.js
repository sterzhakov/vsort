const createIsNewPosition = (memo) => {

  const {
    isDroppableNew,
    draggablePosition,
    droppablePosition,
    droppableGroup,
    rootGroup,
    config
  } = memo

  const isNewPosition = (
    isDroppableNew && (
      droppableGroup.name == rootGroup.name &&
      droppableGroup &&
      draggablePosition != droppablePosition
      ||
      droppableGroup.name != rootGroup.name &&
      droppableGroup
    )
  )

  // console.log(isNewPosition)

  return Object.assign({}, memo, { isNewPosition })

}

module.exports = createIsNewPosition

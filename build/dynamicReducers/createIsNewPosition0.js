const createIsNewPosition = (memo) => {

  const {
    isDroppableNew,
    draggablePosition,
    droppablePosition,
    droppableGroup,
    config
  } = memo

  console.log(memo.rootGroup)

  const isNewPosition = (
    droppableGroup &&
    droppableGroup.name == config.name &&
    isDroppableNew &&
    draggablePosition != droppablePosition
    ||
    droppableGroup &&
    droppableGroup.name != config.name &&
    isDroppableNew
  )

  // console.log(isNewPosition)

  return Object.assign({}, memo, { isNewPosition })

}

module.exports = createIsNewPosition

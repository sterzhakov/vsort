const B = require('berries')
const findParentNodes = require('../helpers/findParentNodes')

const createDraggableNode = (memo) => {

  const {
    universalEvent,
    config,
    isNewPosition,
    rootGroup,
    prevRootGroup,
    droppablePosition
  } = memo

  // see here!!!

  if (isNewPosition && prevRootGroup.name != rootGroup.name) {

    const draggableNode = rootGroup.node.childNodes[droppablePosition]

    return Object.assign({}, memo, { draggableNode })

  }

  if (universalEvent.type != 'start') return memo

  const draggableNode = B.last(
    findParentNodes(universalEvent.target, config.isDraggableNode)
  )

  return Object.assign({}, memo, { draggableNode })

}

module.exports = createDraggableNode

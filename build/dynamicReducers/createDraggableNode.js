const B = require('berries')
const findParentNodes = require('../helpers/findParentNodes')

const createDraggableNode = (memo) => {

  const {
    universalEvent,
    config,
    isNewPosition,
    rootGroup,
    prevRootGroup,
    droppablePosition,
    storageDraggableNode,
  } = memo

  if (universalEvent.type != 'start') return memo

  const draggableNode = B.last(
    findParentNodes(universalEvent.target, config.isDraggableNode)
  )

  draggableNode.ondragstart = () => false

  return Object.assign({}, memo, { draggableNode })

}

module.exports = createDraggableNode

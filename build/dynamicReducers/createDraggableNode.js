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

  if (isNewPosition && prevRootGroup.name != rootGroup.name) {

    const draggableNode = rootGroup.node.childNodes[droppablePosition]

    return Object.assign({}, memo, { draggableNode })

  }

  if (universalEvent.type != 'start') return memo

  const draggableNode = B.last(
    findParentNodes(universalEvent.target, config.isDraggableNode)
  )

  const draggableCloneNode = draggableNode.cloneNode(true)

  draggableNode.parentNode.insertBefore(draggableCloneNode, draggableNode)

  storageDraggableNode.innerHTML = ''
  storageDraggableNode.appendChild(draggableNode)
  draggableNode.style.display = 'none'

  return Object.assign({}, memo, { draggableNode: draggableCloneNode })

}

module.exports = createDraggableNode

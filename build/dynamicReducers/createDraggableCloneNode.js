const { DRAG_START } = require('../constants')

const createDraggableCloneNode = (memo) => {

  const {
    dragType,
    draggableNode,
    storageDraggableNode,
    rootGroup,
    prevRootGroup,
    isNewPosition,
    droppablePosition
  } = memo

  if (isNewPosition && prevRootGroup.name != rootGroup.name) {

    const draggableCloneNode = rootGroup.node.childNodes[droppablePosition]

    return Object.assign({}, memo, { draggableCloneNode })

  }

  if (dragType != DRAG_START) return memo

  const draggableCloneNode = draggableNode.cloneNode(true)

  draggableCloneNode.ondragstart = () => false

  draggableNode.parentNode.insertBefore(draggableCloneNode, draggableNode)

  storageDraggableNode.innerHTML = ''
  storageDraggableNode.appendChild(draggableNode)
  draggableNode.style.display = 'none'

  return Object.assign({}, memo, { draggableCloneNode })

}

module.exports = createDraggableCloneNode

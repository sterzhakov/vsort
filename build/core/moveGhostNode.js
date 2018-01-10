const { DRAG_START, DRAG_STOP, DRAG_MOVE } = require('../constants')
const move = require('../helpers/move')

const moveGhostNode = (memo) => {

  const {
    config,
    dragType,
    ghostNode,
    draggableNode,
    draggableCoords,
    ghostRootNode,
  } = memo

  switch (dragType) {

    case DRAG_START: {

      draggableNode.classList.add(config.draggableClassName)

      if (config.cloneRootNode) {

        config.ghostWrapperNode.appendChild(ghostRootNode)

        ghostRootNode.appendChild(ghostNode)

      } else {

        config.ghostWrapperNode.appendChild(ghostNode)

      }

      move(ghostNode, draggableCoords.x, draggableCoords.y)

      break
    }

    case DRAG_MOVE: {

      move(ghostNode, draggableCoords.x, draggableCoords.y)

      break
    }

    case DRAG_STOP: {

      draggableNode.classList.remove(config.draggableClassName)

      const removeNode = config.cloneRootNode ? ghostRootNode : ghostNode

      removeNode.parentNode.removeChild(removeNode)

      break
    }

  }

}

module.exports = moveGhostNode

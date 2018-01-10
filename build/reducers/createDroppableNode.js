const B = require('berries')
const { DRAG_MOVE } = require('../constants')
const findParentNodes = require('../helpers/findParentNodes')

const createDroppableNode = (memo) => {

  const { config, dragType, ghostNode, universalEvent } = memo

  if (dragType == DRAG_MOVE) {

    const droppableTargetNode = document.elementFromPoint(
      universalEvent.clientX,
      universalEvent.clientY
    )

    if (!droppableTargetNode) return memo

    const droppableNode = B.last(
      findParentNodes(droppableTargetNode, domNode => (
        domNode &&
        domNode.parentNode &&
        domNode.parentNode.isSameNode(config.rootNode)
      ))
    )

    return Object.assign({}, memo, { droppableNode })

  }

  return memo

}

module.exports = createDroppableNode

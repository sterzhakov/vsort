const B = require('berries')
const { DRAG_MOVE } = require('../constants')
const findParentNodes = require('../helpers/findParentNodes')

const createDroppableNode = (memo) => {

  const { config, dragType, droppableTargetParentNodes, droppableGroup } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableNode = droppableTargetParentNodes.find(domNode => {

    return config.isDroppableNode(domNode, droppableGroup.node)

  })

  return Object.assign({}, memo, { droppableNode })

}

module.exports = createDroppableNode

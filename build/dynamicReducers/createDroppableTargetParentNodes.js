const B = require('berries')
const { DRAG_MOVE } = require('../constants')
const findParentNodes = require('../helpers/findParentNodes')

const createDroppableTargetParentNodes = (memo) => {

  const { dragType, droppableTargetNode, groups } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableTargetParentNodes =
    findParentNodes(droppableTargetNode, domNode => (
      groups.find(group => group.node.isSameNode(domNode))
    ))

  return Object.assign({}, memo, { droppableTargetParentNodes })

}

module.exports = createDroppableTargetParentNodes

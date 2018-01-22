const B = require('berries')
const { DRAG_MOVE } = require('../constants')
const findParentNodes = require('../helpers/findParentNodes')

const createDroppableGroup = (memo) => {

  const { config, dragType, droppableTargetParentNodes, groups } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableGroupNode = B.last(droppableTargetParentNodes)

  const droppableGroup = groups.find(group => {

    return group.node.isSameNode(droppableGroupNode)

  })

  return Object.assign({}, memo, { droppableGroup: droppableGroup })

}

module.exports = createDroppableGroup

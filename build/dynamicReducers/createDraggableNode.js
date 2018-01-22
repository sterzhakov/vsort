const B = require('berries')
const findParentNodes = require('../helpers/findParentNodes')

const createDraggableNode = (memo) => {

  const { universalEvent, config } = memo

  if (universalEvent.type != 'start') return memo

  const draggableNode = B.last(
    findParentNodes(universalEvent.target, config.isDraggableNode)
  )

  return Object.assign({}, memo, { draggableNode })

}

module.exports = createDraggableNode

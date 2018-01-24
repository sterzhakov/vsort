const B = require('berries')
const { DRAG_MOVE, DRAG_STOP } = require('../constants')

const createRootGroup = (memo) => {

  const { dragType, isDroppableNew, droppableGroup, config } = memo

  if (dragType == DRAG_STOP) {

    return Object.assign({}, memo, {
      rootGroup: { name: config.name, node: config.rootNode }
    })

  }

  if (dragType != DRAG_MOVE || !isDroppableNew ) return memo

  const rootGroup = droppableGroup

  return Object.assign({}, memo, { rootGroup })

}

module.exports = createRootGroup

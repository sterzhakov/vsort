const B = require('berries')
const { DRAG_MOVE } = require('../constants')

const createRootGroup = (memo) => {

  const { dragType, isDroppableNew, droppableGroup } = memo

  if (dragType != DRAG_MOVE || !isDroppableNew ) return memo

  const rootGroup = droppableGroup

  return Object.assign({}, memo, { rootGroup })

}

module.exports = createRootGroup

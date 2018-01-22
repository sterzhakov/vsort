const B = require('berries')
const { DRAG_MOVE } = require('../constants')

const createRootGroup = (memo) => {

  const { config } = memo

  const rootGroup = { name: config.name, node: config.rootNode }

  return Object.assign({}, memo, { rootGroup })

}

module.exports = createRootGroup

const { DRAG_START } = require('../constants')

const createGhostRootNode = (memo) => {

  const { config, rootGroup } = memo

  if (!config.cloneRootNode || memo.dragType != DRAG_START) return memo

  const ghostRootNode = rootGroup.node.cloneNode()

  return Object.assign({}, memo, { ghostRootNode })

}

module.exports = createGhostRootNode

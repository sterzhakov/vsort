const { DRAG_START } = require('../constants')

const createGhostRootNode = (memo) => {

  const { config } = memo

  if (!config.cloneRootNode) return memo

  switch (memo.dragType) {

    case DRAG_START: {

      const ghostRootNode = config.rootNode.cloneNode()

      return Object.assign({}, memo, { ghostRootNode })

    }

    default: {

      return memo

    }

  }

}

module.exports = createGhostRootNode

const B = require('berries')
const findParentNodes = require('../helpers/findParentNodes')

const createDraggableNode = (memo) => {

  const { universalEvent, config } = memo

  switch (universalEvent.type) {

    case 'start': {

      const draggableNode = B.last(
        findParentNodes(universalEvent.target, config.isDraggableNode)
      )

      return Object.assign({}, memo, { draggableNode })

    }

    case 'move':
    case 'stop': {

      return memo

    }

    default: {

      throw new Error('Unknown universalEvent.type' + universalEvent.type)

    }



  }


}

module.exports = createDraggableNode

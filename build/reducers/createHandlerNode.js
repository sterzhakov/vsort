const B = require('berries')
const findParentNodes = require('../helpers/findParentNodes')

const createHandlerNode = (memo) => {

  const { universalEvent, config } = memo

  switch (universalEvent.type) {

    case 'start': {

      const handlerNode = B.last(
        findParentNodes(universalEvent.target, config.isHandlerNode)
      )

      return Object.assign({}, memo, { handlerNode })

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

module.exports = createHandlerNode

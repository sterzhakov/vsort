const B = require('berries')
const findParentNodes = require('../helpers/findParentNodes')

const createHandlerNode = (memo) => {

  const { universalEvent, config } = memo

  if (universalEvent.type != 'start') return memo

  const handlerNode = B.last(
    findParentNodes(universalEvent.target, config.isHandlerNode)
  )

  return Object.assign({}, memo, { handlerNode })

}

module.exports = createHandlerNode

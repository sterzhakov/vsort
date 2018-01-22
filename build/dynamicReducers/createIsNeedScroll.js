const { DRAG_MOVE, DRAG_STOP } = require('../constants')
const B = require('berries')

const isNeedScroll = (memo) => {

  const { config, universalEvent, dragType, handlerNode } = memo

  const isNeedScroll = (
    config.scrollNode &&
    handlerNode
  )

  return Object.assign({}, memo, { isNeedScroll })

}

module.exports = isNeedScroll

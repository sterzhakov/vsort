const B = require('berries')
const EventSource = require('../core/EventSource')

class TouchmoveSource extends EventSource {

  constructor(domNode, eventType = 'touchmove', options = { passive: false }) {

    super(domNode, eventType, options)

  }


  addWhen(memo) {

    return memo.event.type == 'touchstart'

  }

  removeWhen(memo) {

    return B.include(['touchend', 'touchcancel'], memo.event.type)

  }

}

module.exports = TouchmoveSource

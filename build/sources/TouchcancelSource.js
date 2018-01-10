const B = require('berries')
const EventSource = require('../core/EventSource')

class TouchcancelSource extends EventSource {

  constructor(domNode, eventType = 'touchcancel') {

    super(domNode, eventType)

  }


  addWhen(memo) {

    return memo.event.type == 'touchstart'

  }

  removeWhen(memo) {

    return B.include(['touchend', 'touchcancel'], memo.event.type)

  }

}

module.exports = TouchcancelSource

const EventSource = require('../core/EventSource')

class MouseupSource extends EventSource {

  constructor(domNode, eventType = 'mouseup') {

    super(domNode, eventType)

  }

  addWhen(memo) {

    return memo.event.type == 'mousedown'

  }

  removeWhen(memo) {

    return memo.event.type == 'mouseup'

  }

}

module.exports = MouseupSource

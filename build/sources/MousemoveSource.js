const EventSource = require('../core/EventSource')

class MousemoveSource extends EventSource {

  constructor(domNode, eventType = 'mousemove') {

    super(domNode, eventType)

  }

  addWhen(memo) {

    return memo.event.type == 'mousedown'

  }

  removeWhen(memo) {

    return memo.event.type == 'mouseup'

  }

}

module.exports = MousemoveSource

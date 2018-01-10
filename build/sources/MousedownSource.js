const EventSource = require('../core/EventSource')

class MousedownSource extends EventSource {

  constructor(domNode, eventType = 'mousedown') {

    super(domNode, eventType)

  }

}

module.exports = MousedownSource

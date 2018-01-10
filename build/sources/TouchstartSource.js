const EventSource = require('../core/EventSource')

class TouchstartSource extends EventSource {

  constructor(domNode, eventType = 'touchstart') {

    super(domNode, eventType)

  }

}

module.exports = TouchstartSource

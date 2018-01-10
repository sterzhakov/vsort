class EventSource {

  constructor(domNode, eventType, options = false) {

    this.domNode = domNode
    this.eventType = eventType
    this.options = options
    this.subscribers = []
    this.handleEvent = this.handleEvent.bind(this)
    this.active = false

  }

  listen() {

    this.domNode.addEventListener(this.eventType, this.handleEvent, this.options)
    this.active = true

  }

  mute() {

    this.domNode.removeEventListener(this.eventType, this.handleEvent)
    this.active = false

  }

  handleEvent(event) {

    this.subscribers.forEach(subscriber => {

      subscriber.notify(event)

    })

  }

  addSubscriber(addSubscriber) {

    this.subscribers = [ ...this.subscribers, addSubscriber ]

  }

  removeSubscriber(removeSubscriber) {

    this.subscribers = this.subscribers
      .filter(subscriber => subscriber != removeSubscriber)

  }

}

module.exports = EventSource

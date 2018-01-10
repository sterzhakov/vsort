const getUniversalEventType = (eventType) => {

  switch (eventType) {

    case 'mousedown':
    case 'touchstart': {

      return 'start'

    }

    case 'mousemove':
    case 'touchmove': {

      return 'move'

    }

    case 'touchcancel':
    case 'touchend':
    case 'mouseup': {

      return 'stop'

    }

    default: {

      throw new Error('Unknown event type')

    }

  }

}

module.exports = getUniversalEventType

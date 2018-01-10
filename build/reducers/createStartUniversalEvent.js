const createStartUniversalEvent = (memo) => {

  const { universalEvent } = memo

  switch (universalEvent.type) {

    case 'start': {

      return Object.assign({}, memo, { startUniversalEvent: universalEvent })

    }

    case 'move':
    case 'stop': {

      return memo

    }

    default: {

      throw new Error('Unknow universalEvent.type', universalEvent.type)

    }

  }

}

module.exports = createStartUniversalEvent

const createDragStart = (memo) => {

  const { config, universalEvent, startUniversalEvent } = memo

  switch (universalEvent.type) {

    case 'start': {

      return memo

    }

    case 'move': {

      if (memo.dragStart) return memo

      const diffX = Math.abs(
        startUniversalEvent.clientX - universalEvent.clientX
      )

      const diffY = Math.abs(
        startUniversalEvent.clientY - universalEvent.clientY
      )

      const dragStart = (
        diffX > config.dragStartDistance ||
        diffY > config.dragStartDistance
      )

      return Object.assign({}, memo, { dragStart })

    }

    case 'stop': {

      return Object.assign({}, memo, { dragStart: false })

    }

    default: {

      throw new Error('Unknown universalEvent.type: ' + universalEvent.type)

    }

  }

}

module.exports = createDragStart

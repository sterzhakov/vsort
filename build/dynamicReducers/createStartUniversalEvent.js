const createStartUniversalEvent = (memo) => {

  const { universalEvent } = memo

  if (universalEvent.type != 'start') return memo

  return Object.assign({}, memo, { startUniversalEvent: universalEvent })

}

module.exports = createStartUniversalEvent

const getUniversalEventType = require('../helpers/getUniversalEventType')

const createUniversalEvent = (memo) => {

  const { event } = memo

  const haveTargetTouches = event.targetTouches && event.targetTouches.length

  const coords = haveTargetTouches
    ? {
        pageX: event.targetTouches[0].pageX,
        pageY: event.targetTouches[0].pageY,
        clientX: event.targetTouches[0].clientX,
        clientY: event.targetTouches[0].clientY,
      }
    : {
        pageX: event.pageX,
        pageY: event.pageY,
        clientX: event.clientX,
        clientY: event.clientY,
      }

  const type = getUniversalEventType(event.type)
  const isTouch = !!event.type.match(/^touch/)

  const common = {
    type,
    isTouch,
    haveTargetTouches,
    cancelable: event.cancelable,
    target: event.target,
    originalEvent: event,
  }

  const universalEvent = Object.assign({}, coords, common)

  return Object.assign({}, memo, { universalEvent })

}

module.exports = createUniversalEvent

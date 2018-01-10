const B                        = require('berries')
const findConfigErrors         = require('./core/findConfigErrors')
const Stream                   = require('./core/Stream')
const MousedownSource          = require('./sources/MousedownSource')
const MousemoveSource          = require('./sources/MousemoveSource')
const MouseupSource            = require('./sources/MouseupSource')
const TouchstartSource         = require('./sources/TouchstartSource')
const TouchmoveSource          = require('./sources/TouchmoveSource')
const TouchendSource           = require('./sources/TouchendSource')
const TouchcancelSource        = require('./sources/TouchcancelSource')
const createHandlerNode        = require('./reducers/createHandlerNode')
const createDraggableNode      = require('./reducers/createDraggableNode')
const createUniversalEvent     = require('./reducers/createUniversalEvent')
const createStartUniversalEvent
  = require('./reducers/createStartUniversalEvent')
const createDragStart          = require('./reducers/createDragStart')
const createPrevDragStart      = require('./reducers/createPrevDragStart')
const createDragType           = require('./reducers/createDragType')
const createGhostNode          = require('./reducers/createGhostNode')
const createDraggableShift     = require('./reducers/createDraggableShift')
const createGhostCoords        = require('./reducers/createGhostCoords')
const createDroppableNode      = require('./reducers/createDroppableNode')
const createPrevDroppableNode  = require('./reducers/createPrevDroppableNode')
const createDroppableAlign     = require('./reducers/createDroppableAlign')
const createPrevDroppableAlign = require('./reducers/createPrevDroppableAlign')
const createIsDroppableNew     = require('./reducers/createIsDroppableNew')
const createDroppablePosition  = require('./reducers/createDroppablePosition')
const createDraggablePosition  = require('./reducers/createDraggablePosition')
const createIsNewPosition      = require('./reducers/createIsNewPosition')
const createGhostRootNode      = require('./reducers/createGhostRootNode')
const moveGhostNode            = require('./core/moveGhostNode')

const createSortable = (statedConfig = {}) => {

  const isDraggableNode = domNode => domNode.tagName == 'LI'

  const defaultConfig = {
    align: 'vertical',
    dragStartDistance: 10,
    isDraggableNode,
    isHandlerNode: isDraggableNode,
    ghostClassName: 'sortable__ghost',
    draggableClassName: 'sortable__draggable',
    ghostWrapperNode: document.body,
    touchEvents: true,
    mouseEvents: true,
    cloneRootNode: true,
  }

  const config = Object.assign({}, defaultConfig, statedConfig)

  const configErrors = findConfigErrors(config)

  if (configErrors.length) throw new Error(configErrors.join('. '))

  const stream = new Stream(
    new MousedownSource(config.rootNode),
    new MousemoveSource(document.body),
    new MouseupSource(document.body),
    new TouchstartSource(config.rootNode),
    new TouchmoveSource(document.body),
    new TouchendSource(document.body),
    new TouchcancelSource(document.body),
  )

  return stream.reduce((memo, event) => {

    const initialValue = Object.assign({}, memo, { event })

    const newMemo = B.compose(
      createIsNewPosition,
      createDroppablePosition,
      createDraggablePosition,
      createIsDroppableNew,
      createDroppableAlign,
      createPrevDroppableAlign,
      createDroppableNode,
      createPrevDroppableNode,
      createGhostCoords,
      createDraggableShift,
      createGhostRootNode,
      createGhostNode,
      createDragType,
      createDragStart,
      createPrevDragStart,
      createHandlerNode,
      createDraggableNode,
      createDragType,
      createStartUniversalEvent,
      createUniversalEvent,
    )(initialValue)

    const { universalEvent } = newMemo

    if (universalEvent.isTouch && universalEvent.cancelable) {

      event.preventDefault() // disable double mouse/touch events and scroll

    }

    moveGhostNode(newMemo)
    // scrollParentContainer

    return newMemo

  }, { config })

}

module.exports = createSortable

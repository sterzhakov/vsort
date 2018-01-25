const B                 = require('berries')
const findConfigErrors  = require('./core/findConfigErrors')
const Stream            = require('./core/Stream')
const moveGhostNode     = require('./core/moveGhostNode')
const createDomStorage  = require('./core/createDomStorage')
const MousedownSource   = require('./sources/MousedownSource')
const MousemoveSource   = require('./sources/MousemoveSource')
const MouseupSource     = require('./sources/MouseupSource')
const TouchstartSource  = require('./sources/TouchstartSource')
const TouchmoveSource   = require('./sources/TouchmoveSource')
const TouchendSource    = require('./sources/TouchendSource')
const TouchcancelSource = require('./sources/TouchcancelSource')

const staticReducers = [
  require('./staticReducers/createStorageNode'),
  require('./staticReducers/createStorageGhostNode'),
  require('./staticReducers/createStorageDraggableNode'),
  require('./staticReducers/createGroups'),
  require('./staticReducers/createRootGroup'),
]

const dynamicReducers = [
  require('./dynamicReducers/createScrollActions'),
  require('./dynamicReducers/createScrollDirections'),
  require('./dynamicReducers/createPrevScrollDirections'),
  require('./dynamicReducers/createIsNeedScroll'),
  require('./dynamicReducers/createIsNewPosition'),
  require('./dynamicReducers/createDroppablePosition'),
  require('./dynamicReducers/createDraggablePosition'),
  require('./dynamicReducers/createIsDroppableNew'),
  require('./dynamicReducers/createDroppableAlign'),
  require('./dynamicReducers/createPrevDroppableAlign'),
  require('./dynamicReducers/createDroppableNode'),
  require('./dynamicReducers/createDroppableGroup'),
  require('./dynamicReducers/createDroppableTargetParentNodes'),
  require('./dynamicReducers/createDroppableTargetNode'),
  require('./dynamicReducers/createPrevDroppableNode'),
  require('./dynamicReducers/createGhostCoords'),
  require('./dynamicReducers/createDraggableShift'),
  require('./dynamicReducers/createGhostRootNode'),
  require('./dynamicReducers/createGhostNode'),
  require('./dynamicReducers/createDragType'),
  require('./dynamicReducers/createDragStart'),
  require('./dynamicReducers/createPrevDragStart'),
  require('./dynamicReducers/createHandlerNode'),
  require('./dynamicReducers/createDraggableNode'),
  require('./dynamicReducers/createRootGroup'),
  require('./dynamicReducers/createPrevRootGroup'),
  require('./dynamicReducers/createStartUniversalEvent'),
  require('./dynamicReducers/createUniversalEvent'),
]

const createSortable = (statedConfig = {}) => {

  const isDraggableNode = domNode => domNode.tagName == 'LI'

  const isDroppableNode = (domNode, rootNode) => (
    domNode &&
    domNode.parentNode &&
    domNode.parentNode.isSameNode(rootNode)
  )

  const isEmptyNode = (domNode) => domNode.dataset.sortableEmpty == 'true'

  const defaultConfig = {
    name: 'root',
    rootNode: null,
    depends: [],
    align: 'vertical',
    dragStartDistance: 10,
    isDraggableNode,
    isHandlerNode: isDraggableNode,
    isDroppableNode,
    isEmptyNode,
    ghostClassName: 'sortable__ghost',
    draggableClassName: 'sortable__draggable',
    touchEvents: true,
    mouseEvents: true,
    cloneRootNode: true,
    scrollNode: null,
    scrollFill: 50,
    scrollSpeed: 5,
    dynamicReducers: [],
    staticReducers: [],
    storageWrapperNode: document.body,
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

  const createInitialMemo = B.compose(
    ...[
      ...staticReducers,
      ...config.staticReducers,
    ]
  )

  const initialMemo = createInitialMemo({ config })

  const createNewMemo = B.compose(
    ...[
      ...dynamicReducers,
      ...config.dynamicReducers
    ]
  )

  createDomStorage(initialMemo)

  return stream.reduce((memo, event) => {

    const initialValue = Object.assign({}, memo, { event })

    const newMemo = createNewMemo(initialValue)

    const { universalEvent, handlerNode } = newMemo

    // disable double mouse/touch events and scroll
    if (universalEvent.isTouch && universalEvent.cancelable && handlerNode)
      event.preventDefault()

    moveGhostNode(newMemo)

    return newMemo

  }, initialMemo)

}

module.exports = createSortable

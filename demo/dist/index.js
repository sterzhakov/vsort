/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  asyncMap:       __webpack_require__(35),
  clone:          __webpack_require__(36),
  flatten:        __webpack_require__(21),
  include:        __webpack_require__(13),
  kindOf:         __webpack_require__(12),
  pick:           __webpack_require__(37),
  omit:           __webpack_require__(38),
  union:          __webpack_require__(39),
  capitalize:     __webpack_require__(40),
  uncapitalize:   __webpack_require__(41),
  classNames:     __webpack_require__(42),
  first:          __webpack_require__(43),
  last:           __webpack_require__(44),
  intersect:      __webpack_require__(45),
  times:          __webpack_require__(46),
  findRightIndex: __webpack_require__(47),
  compose:        __webpack_require__(48),
  htmlQuotes:     __webpack_require__(49),
  nth:            __webpack_require__(50),
  move:           __webpack_require__(51),
  insert:         __webpack_require__(52),
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  ROOT_TYPE:     0,
  TEXT_TYPE:     1,
  TAG_TYPE:      2,
  CLASS_TYPE:    3,
  INSTANCE_TYPE: 4,
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  DRAG_START: 'DRAG_START',
  DRAG_STOP:  'DRAG_STOP',
  DRAG_MOVE:  'DRAG_MOVE',
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Component: __webpack_require__(34),
  html: __webpack_require__(79),
  render: __webpack_require__(81),
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const findParentNodes = (domNode, isRootNode, domNodes = []) => {

  if (isRootNode(domNode)) {

    return [ ...domNodes, domNode ]

  } else

  if (!domNode.parentNode) {

    return []

  } else {

    const newDomNodes = [ ...domNodes, domNode ]

    return findParentNodes(domNode.parentNode, isRootNode, newDomNodes)

  }

}

module.exports = findParentNodes


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const { removeRef } = __webpack_require__(15)
const eachNodes = __webpack_require__(16)
const isNodeForUnmount = __webpack_require__(58)

const { INSTANCE_TYPE } = __webpack_require__(1)

const {
  callBeforeMount, callBeforeUnmount, callBeforeUpdate,
  callAfterUpdate, callAfterMount
} = __webpack_require__(59)


const {
  BEFORE_EACH_ITERATION, ON_INSTANCE_CREATE,
  BEFORE_INSTANCE_UPDATE, AFTER_DOM_CREATE
} = __webpack_require__(7)

module.exports = (action, liveNode, templateNode, context) => {

  switch (action) {

    case BEFORE_EACH_ITERATION: {

      if (liveNode && isNodeForUnmount(liveNode, templateNode)) {

        eachNodes(liveNode, (_liveNode) => {

          if (_liveNode.type == INSTANCE_TYPE) {

            callBeforeUnmount(_liveNode.instance)

          }

          if (_liveNode.ref) {

            removeRef(_liveNode)

          }

        })

      }

      break
    }

    case ON_INSTANCE_CREATE: {

      callBeforeMount(liveNode.instance)

      liveNode.instance.waitAfterMount = true

      break
    }

    case BEFORE_INSTANCE_UPDATE: {

      const nextProps = templateNode.props
      const nextState = liveNode.instance.state
      const nextContext = context

      callBeforeUpdate(liveNode.instance, nextProps, nextState, nextContext)

      liveNode.instance.waitAfterUpdate = true

      break
    }

    case AFTER_DOM_CREATE: {

      if (liveNode.instance.waitAfterMount) {

        liveNode.instance.waitAfterMount = false

        callAfterMount(liveNode.instance)

      }

      if (liveNode.instance.waitAfterUpdate) {

        const { prevProps, prevState, prevContext } = liveNode.instance

        callAfterUpdate(liveNode.instance, prevProps, prevState, prevContext)

        liveNode.instance.waitAfterUpdate = false

      }


      break
    }

    default: {

      throw new Error('Unrecognized hook node action')

    }

  }


}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  BEFORE_EACH_ITERATION:  0,
  BEFORE_INSTANCE_UPDATE: 1,
  ON_INSTANCE_CREATE:  2,
  AFTER_DOM_CREATE:       3,
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const mapNodes = __webpack_require__(17)

module.exports = (nodes, instance) => {

    return mapNodes(nodes, node => {

      if (node && 'ref' in node && !node.isChildFromProps) {

        return Object.assign({}, node, {
          ref: {
            name: node.ref,
            instance,
          }
        })

      }

      return node

    })

}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
  INSERT_NODE:  0,
  CREATE_NODE:  1,
  UPDATE_NODE:  2,
  REPLACE_NODE: 3,
  DELETE_NODE:  4,
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const { Component, html } = __webpack_require__(3)
const B = __webpack_require__(0)

class List extends Component {

  render() {

    const { ul, li, span } = html

    return (
      ul({
        ref: 'list',
        class: B.classNames('sort', 'noselect', {
          'sort__vertical':   this.props.align == 'vertical',
          'sort__horizontal': this.props.align == 'horizontal',
        }),
      },
        this.props.items.length
          ? null
          : li({
              'data-sortable-empty': 'true',
              class: 'sort__item',
              key: 'empty',
            },
              'list is empty'
            ),
        this.props.items.map((item) => {
          return (
            li({
              class: 'sort__item',
              key: item.id.toString()
            },
              span({
                class: 'sort__icon cursor-move'
              },
                '#'
              ),
              ' ',
              item.name,
            )
          )
        })
      )
    )

  }

}

module.exports = List


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const { Component, html } = __webpack_require__(3)

class Preview extends Component {

  render() {

    const { div, p, h2 } = html

    return (
      div({ class: 'preview' },
        h2({},
          this.props.name
        ),
        this.props.childs
      )
    )

  }

}

module.exports = Preview


/***/ }),
/* 12 */
/***/ (function(module, exports) {

const checkers = {

  string: (param) => {
    return typeof param == 'string'
  },

  number: (param) => {
    return typeof param == 'number'
  },

  null: (param) => {
    return param === null
  },

  undefined: (param) => {
    return typeof param === 'undefined'
  },

  boolean: (param) => {
    return typeof param == 'boolean'
  },

  object: (param) => {
    return (
      typeof param == 'object' && !Array.isArray(param) && param != null
    )
  },

  array: (param) => {
    return Array.isArray(param)
  },

  function: (param) => {
    return typeof param == 'function'
  },

}

const kindOf = (param) => {
  for (const type in checkers) {
    if (checkers[type](param)) return type
  }
}

module.exports = kindOf


/***/ }),
/* 13 */
/***/ (function(module, exports) {

const include = (array, value) => {
  return array.indexOf(value) > -1
}

module.exports = include


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

module.exports = (nodes) => {

  return nodes.reduce((counter, node) => {

    if (node && node.type == INSTANCE_TYPE) {

      return counter + node.childDomNodesCount

    } else

    if (node && node.type == TEXT_TYPE || node && node.type == TAG_TYPE) {

      return counter + 1

    } else {

      return counter

    }

  }, 0)

}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)

const addRef = (node, payload) => {

  node.ref.instance.refs =
    Object.assign({}, node.ref.instance.refs, {
      [node.ref.name]: payload
    })

}

const removeRef = (node) => {

  node.ref.instance.refs =
    B.omit(node.ref.instance.refs, node.ref.name)

}

module.exports = { addRef, removeRef }


/***/ }),
/* 16 */
/***/ (function(module, exports) {

const loop = (node, callback, level = 0, index = 0) => {

  if (Array.isArray(node)) {

    return node.reduce((lastIndex, _node, index) => {

      return loop(_node, callback, level, lastIndex + 1)

    }, index)

  } else {

    callback(node, level, index)

    if (node && node.childs && node.childs.length > 0) {

      return loop(node.childs, callback, level + 1, index)

    } else {

      return index

    }

  }

}

module.exports = loop


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)

const loop = (node, callback) => {

  const nodeType = B.kindOf(node)

  if (nodeType == 'array') {

    return node.map((_node) => {

      return loop(_node, callback)

    })

  } else

  if (nodeType == 'object') {

    const childs =
      node && node.childs && node.childs.length > 0
        ? loop(node.childs, callback)
        : []

    const newChilds = node.childs ? { childs } : {}

    return Object.assign({}, callback(node), newChilds)

  } else {

    return node

  }

}

module.exports = loop


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {
  CREATE_ROOT:     0,
  CREATE_TEXT:     1,
  CREATE_TAG:      2,
  CREATE_INSTANCE: 3,
  UPDATE_INSTANCE: 4,
  RESUME_INSTANCE: 5,
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)

const NAMES = [
  { id: 0, name: "Kali Volkman"},
  { id: 1, name: "Eino Bailey Jr."},
  { id: 2, name: "Pink Parisian"},
  { id: 3, name: "Ophelia Robel MD"},
  { id: 4, name: "Ocie Lehner"},
  { id: 5, name: "Jerrell Crist"},
  { id: 6, name: "Ole Gerhold"},
  { id: 7, name: "Miss June Rutherford"},
  { id: 8, name: "Clinton Hirthe"},
  { id: 9, name: "Russell Blanda"},
  { id: 10, name: "Christop Dickens"},
  { id: 11, name: "Ms. Peggie Morar"},
  { id: 12, name: "Isabel Hamill"},
  { id: 13, name: "Blanche Konopelski"},
  { id: 14, name: "Cindy Towne"},
  { id: 15, name: "Maybell Hettinger"},
  { id: 16, name: "Fleta Ortiz"},
  { id: 17, name: "Robyn Cartwright"},
  { id: 18, name: "Shanon Heidenreich"},
  { id: 19, name: "Bethany Parker"},
  { id: 20, name: "Dana Murazik"},
  { id: 21, name: "Angel Witting"},
  { id: 22, name: "Mikel Powlowski"},
  { id: 23, name: "Mathew Bernier"},
  { id: 24, name: "Alessandro Weimann"},
  { id: 25, name: "Mrs. Candelario Heller"},
  { id: 26, name: "Walton Bogisich I"},
  { id: 27, name: "Darrel Bashirian DDS"},
  { id: 28, name: "Mr. Gerhard D'Amore"},
  { id: 29, name: "Kory Harber IV"},
  { id: 30, name: "Mr. Cathy White"},
  { id: 31, name: "Colleen Okuneva"},
  { id: 32, name: "Jairo Schmidt"},
  { id: 33, name: "Ms. Christelle Mueller"},
  { id: 34, name: "Mr. Ralph Yost"},
  { id: 35, name: "Mike Rodriguez V"},
  { id: 36, name: "Enrico Considine DDS"},
  { id: 37, name: "Rosemary Grady"},
  { id: 38, name: "Julianne Fahey"},
  { id: 39, name: "Tyrese Brekke"},
  { id: 40, name: "Gerry Lindgren"},
  { id: 41, name: "Mr. Alanis Sawayn"},
  { id: 42, name: "Gerda Raynor"},
  { id: 43, name: "Ms. Lela Windler"},
  { id: 44, name: "Green Cummings"},
  { id: 45, name: "Thelma Cassin"},
  { id: 46, name: "Delaney Ruecker"},
  { id: 47, name: "Mustafa Daniel"},
  { id: 48, name: "Cali Collins DVM"},
  { id: 49, name: "Dakota Fay"}
]

class User {

  static getAll() {

    return NAMES

  }

}

module.exports = User


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const B                 = __webpack_require__(0)
const findConfigErrors  = __webpack_require__(89)
const Stream            = __webpack_require__(90)
const moveGhostNode     = __webpack_require__(91)
const MousedownSource   = __webpack_require__(93)
const MousemoveSource   = __webpack_require__(94)
const MouseupSource     = __webpack_require__(95)
const TouchstartSource  = __webpack_require__(96)
const TouchmoveSource   = __webpack_require__(97)
const TouchendSource    = __webpack_require__(98)
const TouchcancelSource = __webpack_require__(99)

const staticReducers = [
  __webpack_require__(135),
  __webpack_require__(163),
]

const dynamicReducers = [
  __webpack_require__(136),
  __webpack_require__(137),
  __webpack_require__(138),
  __webpack_require__(139),
  __webpack_require__(140),
  __webpack_require__(141),
  __webpack_require__(142),
  __webpack_require__(143),
  __webpack_require__(144),
  __webpack_require__(145),
  __webpack_require__(146),
  __webpack_require__(147),
  __webpack_require__(148),
  __webpack_require__(149),
  __webpack_require__(150),
  __webpack_require__(151),
  __webpack_require__(152),
  __webpack_require__(153),
  __webpack_require__(154),
  __webpack_require__(155),
  __webpack_require__(156),
  __webpack_require__(157),
  __webpack_require__(158),
  __webpack_require__(159),
  __webpack_require__(160),
  __webpack_require__(164),
  __webpack_require__(161),
  __webpack_require__(162),
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
    ghostWrapperNode: document.body,
    touchEvents: true,
    mouseEvents: true,
    cloneRootNode: true,
    scrollNode: null,
    scrollFill: 50,
    scrollSpeed: 5,
    dynamicReducers: [],
    staticReducers: [],
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


/***/ }),
/* 21 */
/***/ (function(module, exports) {

const flatten = (items, newItems = []) => {

  for (const item of items) {

    if (Array.isArray(item)) {

      const _items = item

      newItems = flatten(_items, newItems)

    } else {

      newItems.push(item)

    }

  }

  return newItems
}

module.exports = flatten


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

const loop = (node, level = 0) => {

  const NEW_LINE = '\n'
  const INDENT = '  '.repeat(level)

  if (Array.isArray(node)) {

    return node.reduce((string, node) => {
      return string + loop(node, level)
    }, '')

  } else

  if (node.type == TEXT_TYPE) {

    return INDENT + node.text + NEW_LINE

  } else

  if (node.type == TAG_TYPE) {

    const childs = node.childs ? loop(node.childs, level + 1) : ''
    const props = B.omit(node.props, 'childs')

    return (
      INDENT +
      node.tag +
      '(' + JSON.stringify(props) + ')' +
      NEW_LINE +
      childs
    )


  } else

  if (node.type == CLASS_TYPE) {

    const childs = node.childs ? loop(node.childs, level + 1) : ''
    const props = B.omit(node.props, 'childs')

    return (
      INDENT +
      node.class.name +
      '(' + JSON.stringify(props) + ')' +
      NEW_LINE +
      childs
    )

  } else

  if (node.type == INSTANCE_TYPE) {

    const childs = node.childs ? loop(node.childs, level + 1) : ''
    const props = B.omit(node.instance.props, 'childs')

    return (
      INDENT +
      node.instance.constructor.name.toLowerCase() +
      '(' + JSON.stringify(props) + ')' +
      ' ' +
      JSON.stringify(node.instance.state) +
      NEW_LINE +
      childs
    )

  }

  return ''

}

module.exports = loop


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const createNodes = __webpack_require__(53)
const createCallback = __webpack_require__(54)
const { sortLiveNodes, sortTemplateNodes } = __webpack_require__(25)
const decorateNodes = __webpack_require__(26)
const createNodesWithRefs = __webpack_require__(8)
const createTextNodes = __webpack_require__(64)

module.exports = (liveNodes, templateNodes, options = {}) => {

  const filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {

    const textTemplateNodes =
      createTextNodes(B.flatten([templateNodes]))

    const sortedTemplateNodes =
      sortTemplateNodes(textTemplateNodes)

    const sortedLiveNodes =
      sortLiveNodes(liveNodes, { templateNodes: sortedTemplateNodes })

    return {
      filteredLiveNodes: sortedLiveNodes,
      filteredTemplateNodes: sortedTemplateNodes,
    }

  }

  return createNodes({
    liveNodes,
    templateNodes,
    createNode: createCallback,
    createOptions: {
      hooks: options.hooks,
      linkParent: true,
      childDomNodesCount: true,
      index: true,
    },
    liveParentNode: options.liveParentNode || null,
    liveParentInstanceNode: options.liveParentInstanceNode || null,
    createContext: options.context || {},
    filterNodes
  })

}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = (error, errorExists, errorNotExists) => {

  if (error) {

    errorExists(error)

  } else {

    errorNotExists()

  }

}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)


const isKeyedNode = node => {
  return Boolean(node && node.key)
}


const getLivePairForTemplate = (liveNode, templateNode, keyedLiveNodes) => {

  if (isKeyedNode(templateNode)) {

    return keyedLiveNodes[templateNode.key] || null

  } else

  if (isKeyedNode(liveNode)) {

    return null

  } else

  if (!templateNode) {

    return null

  } else {

    return liveNode || null

  }
}


const wrapNodesWithTheirKeys = (nodes) => {
  return nodes.reduce((keyedNodes, node) => {
    return (node && node.key)
      ? Object.assign({}, keyedNodes, { [node.key]: node })
      : keyedNodes
  }, {})
}


const sortUsedLiveNodes = ({ liveNodes, templateNodes, keyedLiveNodes }) => {

  if (!templateNodes) return []

  return templateNodes.map((templateNode, index) => {

    return getLivePairForTemplate(
      liveNodes[index],
      templateNode,
      keyedLiveNodes
    )

  })

}


const sortUnusedLiveNodes = ({ liveNodes, usedLiveIds }) => {

  return liveNodes.filter((liveNode, index) => {

    return !B.include(usedLiveIds, liveNode.id)

  })

}


const sortLiveNodes = (liveNodes = [], { templateNodes = [] }) => {

  const liveSortableNodes = liveNodes.map((node, index) => {

    return { id: index, key: node.key, node }

  })

  const keyedLiveNodes = wrapNodesWithTheirKeys(liveSortableNodes)

  const usedLiveNodes =
    sortUsedLiveNodes({
      liveNodes: liveSortableNodes,
      templateNodes,
      keyedLiveNodes
    })

  const usedLiveIds = usedLiveNodes.reduce((ids, usedLiveNode, index) => {
    return Number.isInteger(usedLiveNode && usedLiveNode.id)
      ? [ ...ids, usedLiveNode.id ]
      : ids
  }, [])

  const unusedLiveNodes =
    sortUnusedLiveNodes({
      liveNodes: liveSortableNodes,
      usedLiveIds
    })

  const sortableLiveNodes = [ ...usedLiveNodes, ...unusedLiveNodes ]

  return sortableLiveNodes.map((sortableNode) => {

    return sortableNode
      ? sortableNode.node
      : sortableNode

  })

}


const sortTemplateNodes = (templateNodes = []) => {

  return B.flatten([templateNodes]).filter(node => node != null)

}


module.exports = {
  sortLiveNodes,
  sortTemplateNodes,
  wrapNodesWithTheirKeys,
  getLivePairForTemplate,
  isKeyedNode,
  sortUsedLiveNodes,
  sortUnusedLiveNodes,
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = (nodes, { dom = false, order = false }) => {

  if (!nodes) return []

  const info = nodes.reduce((info, node, index) => {

    if (!node) return {
      nodes: [ ...info.nodes, node ],
      order: info.order,
    }

    const nodeDom = dom
      ? { dom: dom[info.order] }
      : {}

    const startFrom = order.startFrom || 0

    const nodeOrder = order
      ? { order: index + startFrom}
      : {}

    const newNode = Object.assign({}, node, nodeDom, nodeOrder)

    return {
      nodes: [ ...info.nodes, newNode ],
      order: info.order + 1,
    }

  }, { nodes: [], order: 0 })

  return info.nodes

}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)


const loop = (node, instance = null) => {

  if (Array.isArray(node)) {

    const newNodes = node.reduce((newNodes, _node) => {
      const newNode = loop(_node, instance)
      return (newNode) ? [ ...newNodes,  newNode] : newNodes
    }, [])

    return B.flatten(newNodes)

  } else

  if (node.type == TAG_TYPE) {

    return Object.assign({},
      B.omit(node, 'childs'),
      { instance },
      { childs: loop(node.childs, instance) }
    )

  } else

  if (node.type == TEXT_TYPE) {

    return Object.assign({}, { instance }, node)

  } else

  if (node.type == INSTANCE_TYPE) {

    return loop(node.childs, node.instance)

  } else

  if (node.type == ROOT_TYPE) {

    return loop(node.childs, instance)

  } else {

    return null

  }

}

module.exports = loop


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const { sortLiveNodes } = __webpack_require__(25)
const reorderDeletedLiveNodes = __webpack_require__(67)
const reorderAddedLiveNodes = __webpack_require__(68)
const decorateNodes = __webpack_require__(26)
const createNodes = __webpack_require__(69)
const createCallback = __webpack_require__(70)

module.exports = ({ offset, liveNodes, templateNodes, domNodes }) => {

  const patchNodes = (
    createNodes({
      offset,
      limit: templateNodes.length,
      liveNodes,
      templateNodes,
      createNode: createCallback,
      domNodes,
      filterNodes: (liveNodes, templateNodes, { domNodes, offset } = {}) => {

        const orderedTemplateNodes =
          decorateNodes(templateNodes, {
            order: { startFrom: offset }
          })

        const withDomLiveNodes =
          decorateNodes(liveNodes, {
            dom: domNodes,
            order: { startFrom: offset },
          })

        const sortedLiveNodes =
          sortLiveNodes(withDomLiveNodes, {
            templateNodes: orderedTemplateNodes
          })

        const reorderedDeletedLiveNodes =
          reorderDeletedLiveNodes(sortedLiveNodes, {
            templateNodes: orderedTemplateNodes,
            offset,
          })

        const reorderedAddedLiveNodes =
          reorderAddedLiveNodes(reorderedDeletedLiveNodes, {
            templateNodes: orderedTemplateNodes
          })

        return {
          filteredLiveNodes: reorderedAddedLiveNodes,
          filteredTemplateNodes: orderedTemplateNodes
        }

      }
    })
  )

  return patchNodes

}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

const updateDomNode = __webpack_require__(74)
const updateNodes = __webpack_require__(78)

module.exports = ({ parentDomNode, patchNodes }) => {

  updateNodes({ patchNodes, parentDomNode, updateDomNode })

}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const events = __webpack_require__(31)

module.exports = (props) => {

  return Object.keys(props).reduce((sortedProps, key) => {

    if (events.hasOwnProperty(key)) {

      const eventProps =
        Object.assign(
          {},
          sortedProps.eventProps,
          { [key]: props[key] }
        )

      return {
        eventProps,
        elementProps: sortedProps.elementProps,
      }

    } else {

      const elementProps =
        Object.assign(
          {},
          sortedProps.elementProps,
          { [key]: props[key] }
        )

      return {
        eventProps: sortedProps.eventProps,
        elementProps,
      }

    }

  }, { eventProps: {}, elementProps: {} })

}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// https://www.w3schools.com/jsref/dom_obj_event.asp

module.exports = {

  // Mouse Events
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onMouseUp: 'mouseup',

  // Keyboard Events
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',

  // Frame/Object Events
  onAbort: 'abort',
  onBeforeUnload: 'beforeunload',
  onError: 'error',
  onHashChange: 'hashchange',
  onLoad: 'load',
  onPagesShow: 'pageshow',
  onPageHide: 'pagehide',
  onResize: 'resize',
  onScroll: 'scroll',
  onUnload: 'unload',

  // Form Events
  onBlur: 'blur',
  onChange: 'change',
  onFocus: 'focus',
  onFocusIn: 'focusin',
  onFocusOut: 'focusout',
  onInput: 'input',
  onInvalid: 'invalid',
  onReset: 'reset',
  onSearch: 'search',
  onSelect: 'select',
  onSubmit: 'submit',

  // Drag Events
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',

  // Clipboard Events
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',

  // Print Events
  onAfterPrint: 'afterprint',
  onBeforePrint: 'beforeprint',

  // Media Events
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough	',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',

  // Animation Events
  animationEnd: 'animationend',
  animationIteration: 'animationiteration',
  animationStart: 'animationstart',

  // Transition Events
  transitionEnd: 'transitionend',

  // Server-Sent Events
  onError: 'error',
  onMessage: 'message',
  onOpen: 'open',

  // Misc Events
  onMessage: 'message',
  onOnline: 'online',
  onOffline: 'offline',
  onPopState: 'popstate',
  onShow: 'show',
  onStorage: 'storage',
  onToggle: 'toggle',
  onWheel: 'wheel',

  // Touch Events
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',

}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

const getShift = (domNode, event) => {

  const boundings = domNode.getBoundingClientRect()

  const pageX = boundings.left + window.pageXOffset
  const pageY = boundings.top + window.pageYOffset

  const shiftX = event.pageX - pageX
  const shiftY = event.pageY - pageY

  return { x: shiftX, y: shiftY }

}

module.exports = getShift


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const { render } = __webpack_require__(3)
const App = __webpack_require__(86)

const $app = document.getElementById('app')

render($app, [], [App.v()])


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const humanizeNodes = __webpack_require__(22)
const countDomNodes = __webpack_require__(14)
const createLiveTree = __webpack_require__(23)
const filterDomNodes = __webpack_require__(27)
const getParentNodes = __webpack_require__(65)
const filterNodesOffsets = __webpack_require__(66)
const createPatchTree = __webpack_require__(28)
const findDomNode = __webpack_require__(73)
const updateDomTree = __webpack_require__(29)
const eachNodes = __webpack_require__(16)
const { INSTANCE_TYPE, CLASS_TYPE } = __webpack_require__(1)
const hookNode = __webpack_require__(6)
const { AFTER_DOM_CREATE } = __webpack_require__(7)
const mapNodes = __webpack_require__(17)
const createNodesWithRefs = __webpack_require__(8)

class Base {

  static defaultProps() {

    return {}

  }

  static v(props = {}, ...childs) {

    const newProps = B.omit(props, 'ref', 'key')

    const baseParams = {
      type: CLASS_TYPE,
      class: this,
      props: newProps,
      childs,
    }

    const refParams = props.ref
      ? { ref: props.ref }
      : {}

    const keyParams = props.key
      ? { key: props.key }
      : {}

    return Object.assign({},
      baseParams,
      refParams,
      keyParams
    )

  }

  constructor(props, context) {

    this.node = null
    this.refs = {}

    this.props = props
    this.state = {}
    this.context = context

    this.prevProps = {}
    this.prevState = {}
    this.prevContext = {}

  }


  isNeedUpdate(nextProps, nextState, nextContext) {

    return true

  }

  passContext() {

    return {}

  }

  render() {

    return null

  }

  setState(newState, callback = false) {

    const newMergedState = Object.assign({}, this.state, newState)

    const newContext = B.clone(this.node.context)

    const injectedContext = this.constructor.injectContext
      ? B.pick(newContext, ...this.constructor.injectContext())
      : {}

    if (
      !this.isNeedUpdate(this.props, newMergedState, injectedContext)
    ) return false

    if ('beforeUpdate' in this) {

      this.beforeUpdate(this.props, newMergedState, injectedContext)

    }

    this.waitAfterUpdate = true

    this.state = newMergedState

    const liveNodes = this.node.childs

    const templateNodes = createNodesWithRefs(
      B.flatten([ this.render() ]),
      this
    )

    const newLiveNodes =
      createLiveTree(liveNodes, templateNodes, {
        hooks: true,
        linkParent: true,
        childDomNodesCount: true,
        index: true,
        context: Object.assign({}, newContext, this.passContext()),
        liveParentNode: this.node,
        liveParentInstanceNode: this.node,
      })

    this.node.childs = newLiveNodes

    this.node.childDomNodesCount = countDomNodes(newLiveNodes)

    const filteredLiveNodes = filterDomNodes(liveNodes, this)

    const filteredTemplateNodes = filterDomNodes(newLiveNodes, this)

    const parentNodes = getParentNodes(filteredLiveNodes[0])

    const parentOffsets = filterNodesOffsets(parentNodes)

    const offset = parentOffsets[parentOffsets.length - 1]

    const boundaryDomNode = findDomNode(parentNodes[0].dom, parentOffsets)

    const domRootNode = boundaryDomNode.parentNode

    const domRootChildNodes =
      Array.from(domRootNode.childNodes)
        .slice(offset, offset + filteredLiveNodes.length)

    const patchNodes =
      createPatchTree({
        offset,
        domNodes: domRootChildNodes,
        liveNodes: filteredLiveNodes,
        templateNodes: filteredTemplateNodes,
      })

    updateDomTree({ patchNodes, parentDomNode: domRootNode })

    eachNodes([this.node], (liveNode) => {

      if (liveNode.type == INSTANCE_TYPE) {

        hookNode(AFTER_DOM_CREATE, liveNode, null, null)

      }

    })


  }

}

module.exports = Base


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = (items, mapper, callback) => {

  if (items.length == 0) return callback(null, [])

  let counter = 0

  let results = []

  items.forEach((item, index) => {

    new Promise((resolve, reject) => {

      mapper(item, index, (error, result) => {

        if (error) {

          reject(error)

        } else {

          resolve(result)

        }

      })

    }).then((result) => {

      results[index] = result

      if (items.length == ++counter)
        callback(null, results)

    }).catch((error) => {

      callback(error, null)

    })

  })

}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const kindOf = __webpack_require__(12)
const include = __webpack_require__(13)

const clone = (argument) => {

  const argumentType = kindOf(argument)


  if (argumentType == 'object') {

    const object = argument

    const newObject = {}

    for (const key in object) {

      const value = object[key]

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newObject[key] = clone(value)

      } else {

        newObject[key] = value

      }

    }

    return newObject

  } else


  if (argumentType == 'array') {

    const array = argument

    const newArray = []

    for (const value of array) {

      const valueType = kindOf(value)

      if (include(['array','object'], valueType)) {

        newArray.push(clone(value))

      } else {

        newArray.push(value)

      }

    }

    return newArray


  } else {

    throw new Error('Cloned argument should be type of Array or Object.')

  }

}

module.exports = clone


/***/ }),
/* 37 */
/***/ (function(module, exports) {

const pick = (object, ...keys) => {
  const newObject = {}
  keys.forEach((key) => {
    if (key in object)
      newObject[key] = object[key]
  })
  return newObject
}

module.exports = pick


/***/ }),
/* 38 */
/***/ (function(module, exports) {

const omit = (object, ...keys) => {
  const newObject = {}
  Object.keys(object).forEach((key) => {
    if (keys.indexOf(key) == -1)
      newObject[key] = object[key]
  })
  return newObject

}

module.exports = omit


/***/ }),
/* 39 */
/***/ (function(module, exports) {

const union = (first, second) => {
  return first.concat(
    second.filter((key) => first.indexOf(key) == -1)
  )
}

module.exports = union


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = (string) => {

  return string.charAt(0).toLowerCase() + string.slice(1)

}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

const flatten = __webpack_require__(21)
const kindOf = __webpack_require__(12)
const include = __webpack_require__(13)

module.exports = (...args) => {

  const unpackObjects = (args) => {

    return args.map((arg) => {

      const argType = kindOf(arg)

      if (argType == 'array') {

        return unpackObjects(arg)

      } else

      if (argType == 'object') {

        return Object.keys(arg).map((key) => {

          return arg[key] ? key : false

        })

      } else {

        return arg

      }

    })

  }

  return (
    flatten( unpackObjects(args) )
      .filter((arg) => {
        return include(['number', 'string'], typeof arg)
      })
      .join(' ')
  )

}


// const flattenNames = flatten(args)
//
// const objectNames = flattenNames.map((arg) => {
//
//   if(kindOf(arg) == 'object') {
//
//     Object.keys(arg).map((key) => {
//
//       if (arg[key]) {
//
//         return key
//
//       }
//
//       return false
//
//     })
//
//   }
//
//   return arg
//
// })
//
// const cleanedClassNames =
//
// return classNames..join(' ')


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[0]

}


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = (array) => {

  return array[array.length - 1]

}


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = (left, right) => {

  if (!Array.isArray(left) || !Array.isArray(right)) return null

  return left.reduce((values, value) => {

    return right.indexOf(value) > -1
      ? [ ...values, value ]
      : values

  }, [])

}


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = (count) => {

  return [...Array(count).keys()]

}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = (items, match) => {

  const loop = (items, index) => {

    if (index == -1) return -1

    return match(items[index])
      ? index
      : loop(items, index - 1)
  }

  return loop(items, items.length - 1)

}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = (...methods) => {

  return (result) => {

    return methods.reduceRight((result, method) => {

      return method(result)

    }, result)

  }

}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

const OPEN_QUOTE_SPECIAL = '&lt;'
const CLOSE_QUOTE_SPECIAL = '&gt;'

const OPEN_QUOTE_SIMPLE = '<'
const CLOSE_QUOTE_SIMPLE = '>'

const SPECIAL_TO_SIMPLE = {
  [OPEN_QUOTE_SPECIAL]:  OPEN_QUOTE_SIMPLE,
  [CLOSE_QUOTE_SPECIAL]: CLOSE_QUOTE_SIMPLE
}

const SIMPLE_TO_SPECIAL = {
  [OPEN_QUOTE_SIMPLE]:  OPEN_QUOTE_SPECIAL,
  [CLOSE_QUOTE_SIMPLE]: CLOSE_QUOTE_SPECIAL
}

const SIMPLE_QUOTES =
  new RegExp(OPEN_QUOTE_SIMPLE + '|' + CLOSE_QUOTE_SIMPLE, 'g')

const SPECIAL_QUOTES =
  new RegExp(OPEN_QUOTE_SPECIAL + '|' + CLOSE_QUOTE_SPECIAL, 'g')

const encode = (string) => (
  string.replace(SIMPLE_QUOTES, match => SIMPLE_TO_SPECIAL[match])
)

const decode = (string) => (
  string.replace(SPECIAL_QUOTES, match => SPECIAL_TO_SIMPLE[match])
)

module.exports = { encode, decode }


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = (items, index) => {

  if (index >= 0) {

    return items[index]

  } else {

    return items[items.length + index]

  }

}


/***/ }),
/* 51 */
/***/ (function(module, exports) {

const move = (items, from, to) => {

  const itemsWithoutFrom = [
    ...items.slice(0, from),
    ...items.slice(from + 1),
  ]

  return [
    ...itemsWithoutFrom.slice(0, to),
    items[from],
    ...itemsWithoutFrom.slice(to),
  ]

}

module.exports = move


/***/ }),
/* 52 */
/***/ (function(module, exports) {

const insert = (items, index, ...newItems) => {

  return [
    ...items.slice(0, index),
    ...newItems,
    ...items.slice(index)
  ]

}

module.exports = insert


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const countDomNodes = __webpack_require__(14)

const createNodes = ({
  liveNodes = [],
  templateNodes = [],
  createNode,
  createOptions = {},
  createContext = {},
  liveParentNode = null,
  liveParentInstanceNode = null,
  filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {
    return {
      filteredLiveNodes: liveNodes,
      filteredTemplateNodes: templateNodes
    }
  }
}) => {

  if (liveNodes.length + templateNodes.length == 0) return []

  const {
    filteredLiveNodes,
    filteredTemplateNodes
  } = filterNodes(liveNodes, templateNodes, liveParentInstanceNode)

  return filteredLiveNodes.reduce((newLiveNodes, liveNode, index) => {

    const templateNode = filteredTemplateNodes[index] || null

    const {
      newLiveNode,
      isNeedChilds,
      liveChilds,
      templateChilds,
      newContext,
      newLiveParentInstanceNode,
    } = createNode({
      index,
      liveNode,
      templateNode,
      options: createOptions,
      context: createContext,
      liveParentInstanceNode,
    })

    if (!newLiveNode) return newLiveNodes

    const nodeIndex =
      createOptions.index
        ? { index }
        : {}

    const parentNode =
      createOptions.linkParent
        ? { parent: liveParentNode }
        : {}

    const newLiveNodeWithInfo =
      Object.assign(
        newLiveNode,
        nodeIndex,
        parentNode,
      )

    if (!isNeedChilds) return [ ...newLiveNodes, newLiveNodeWithInfo ]

    const childs =
      createNodes({
        liveParentNode: newLiveNodeWithInfo,
        liveParentInstanceNode: newLiveParentInstanceNode,
        liveNodes: liveChilds || [],
        templateNodes: templateChilds || [],
        createNode,
        createOptions,
        createContext: newContext,
        filterNodes,
        index,
      })

    const childDomNodesCount =
      createOptions.childDomNodesCount
        ? { childDomNodesCount: countDomNodes(childs) }
        : {}

    const childNodes = { childs }

    const liveNodeWithChilds =
      Object.assign(
        newLiveNodeWithInfo,
        childNodes,
        childDomNodesCount,
      )

    return [ ...newLiveNodes, liveNodeWithChilds ]

  }, [])

}

module.exports = createNodes


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const createNode = __webpack_require__(55)
const hookNode = __webpack_require__(6)
const getCreateAction = __webpack_require__(63)
const handleError = __webpack_require__(24)
const mapNodes = __webpack_require__(17)

const {
  BEFORE_EACH_ITERATION, BEFORE_INSTANCE_UPDATE, ON_INSTANCE_CREATE
} = __webpack_require__(7)

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = __webpack_require__(18)

const { CLASS_TYPE } = __webpack_require__(1)

module.exports = ({
  index,
  liveNode,
  templateNode,
  liveParentInstanceNode,
  options = {
    hooks: false,
  },
  context = {},
}) => {

  const newTemplateNode = templateNode && templateNode.type == CLASS_TYPE
    ? Object.assign({},
        templateNode,
        {
          props: Object.assign({},
            templateNode.props,
            {
              childs: mapNodes(templateNode.childs, node => {

                return Object.assign({}, node, { isChildFromProps: true })

              }) || []
            }
          )
        }
      )
    : templateNode

  const injectedContext = (
    newTemplateNode &&
    newTemplateNode.type == CLASS_TYPE &&
    newTemplateNode.class.injectContext
  ) ? B.pick(context, ... newTemplateNode.class.injectContext())
    : {}

  if (options.hooks) {
    hookNode(
      BEFORE_EACH_ITERATION,
      liveNode,
      newTemplateNode,
      injectedContext
    )
  }

  const createAction = getCreateAction(liveNode, newTemplateNode, injectedContext)

  switch (createAction) {

    case CREATE_ROOT: {

      const newLiveNode =
        createNode({
          type: CREATE_ROOT,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext: context,
        templateChilds: newLiveNode ? newLiveNode.childs : [],
        liveChilds: liveNode ? liveNode.childs : [],
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

    }

    case CREATE_INSTANCE: {

      const newLiveNode =
        createNode({
          type: CREATE_INSTANCE,
          liveNode,
          templateNode: newTemplateNode,
          context,
          injectedContext,
          beforeRender: (instance) => {

            if (options.hooks) {
              hookNode(
                ON_INSTANCE_CREATE,
                { instance }
              )
            }

          }
        })

      const newContext =
        Object.assign(
          {},
          context,
          newLiveNode.instance.passContext()
        )

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext,
        liveChilds: liveNode ? liveNode.childs : [],
        templateChilds: newLiveNode ? newLiveNode.childs : [],
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case UPDATE_INSTANCE: {

      if (options.hooks) {
        hookNode(
          BEFORE_INSTANCE_UPDATE,
          liveNode,
          newTemplateNode,
          injectedContext
        )
      }

      const newLiveNode =
        createNode({
          type: UPDATE_INSTANCE,
          liveNode,
          templateNode: newTemplateNode,
          injectedContext,
          context,
        })

      const newContext =
        Object.assign(
          {},
          context,
          newLiveNode.instance.passContext()
        )

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext,
        liveChilds: liveNode && liveNode.childs || [],
        templateChilds: newLiveNode.childs,
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case RESUME_INSTANCE: {

      const newLiveNode =
        createNode({
          type: RESUME_INSTANCE,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case CREATE_TAG: {

      const newLiveNode =
        createNode({
          type: CREATE_TAG,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        newContext: context,
        isNeedChilds: true,
        liveChilds: liveNode ? liveNode.childs : [],
        templateChilds: newTemplateNode ? newTemplateNode.childs : [],
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

    }

    case CREATE_TEXT: {

      const newLiveNode =
        createNode({
          type: CREATE_TEXT,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

      break
    }

    default: {

      return {
        newLiveNode: null,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: null,
      }

    }

  }


}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

const createRootNode = __webpack_require__(56)
const createInstanceNode = __webpack_require__(57)
const updateInstanceNode = __webpack_require__(60)
const createTagNode = __webpack_require__(61)
const createTextNode = __webpack_require__(62)
const handleError = __webpack_require__(24)
const { addRef } = __webpack_require__(15)

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = __webpack_require__(18)

module.exports = ({
  type = null,
  liveNode = null,
  templateNode = null,
  context = null,
  injectedContext = null,
  beforeRender = null,
}, callback) => {

  switch (type) {

    case CREATE_ROOT: {

      const newRootNode = createRootNode({ templateNode })

      return newRootNode

    }

    case CREATE_INSTANCE: {

      const newLiveNode =
        createInstanceNode({
          templateNode,
          context,
          injectedContext,
          beforeRender,
        })

      if (newLiveNode.ref) {

        addRef(newLiveNode, newLiveNode.instance)

      }

      return newLiveNode

    }

    case UPDATE_INSTANCE: {

      const newLiveNode =
        updateInstanceNode({
          liveNode,
          templateNode,
          context,
          injectedContext,
        })

      if (newLiveNode.ref) {

        addRef(newLiveNode, newLiveNode.instance)

      }

      return newLiveNode

    }

    case RESUME_INSTANCE: {

      return liveNode

    }

    case CREATE_TAG: {

      const newTagNode = createTagNode({ templateNode })

      return newTagNode

    }

    case CREATE_TEXT: {

      const newTextNode = createTextNode({ templateNode })

      return newTextNode

    }

    default: {

      throw new Error('Unrecognized create node type')

    }

  }


}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = ({ templateNode }) => {

  return {
    type: templateNode.type,
    dom: templateNode.dom,
    childs: templateNode.childs,
  }

}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const hookNode = __webpack_require__(6)
const { INSTANCE_TYPE } = __webpack_require__(1)
const createNodesWithRefs = __webpack_require__(8)

module.exports = ({
  templateNode,
  context,
  injectedContext = {},
  afterRender,
  beforeRender,
} = {}) => {

  const newProps = Object.assign({},
    templateNode.class.defaultProps(),
    templateNode.props
  )

  const instance = new templateNode.class(newProps, injectedContext)

  if (beforeRender) beforeRender(instance)

  const refParams = templateNode.ref
    ? { ref: templateNode.ref }
    : {}

  const keyParams = templateNode.key
    ? { key: templateNode.key }
    : {}

  const childs = createNodesWithRefs(
    B.flatten([ instance.render() || null ]),
    instance,
  )

  const newInstanceNode =
    Object.assign({}, {
      context,
      instance,
      type: INSTANCE_TYPE,
      childs,
    },
      refParams,
      keyParams
    )

  instance.node = newInstanceNode

  return newInstanceNode

}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

module.exports = (liveNode, templateNode) => {

  switch (liveNode.type) {

    case ROOT_TYPE: {

      return false

    }

    case INSTANCE_TYPE: {

      if (
        templateNode && templateNode.type == CLASS_TYPE &&
        liveNode.instance instanceof templateNode.class
      ) {

        return false

      } else {

        return true

      }

      break
    }

    case TAG_TYPE: {

      if (
        templateNode &&
        templateNode.type == TAG_TYPE &&
        templateNode.tag == liveNode.tag
      ) {

        return false

      } else {

        return true

      }

      break
    }

    case TEXT_TYPE: {

      if (
        templateNode && 
        templateNode.type == TEXT_TYPE &&
        templateNode.text == liveNode.text
      ) {

        return false

      } else {

        return true

      }

      break
    }

    default: {

      return false

    }


  }

}


/***/ }),
/* 59 */
/***/ (function(module, exports) {

// Before render dom

const callBeforeMount = (instance) => {

  if ('beforeMount' in instance) {

    instance.beforeMount()

  }


}

const callBeforeUpdate = (instance, nextProps, nextState, nextContext) => {

  if ('beforeUpdate' in instance) {

    instance.beforeUpdate(nextProps, nextState, nextContext)

  }

}

const callBeforeUnmount = (instance) => {

  if ('beforeUnmount' in instance) {

    instance.beforeUnmount()

  }

}

// After render dom

const callAfterMount = (instance) => {

  if ('afterMount' in instance) {

    instance.afterMount()

  }

}

const callAfterUpdate = (instance, prevProps, prevState, prevContext) => {

  if ('afterUpdate' in instance) {

    instance.afterUpdate(prevProps, prevState, prevContext)

  }

}

module.exports = {
  callBeforeMount,
  callBeforeUnmount,
  callBeforeUpdate,
  callAfterMount,
  callAfterUpdate
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const createNodesWithRefs = __webpack_require__(8)

module.exports = ({
  liveNode,
  templateNode,
  context,
  injectedContext
}) => {

  const liveType = liveNode.type
  const liveInstance = liveNode.instance

  liveInstance.prevProps = liveInstance.props
  liveInstance.prevState = liveInstance.state
  liveInstance.prevContext = liveInstance.context

  const newProps = Object.assign({},
    templateNode.class.defaultProps(),
    templateNode.props,
  )

  liveInstance.props = newProps
  liveInstance.state = liveInstance.state
  liveInstance.context = injectedContext

  const keyParams = templateNode.key
    ? { key: templateNode.key }
    : {}

  const refParams = templateNode.ref
    ? { ref: templateNode.ref }
    : {}

  const childs = createNodesWithRefs(
    B.flatten([ liveInstance.render() || null ]),
    liveInstance,
  )

  const newInstanceNode =
    Object.assign({}, {
      context,
      type: liveType,
      instance: liveInstance,
      childs,
    },
      keyParams,
      refParams
    )

  liveInstance.node = newInstanceNode

  return newInstanceNode

}


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = ({ templateNode }) => {

  const keyParams = templateNode.key
    ? { key: templateNode.key }
    : {}

  const refParams = templateNode.ref
    ? { ref: templateNode.ref }
    : {}

  const newTagNode = {
    type: templateNode.type,
    tag: templateNode.tag,
    props: templateNode.props,
    childs: templateNode.childs,
  }

  const propsParams = templateNode.key
    ? {
        props: Object.assign({}, templateNode.props, {
          'data-vqua-key': templateNode.key
        })
      }
    : {}

  return Object.assign({},
    newTagNode,
    refParams,
    keyParams,
    propsParams,
  )

}


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = ({ templateNode }) => {

  return {
    type: templateNode.type,
    text: templateNode.text,
  }

}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = __webpack_require__(1)

const {
  CREATE_ROOT, CREATE_TAG, CREATE_TEXT,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = __webpack_require__(18)

module.exports = (liveNode, templateNode, context) => {

  if (templateNode) {

    if (templateNode.type == ROOT_TYPE) {

      return CREATE_ROOT

    } else

    if (templateNode.type == TEXT_TYPE) {

      return CREATE_TEXT

    } else

    if (templateNode.type == TAG_TYPE) {

      return CREATE_TAG

    } else

    if (templateNode.type == CLASS_TYPE) {

      if (
        liveNode &&
        typeof liveNode == 'object' &&
        liveNode.type == INSTANCE_TYPE &&
        liveNode.instance instanceof templateNode.class
      ) {

        const props = templateNode.props
        const state = liveNode.instance.state

        if (liveNode.instance.isNeedUpdate(props, state, context)) {

          return UPDATE_INSTANCE

        } else {

          return RESUME_INSTANCE

        }

      } else {

        return CREATE_INSTANCE

      }

    }


  } else {

    return null

  }

}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

const { TEXT_TYPE } = __webpack_require__(1)

module.exports = (childs) => {

  return childs.map((node) => {

    if (typeof node == 'undefined') {

      return null

    } else

    if (typeof node != 'object' && node != null) {

      return {
        type: TEXT_TYPE,
        text: typeof node == 'number' ? node : node || '',
        childs: []
      }

    }

    return node

  })

}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

const countDomNodes = __webpack_require__(14)
const { INSTANCE_TYPE } = __webpack_require__(1)

const loop = (node, nodes = [], offset = 0) => {

  if (node.parent) {

    if (node.parent.type == INSTANCE_TYPE) {

      const newOffset =
        countDomNodes(
          node.parent.childs.slice(0, node.index)
        ) + offset

      return (
        loop(
          node.parent,
          nodes,
          newOffset
        )
      )

    } else {

      const newOffset =
        countDomNodes(
          node.parent.childs.slice(0, node.index)
        ) + offset

      return (
        loop(
          node.parent,
          [
            Object.assign({}, node, { offset: newOffset }),
            ...nodes
          ],
          0
        )
      )

    }

  } else {

    return [ node, ...nodes ]

  }

}

module.exports = loop


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = (nodes) => {
  return nodes.reduce((offsets, node) => {
    return node.hasOwnProperty('offset')
      ? [ ...offsets, node.offset ]
      : offsets
  }, [])
}


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = (liveNodes, { templateNodes, offset = 0 }) => {

  const savedLiveNodes = liveNodes.slice(0, templateNodes.length)

  const savedLiveStands = savedLiveNodes.map((uncutLiveNode, index) => {

    return { index, node: uncutLiveNode }

  })

  const sortedLiveStands = savedLiveStands.sort((prev, next) => {

    if (prev.node == null) {

      return 1

    } else

    if (next.node == null) {

      return -1

    } else {

      return prev.node.order - next.node.order

    }

  })

  const newLiveStands =
    sortedLiveStands.map((liveStand, index) => {

      if (!liveStand.node) return liveStand

      const newLiveStand = Object.assign({}, liveStand, {
        node: Object.assign({}, liveStand.node, {
          order: offset + index
        })
      })

      return newLiveStand

    })

  const newSavedLiveNodes = newLiveStands
    .sort((prev, next) => prev.index - next.index)
    .map(newLiveStand => newLiveStand.node)

  const newUnsavedLiveNodes = liveNodes
    .slice(templateNodes.length)
    .map(unsavedLiveNode => Object.assign({}, unsavedLiveNode, { order: null }))

  const newLiveNodes = [ ...newSavedLiveNodes, ...newUnsavedLiveNodes ]

  return newLiveNodes

}


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = (liveNodes, { templateNodes }) => {

  const memo = templateNodes.reduce((memo, templateNode, index) => {

    const liveNode = liveNodes[index]

    const newLiveNode = !liveNode || !memo.multipliers.length
      ? liveNode
      : memo.multipliers.reduce((newLiveNode, multiplier) => {

          if (
            newLiveNode.order > multiplier.min &&
            newLiveNode.order < multiplier.max
          ) {

            return Object.assign({},
              newLiveNode,
              { order: newLiveNode.order + multiplier.rate }
            )

          } else {

            return newLiveNode

          }

        }, liveNode)

    const newLiveNodes = [
      ...memo.newLiveNodes,
      newLiveNode
    ]

    if (!liveNode) {

      return {
        newLiveNodes,
        multipliers: [
          ...memo.multipliers,
          {
            min: templateNode.order - 1,
            max: Infinity,
            rate: 1,
          }
        ]
      }

    } else

    if (newLiveNode.order > templateNode.order) {

      return {
        newLiveNodes,
        multipliers: [
          ...memo.multipliers,
          {
            min: -Infinity,
            max: newLiveNode.order,
            rate: 1,
          }
        ]
      }

    } else {

      return {
        newLiveNodes,
        multipliers: memo.multipliers,
      }

    }

  }, { multipliers: [], newLiveNodes: [] })

  return [ ...memo.newLiveNodes, ...liveNodes.slice(templateNodes.length) ]

}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)

const createNodes = ({
  offset = 0,
  limit = 0,
  liveNodes = [],
  templateNodes = [],
  domNodes = [],
  createNode,
  filterNodes = (liveNodes, templateNodes) => {
    return {
      filteredLiveNodes: liveNodes,
      filteredTemplateNodes: templateNodes
    }
  }
}) => {

  const { filteredLiveNodes, filteredTemplateNodes } = (
    filterNodes(liveNodes, templateNodes, { domNodes, offset })
  )

  const maxLength = Math.max(
    filteredLiveNodes.length,
    filteredTemplateNodes.length
  )

  return B.times(maxLength).reduce((patchNodes, index) => {

    const templateNode = filteredTemplateNodes[index] || null
    const liveNode = filteredLiveNodes[index] || null
    const domNode = liveNode && liveNode.dom || null

    const prevPatchNode = patchNodes[patchNodes.length - 1]

    const lastLimit =
      prevPatchNode && prevPatchNode.nextLimit
        ? prevPatchNode.nextLimit
        : limit

    const patchNode =
      createNode({
        index,
        limit: lastLimit,
        offset,
        liveNode,
        templateNode,
      })

    const liveChilds = (
      patchNode.liveNode && patchNode.liveNode.childs || null
    )

    const templateChilds = (
      patchNode.templateNode && patchNode.templateNode.childs || null
    )

    const domChilds = (
      domNode && domNode.childNodes || null
    )

    const childs =
      createNodes({
        offset: 0,
        limit: liveChilds ? liveChilds.length : 0,
        liveNodes: liveChilds || [],
        templateNodes: templateChilds || [],
        createNode,
        filterNodes,
        domNodes: domChilds
      })

    return [ ...patchNodes, Object.assign({}, patchNode, { childs }) ]

  }, [])

}

module.exports = createNodes


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const countActionsScore = __webpack_require__(71)
const getNodeActions = __webpack_require__(72)
const { DELETE_NODE, REPLACE_NODE } = __webpack_require__(9)

module.exports = ({ liveNode, templateNode, limit }) => {

  const actions = getNodeActions({ liveNode, templateNode })

  const actionsScore = countActionsScore(actions)

  const nextLimit = limit + actionsScore

  const newLiveNode =
    B.intersect(actions, [ DELETE_NODE, REPLACE_NODE ]).length
      ? Object.assign({}, liveNode, { childs: [] })
      : liveNode

  const newTemplateNode =
    B.intersect(actions, [ DELETE_NODE ]).length
      ? Object.assign({}, templateNode, { childs: [] })
      : templateNode

  return {
    liveNode: newLiveNode,
    templateNode: newTemplateNode,
    limit,
    actions,
    nextLimit,
  }

}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

const { CREATE_NODE, DELETE_NODE } = __webpack_require__(9)

module.exports = (actions) => {

  return actions.reduce((score, action) => {

    switch (action) {

      case CREATE_NODE: {

        return score + 1

      }

      case DELETE_NODE: {

        return score - 1

      }

      default: {

        return score

      }

    }

  }, 0)

}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

const {
  INSERT_NODE, CREATE_NODE, UPDATE_NODE, REPLACE_NODE, DELETE_NODE
} = __webpack_require__(9)

const { TAG_TYPE, TEXT_TYPE } = __webpack_require__(1)

const actions = [
  {
    name: INSERT_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        liveNode && templateNode &&
        liveNode.order != templateNode.order
      )
    },
  },
  {
    name: CREATE_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        !liveNode &&
        templateNode
      )
    }
  },
  {
    name: UPDATE_NODE,
    check: ({ liveNode, templateNode }) => {

      return (
        liveNode &&
        templateNode &&
        (
          liveNode.type == TAG_TYPE &&
          templateNode.type == TAG_TYPE &&
          liveNode.tag == templateNode.tag
          ||
          liveNode.type == TEXT_TYPE &&
          templateNode.type == TEXT_TYPE &&
          liveNode.text != templateNode.text
        )
      )
    }
  },
  {
    name: REPLACE_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        liveNode &&
        templateNode &&
        (
          liveNode.type != templateNode.type
          ||
          liveNode.type == TAG_TYPE &&
          templateNode.type == TAG_TYPE &&
          liveNode.tag != templateNode.tag
        )
      )
    }
  },
  {
    name: DELETE_NODE,
    check: ({ liveNode, templateNode }) => {
      return (
        liveNode &&
        !templateNode
      ) ? {} : false
    }
  },
]

module.exports = ({ liveNode, templateNode }) => {

  return actions.reduce((names, action) => {

    return action.check({ templateNode, liveNode })
      ? [ ...names, action.name ]
      : names

  }, [])

}


/***/ }),
/* 73 */
/***/ (function(module, exports) {

const loop = (node, offsets, index = 0) => {

  if (index < offsets.length) {

    return loop(
      node.childNodes[offsets[index]],
      offsets,
      index + 1
    )

  } else {

    return node

  }

}

module.exports = loop


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

const { addRef, removeRef } = __webpack_require__(15)
const { createElement, insertAt, updateProps } = __webpack_require__(75)
const sortProps = __webpack_require__(30)
const isPropsEqual = __webpack_require__(77)
const {
  CREATE_NODE, UPDATE_NODE, DELETE_NODE, REPLACE_NODE, INSERT_NODE
} = __webpack_require__(9)
const { TEXT_TYPE } = __webpack_require__(1)

module.exports = ({
  actions,
  templateNode = null,
  liveNode = null,
  parentDomNode = null
}) => {

  if (actions.length == 0) return null

  const domNodes = actions.reduce((domNodes, action) => {

    switch (action) {

      case CREATE_NODE: {

        const newDom = createElement(templateNode)

        insertAt(newDom, parentDomNode, templateNode.order)

        if (templateNode.ref) {

          addRef(templateNode, newDom)

        }

        return [ ...domNodes, newDom ]

        break
      }

      case UPDATE_NODE: {

        if (liveNode.type == TEXT_TYPE) {

          liveNode.dom.nodeValue = templateNode.text

        } else {

          updateProps(
            liveNode.dom,
            liveNode.props,
            templateNode.props,
            (leftValue, rightValue, isFunctions) => {

              return isPropsEqual(leftValue, rightValue)

            }
          )

          if (templateNode.ref) {

            addRef(templateNode, liveNode.dom)

          }

        }

        return [ ...domNodes, liveNode.dom ]

        break
      }

      case DELETE_NODE: {

        parentDomNode.removeChild(liveNode.dom)

        if (liveNode.ref) {

          removeRef(liveNode)

        }

        return domNodes

        break
      }

      case REPLACE_NODE: {

        const newDom = createElement(templateNode)

        if (templateNode.ref) {

          addRef(templateNode, newDom)

        } else

        if (liveNode.ref && !templateNode.ref) {

          removeRef(liveNode)

        }

        parentDomNode.replaceChild(newDom, liveNode.dom)

        return [ ...domNodes, newDom ]

        break
      }

      case INSERT_NODE: {

        insertAt(liveNode.dom, parentDomNode, templateNode.order)

        return [ ...domNodes, liveNode.dom ]

        break
      }

      default: {

        throw new Error('Unknown action type.')

      }

    }

  }, [])

  return domNodes[domNodes.length - 1] || null

}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

const { TEXT_TYPE, TAG_TYPE } = __webpack_require__(1)
const sortProps = __webpack_require__(30)
const events = __webpack_require__(31)
const diffProps = __webpack_require__(76)

const updateProps = (domNode, liveProps, templateProps, isPropsEqual) => {

  const sortedLiveProps = sortProps(liveProps)
  const sortedTemplateProps = sortProps(templateProps)

  updateElementProps(
    domNode,
    sortedLiveProps.elementProps,
    sortedTemplateProps.elementProps,
    isPropsEqual
  )

  updateEventProps(
    domNode,
    sortedLiveProps.eventProps,
    sortedTemplateProps.eventProps,
    isPropsEqual
  )

}

const updateEventProps = (domNode, liveProps, templateProps, isPropsEqual) => {

  const { addProps, removeProps } =
    diffProps(
      liveProps,
      templateProps,
      isPropsEqual
    )

  removeProps.forEach(prop => removeEventProp(domNode, prop))
  addProps.forEach(prop => addEventProp(domNode, prop))

}

const updateElementProps = (domNode, liveProps, templateProps, isPropsEqual) => {

  const { addProps, removeProps } =
    diffProps(
      liveProps,
      templateProps,
      isPropsEqual
    )

  addProps.forEach((prop) => {

    const isPropsForAdd = (
      typeof prop.value == 'string' ||
      typeof prop.value == 'number' ||
      prop.value == true
    )

    if (isPropsForAdd) {

      const booleanProp = (prop.value === true) ? { value: '' } : {}

      const filteredProp = Object.assign({}, prop, booleanProp)

      addElementProp(domNode, filteredProp)

    } else {

      removeElementProp(domNode, prop)

    }

  })

  removeProps.forEach(prop => removeElementProp(domNode, prop))

}

const addElementProp = (domNode, prop) => {

  domNode.setAttribute(prop.key, prop.value)

}

const removeElementProp = (domNode, prop) => {

  domNode.removeAttribute(prop.key)

}

const addEventProp = (domNode, prop) => {

  domNode.addEventListener(events[prop.key], prop.value)

}

const removeEventProp = (domNode, prop) => {

  domNode.removeEventListener(events[prop.key], prop.value)

}

const createElement = (templateNode) => {

  switch (templateNode.type) {

    case TAG_TYPE: {

      const element = document.createElement(templateNode.tag)

      updateProps(element, {}, templateNode.props)

      return element
    }

    case TEXT_TYPE: {

      const element = document.createTextNode(templateNode.text)

      return element
    }

    default: {

      throw new Error('Unknown template node type:', templateNode.type)

    }

  }

}

const insertAt = (domNode, parentDomNode, order) => {

  const beforeDomNode =
    parentDomNode.childNodes[order]
      ? parentDomNode.childNodes[order]
      : parentDomNode.childNodes[parentDomNode.childNodes.length]

  parentDomNode.insertBefore(domNode, beforeDomNode)

}

module.exports = {
  updateProps,
  updateEventProps,
  updateElementProps,
  addElementProp,
  removeElementProp,
  addEventProp,
  removeEventProp,
  createElement,
  insertAt
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)

module.exports = (leftProps = {}, rightProps = {}, isPropsEqual) => {

  const keys = B.union(
    Object.keys(leftProps),
    Object.keys(rightProps)
  )

  return keys.reduce((sortedProps, key) => {

    if (leftProps.hasOwnProperty(key) && !rightProps.hasOwnProperty(key)) {

      return {
        addProps: sortedProps.addProps,
        removeProps: [
          ...sortedProps.removeProps,
          { key, value: leftProps[key] }
        ],
      }

    } else

    if (!leftProps.hasOwnProperty(key) && rightProps.hasOwnProperty(key)) {

      return {
        addProps: [
          ...sortedProps.addProps,
          { key, value: rightProps[key] }
        ],
        removeProps: sortedProps.removeProps,
      }

    } else {

      const isFunctions = (
        typeof leftProps[key] == 'function' &&
        typeof rightProps[key] == 'function'
      )

      const isEqual =
        isPropsEqual(
          leftProps[key],
          rightProps[key],
          isFunctions
        )

      if (!isEqual && isFunctions) {

        const addProps = [
          ...sortedProps.addProps,
          {
            key,
            value: rightProps[key]
          }
        ]

        const removeProps = [
          ...sortedProps.removeProps,
          {
            key,
            value: leftProps[key]
          }
        ]

        return { addProps, removeProps }

      } else

      if (!isEqual && !isFunctions) {

        const addProps = [
          ...sortedProps.addProps,
          {
            key,
            value: rightProps[key]
          }
        ]

        const removeProps = sortedProps.removeProps

        return { addProps, removeProps }

      } else {

        return sortedProps

      }

    }

  }, { addProps: [], removeProps: [] })

}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)

module.exports = (leftProp, rightProp) => {

  const left = {
    prop: leftProp,
    type: B.kindOf(leftProp)
  }

  const right = {
    prop: rightProp,
    type: B.kindOf(rightProp)
  }

  if (left.type == right.type) {

    switch (left.type) {

      case 'function': {

        return false

        break
      }

      default: {

        return left.prop == right.prop

      }

    }

  } else {

    return false

  }


}


/***/ }),
/* 78 */
/***/ (function(module, exports) {

const updateNodes = ({ patchNodes, parentDomNode, updateDomNode }) => {

  patchNodes.forEach((patchNode) => {

    const updateParams = Object.assign({}, patchNode, { parentDomNode })

    const domNode = updateDomNode(updateParams)

    if (patchNode.childs.length > 0) {

      updateNodes({
        patchNodes: patchNode.childs,
        parentDomNode: domNode,
        updateDomNode
      })

    }

  })

  return parentDomNode

}

module.exports = updateNodes


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

const { TAG_TYPE, TEXT_TYPE } = __webpack_require__(1)
const tags = __webpack_require__(80)
const B = __webpack_require__(0)

const h = (tag, props = {}, childs) => {

  const refParams = props.ref
    ? { ref: props.ref }
    : {}

  const keyParams = props.key
    ? { key: props.key }
    : {}

  const newProps = B.omit(props, 'ref', 'key')

  const baseParams = {
    tag,
    type: TAG_TYPE,
    props: newProps,
    childs
  }

  return Object.assign({}, baseParams, refParams, keyParams)


}

module.exports.h = h

tags.forEach((tag) => {

  module.exports[tag] = (props = {}, ...childs) => {

    return h(tag, props, childs)

  }

})


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = [
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"keygen",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"math",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"svg",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { ROOT_TYPE, INSTANCE_TYPE } = __webpack_require__(1)
const createLiveTree = __webpack_require__(23)
const filterDomNodes = __webpack_require__(27)
const eachNodes = __webpack_require__(16)
const hookNode = __webpack_require__(6)
const { AFTER_DOM_CREATE } = __webpack_require__(7)
const createPatchTree = __webpack_require__(28)
const updateDomTree = __webpack_require__(29)
const dom2vqua = __webpack_require__(82)
const humanizeNodes = __webpack_require__(22)

module.exports = (parentDomNode, liveNodes, templateNodes, context = {}) => {

  const templateNodesWithRoot = [
    {
      type: ROOT_TYPE,
      dom: parentDomNode,
      childs: B.flatten([templateNodes]),
    }
  ]

  const newLiveNodes =
    createLiveTree(
      liveNodes,
      templateNodesWithRoot,
      {
        hooks: true,
        context,
      }
    )

  const templateDomNodes = filterDomNodes(newLiveNodes)

  const liveDomNodes = liveNodes.length == 0
    ? dom2vqua(parentDomNode.childNodes)
    : filterDomNodes(liveNodes)

  const patchNodes =
    createPatchTree({
      offset: 0,
      liveNodes: liveDomNodes,
      templateNodes: templateDomNodes,
      domNodes: Array.from(parentDomNode.childNodes),
    })

  updateDomTree({ patchNodes, parentDomNode })

  eachNodes(newLiveNodes, (liveNode) => {

    if (liveNode.type == INSTANCE_TYPE) {

      hookNode(AFTER_DOM_CREATE, liveNode, null, null)

    }

  })

  return newLiveNodes

}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

const convertTag = __webpack_require__(83)
const convertText = __webpack_require__(84)
const mapNodes = __webpack_require__(85)

module.exports = (nodes) => {

  const TAG_TYPE = 1
  const TEXT_TYPE = 3

  return mapNodes(nodes, (node) => {

    if (node.nodeType == TAG_TYPE) {

      return convertTag(node)

    } else

    if (node.nodeType == TEXT_TYPE) {

      return convertText(node)

    } else {

      return null

    }

  })

}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

const { TAG_TYPE } = __webpack_require__(1)

module.exports = (node) => {

  const propsParams = {

    props: Array.from(node.attributes).reduce((props, attribute) => {

      return Object.assign({}, props, {
        [attribute.nodeName]: node.getAttribute(attribute.nodeName)
      })

    }, {})

  }

  const keyParams = 'data-vqua-key' in propsParams.props
    ? { key: propsParams.props['data-vqua-key'] }
    : {}

  return (
    Object.assign({}, propsParams, keyParams, {
      type: TAG_TYPE,
      tag: node.tagName.toLowerCase(),
      dom: node,
    })
  )

}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

const { TEXT_TYPE } = __webpack_require__(1)

module.exports = (node) => {

  return {
    type: TEXT_TYPE,
    text: node.textContent,
    dom: node,
  }

}


/***/ }),
/* 85 */
/***/ (function(module, exports) {

const loop = (node, createNode) => {

  if (node.nodeType == undefined) {

    return Array.from(node).map((node) => {

      return loop(node, createNode)

    })

  } else {

    const newNode = createNode(node)

    if (typeof newNode == 'object') {

      const childs = loop(node.childNodes, createNode)

      return Object.assign({}, newNode, { childs })

    } else

    if (typeof newNode == 'string') {

      return newNode

    } else {

      return null

    }

  }

}


module.exports = loop


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

const { html, Component } = __webpack_require__(3)
const B = __webpack_require__(0)
const List = __webpack_require__(10)
const Preview = __webpack_require__(11)
const Menu = __webpack_require__(87)
const PageVertical = __webpack_require__(88)
const PageHorizontal = __webpack_require__(130)
const PageScroll = __webpack_require__(131)
const PageMultiple = __webpack_require__(132)

const setActivePageById = (id, pages) => {

  return pages.map(page => {

    const active = page.id == id

    return Object.assign({}, page, { active })

  })

}

class App extends Component {

  constructor(props, state) {

    super(props, state)

    const pages = [
      {
        id: 'vertical',
        name: 'Vertical',
        active: true,
        component: PageVertical,
      },
      {
        id: 'horizontal',
        name: 'Horizontal',
        active: false,
        component: PageHorizontal,
      },
      {
        id: 'scroll',
        name: 'Scroll',
        active: false,
        component: PageScroll,
      },
      {
        id: 'multiple',
        name: 'Multiple',
        active: false,
        component: PageMultiple,
      },
    ]

    const pageId = window.location.hash.slice(1) || 'vertical'

    this.state = {
      pages: setActivePageById(pageId, pages)
    }

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)

  }

  handleMenuItemClick({ event, item }) {

    this.setState({
      pages: this.state.pages.map(page => {

        return Object.assign({}, page, { active: page.id == item.id })

      })
    })

  }

  render() {

    const page = (
      this.state.pages.find(page => page.active) ||
      this.state.pages[0]
    )

    const { h1, div, br } = html

    return [
      div({ class: 'sidebar' },
        Menu.v({
          items: this.state.pages,
          onClick: this.handleMenuItemClick,
        })
      ),
      div({ class: B.classNames('content', {
        ['content__' + page.id]: page.active
      }) },
        h1({},
          page.name
        ),
        br(),
        page.component.v({ key: page.id })
      )
    ]

  }

}

module.exports = App


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

const { Component, html } = __webpack_require__(3)
const B = __webpack_require__(0)

class Menu extends Component {

  constructor(props, context) {

    super(props, context)

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(event) {

    if (this.props.onClick)
      this.props.onClick(event)

  }

  render() {

    const { ul, li, a } = html

    return (
      ul({ class: 'menu' },
        this.props.items.map(item => {
          return (
            li({
              key: item.id,
              class: B.classNames('menu__item', {
                'menu__item--active': item.active
              })
            },
              a({
                class: 'menu__link',
                href: '#' + item.id,
                onClick: () => this.handleClick({ event, item })
              },
                item.name
              )
            )
          )
        })
      )
    )

  }

}

module.exports = Menu


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { Component, html } = __webpack_require__(3)
const Preview = __webpack_require__(11)
const List = __webpack_require__(10)
const User = __webpack_require__(19)
const createSortable = __webpack_require__(20)

class PageVertical extends Component {

  constructor(props) {

    super(props)

    this.state = {
      users: User.getAll().slice(0, 10)
    }

  }

  afterMount() {

    this.sortable = createSortable({
      rootNode: this.refs.List.refs.list,
      align: 'vertical',
      isHandlerNode: domNode => domNode.textContent == '#',
      scrollNode: document.querySelector('.sort__wrapper'),
    })

    this.sortable.subscribe((memo) => {

      const { isNewPosition, draggablePosition, droppablePosition } = memo

      if (isNewPosition) {

        const newItems = B.move(
          this.state.users,
          draggablePosition,
          droppablePosition
        )

        this.setState({ users: newItems })

      }

    })

  }

  beforeUnmount() {

    this.sortable.unsubscribe()

  }

  render() {

    return (
      List.v({
        items: this.state.users,
        ref: 'List',
        align: 'vertical',
      })
    )

  }

}

module.exports = PageVertical


/***/ }),
/* 89 */
/***/ (function(module, exports) {

const rules = [
  {
    check: config => !(config.rootNode instanceof HTMLElement),
    message: 'config.rootNode is not a HTMLElement'
  }
]

const findConfigErrors = config => {

  return rules.reduce((messages, rule) => {

    if (rule.check(config)) return [ ...messages, rule.message ]

    return messages

  }, [])

}

module.exports = findConfigErrors


/***/ }),
/* 90 */
/***/ (function(module, exports) {

class Stream {

  constructor(...sources) {

    const grouppedSources = sources.reduce((memo, source) => {

      const key = this.isDynamicSource(source)
        ? 'dynamicSources'
        : 'staticSources'

      return Object.assign({}, memo, { [key]: [ ...memo[key], source ] })

    }, { staticSources: [], dynamicSources: [] })

    this.staticSources = grouppedSources.staticSources
    this.dynamicSources = grouppedSources.dynamicSources

    this.modifiers = []
    this.value = null

  }

  subscribe(onChange) {

    this.onChange = onChange

    this.staticSources.forEach(source => {

      source.listen()
      source.addSubscriber(this)

    })

  }

  isDynamicSource(source) {

    return 'addWhen' in source || 'removeWhen' in source

  }

  unsubscribe() {

    const sources = [ ...this.staticSources, ...this.dynamicSources ]

    sources.forEach(source => source.mute())

  }

  notify(value) {

    const newValue = this.modifiers.reduce((value, modifier) => {

      if (modifier.type == 'reduce') {

        return modifier.modify(this.value, value)

      }

      return value

    }, value)

    this.value = newValue

    this.onChange(newValue)

    this.manageDynamicSources(newValue)

  }

  manageDynamicSources(value) {

    this.dynamicSources.forEach(dynamicSource => {

      if (!dynamicSource.active && dynamicSource.addWhen(value)) {

        dynamicSource.listen()
        dynamicSource.addSubscriber(this)

      }

      if (dynamicSource.active && dynamicSource.removeWhen(value)) {

        dynamicSource.mute()
        dynamicSource.removeSubscriber(this)

      }

    })

  }

  reduce(callback, initialValue) {

    this.value = initialValue

    this.modifiers = [
      ...this.modifiers,
      { type: 'reduce', modify: callback }
    ]

    return this

  }

}

module.exports = Stream


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_START, DRAG_STOP, DRAG_MOVE } = __webpack_require__(2)
const move = __webpack_require__(92)

const moveGhostNode = (memo) => {

  const {
    config,
    dragType,
    ghostNode,
    draggableNode,
    ghostCoords,
    ghostRootNode,
  } = memo

  switch (dragType) {

    case DRAG_START: {

      draggableNode.classList.add(config.draggableClassName)

      if (config.cloneRootNode) {

        config.ghostWrapperNode.appendChild(ghostRootNode)

        ghostRootNode.appendChild(ghostNode)

      } else {

        config.ghostWrapperNode.appendChild(ghostNode)

      }

      move(ghostNode, ghostCoords.x, ghostCoords.y)

      break
    }

    case DRAG_MOVE: {

      move(ghostNode, ghostCoords.x, ghostCoords.y)

      break
    }

    case DRAG_STOP: {

      draggableNode.classList.remove(config.draggableClassName)

      const removeNode = config.cloneRootNode ? ghostRootNode : ghostNode

      removeNode.parentNode.removeChild(removeNode)

      break
    }

  }

}

module.exports = moveGhostNode


/***/ }),
/* 92 */
/***/ (function(module, exports) {

const move = (domNode, left, top) => {

  domNode.style.left = left + 'px'
  domNode.style.top = top + 'px'

}

module.exports = move


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

const EventSource = __webpack_require__(4)

class MousedownSource extends EventSource {

  constructor(domNode, eventType = 'mousedown') {

    super(domNode, eventType)

  }

}

module.exports = MousedownSource


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

const EventSource = __webpack_require__(4)

class MousemoveSource extends EventSource {

  constructor(domNode, eventType = 'mousemove') {

    super(domNode, eventType)

  }

  addWhen(memo) {

    return memo.event.type == 'mousedown'

  }

  removeWhen(memo) {

    return memo.event.type == 'mouseup'

  }

}

module.exports = MousemoveSource


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

const EventSource = __webpack_require__(4)

class MouseupSource extends EventSource {

  constructor(domNode, eventType = 'mouseup') {

    super(domNode, eventType)

  }

  addWhen(memo) {

    return memo.event.type == 'mousedown'

  }

  removeWhen(memo) {

    return memo.event.type == 'mouseup'

  }

}

module.exports = MouseupSource


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

const EventSource = __webpack_require__(4)

class TouchstartSource extends EventSource {

  constructor(domNode, eventType = 'touchstart') {

    super(domNode, eventType)

  }

}

module.exports = TouchstartSource


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const EventSource = __webpack_require__(4)

class TouchmoveSource extends EventSource {

  constructor(domNode, eventType = 'touchmove', options = { passive: false }) {

    super(domNode, eventType, options)

  }


  addWhen(memo) {

    return memo.event.type == 'touchstart'

  }

  removeWhen(memo) {

    return B.include(['touchend', 'touchcancel'], memo.event.type)

  }

}

module.exports = TouchmoveSource


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const EventSource = __webpack_require__(4)

class TouchendSource extends EventSource {

  constructor(domNode, eventType = 'touchend') {

    super(domNode, eventType)

  }


  addWhen(memo) {

    return memo.event.type == 'touchstart'

  }

  removeWhen(memo) {

    return B.include(['touchend', 'touchcancel'], memo.event.type)

  }

}

module.exports = TouchendSource


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const EventSource = __webpack_require__(4)

class TouchcancelSource extends EventSource {

  constructor(domNode, eventType = 'touchcancel') {

    super(domNode, eventType)

  }


  addWhen(memo) {

    return memo.event.type == 'touchstart'

  }

  removeWhen(memo) {

    return B.include(['touchend', 'touchcancel'], memo.event.type)

  }

}

module.exports = TouchcancelSource


/***/ }),
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports) {

const scrollContainer = ({ containerNode, intervalId, scrollDirection }) => {

  const containerBox = containerNode.getBoundingClientRect()

  switch (scrollDirection) {

    case 'top': {

      if (containerNode.scrollTop == 0) {

        clearInterval(intervalId)

        return null

      }

      containerNode.scrollTop = containerNode.scrollTop - 1

      break
    }

    case 'bottom': {

      if (containerNode.scrollTop == containerBox.height) {

        clearInterval(intervalId)

        return null

      }

      containerNode.scrollTop = containerNode.scrollTop + 1

      break
    }

    case 'left': {

      if (containerNode.scrollLeft == 0) {

        clearInterval(intervalId)

        return null

      }

      containerNode.scrollLeft = containerNode.scrollLeft - 1

      break
    }

    case 'right': {

      if (containerNode.scrollLeft == containerBox.width) {

        clearInterval(intervalId)

        return null

      }

      containerNode.scrollLeft = containerNode.scrollLeft + 1

      break
    }

    default: {

      throw new Error('Unrecognized scrollDirection: ' + scrollDirection)

    }

  }

  return null

}

module.exports = scrollContainer


/***/ }),
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */
/***/ (function(module, exports) {

const getAlign = (type, shiftX, shiftY, width, height) => {

  if (type == 'vertical') {

    return (shiftY < height / 2) ? 'before' : 'after'

  } else {

    return (shiftX < width / 2) ? 'before' : 'after'

  }

}

module.exports = getAlign


/***/ }),
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */
/***/ (function(module, exports) {

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


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { Component, html } = __webpack_require__(3)
const Preview = __webpack_require__(11)
const List = __webpack_require__(10)
const User = __webpack_require__(19)
const createSortable = __webpack_require__(20)

class PageHorizontal extends Component {

  constructor(props) {

    super(props)

    this.state = {
      users: User.getAll().slice(0, 10)
    }

  }

  afterMount() {

    this.sortable = createSortable({
      rootNode: this.refs.List.refs.list,
      align: this.props.align,
      isHandlerNode: domNode => domNode.textContent == '#',
      scrollNode: document.querySelector('.sort__wrapper'),
    })

    this.sortable.subscribe((memo) => {

      const { isNewPosition, draggablePosition, droppablePosition } = memo

      if (isNewPosition) {

        const newItems = B.move(
          this.state.users,
          draggablePosition,
          droppablePosition
        )

        this.setState({ users: newItems })

      }

    })

  }

  beforeUnmount() {

    this.sortable.unsubscribe()

  }

  render() {

    return (
      List.v({
        ref: 'List',
        items: this.state.users,
        align: 'horizontal',
      })
    )

  }

}

module.exports = PageHorizontal


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

const { Component, html } = __webpack_require__(3)
const B = __webpack_require__(0)
const Preview = __webpack_require__(11)
const List = __webpack_require__(10)
const User = __webpack_require__(19)
const createSortable = __webpack_require__(20)

class PageScroll extends Component {

  constructor(props) {

    super(props)

    this.state = {
      users: User.getAll()
    }

  }

  afterMount() {

    this.sortable = createSortable({
      rootNode: this.refs.List.refs.list,
      align: this.props.align,
      isHandlerNode: domNode => domNode.textContent == '#',
      scrollNode: document.querySelector('.sort__wrapper'),
    })

    this.sortable.subscribe((memo) => {

      const { isNewPosition, draggablePosition, droppablePosition } = memo

      if (isNewPosition) {

        const newItems = B.move(
          this.state.users,
          draggablePosition,
          droppablePosition
        )

        this.setState({ users: newItems })

      }

    })

  }

  beforeUnmount() {

    this.sortable.unsubscribe()

  }

  render() {

    const { div } = html

    return [
      div({ class: 'horizontal-dots' }),
      div({ class: 'sort__wrapper' },
        List.v({
          ref: 'List',
          align: 'horizontal',
          items: this.state.users,
        }),
      ),
      div({ class: 'vertical-dots' })
    ]


  }

}

module.exports = PageScroll


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { Component, html } = __webpack_require__(3)
const Preview = __webpack_require__(11)
const List = __webpack_require__(10)
const User = __webpack_require__(19)
const createSortable = __webpack_require__(20)

class PageMultiple extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      users_1: User.getAll().slice(0, 0),
      users_2: User.getAll().slice(1, 5),
      users_3: User.getAll().slice(10, 20),
    }

  }

  afterMount() {

    const numbers = B.times(3 + 1).slice(1)

    this.sortables = numbers.map(number => {

      const depends = numbers
        .filter(_number => _number != number)
        .map(number => {

          const name = 'users_' + number
          const node = this.refs['List' + number].refs.list

          return { name, node }

        })

      const sortableConfig = {
        name: 'users_' + number,
        depends,
        rootNode: this.refs['List' + number].refs.list,
        align: 'vertical',
        isHandlerNode: domNode => domNode.textContent == '#',
        scrollNode: document.querySelector('.sort__wrapper'),
      }

      const sortable = createSortable(sortableConfig)

      sortable.subscribe((memo) => {

        const {
          config,
          isNewPosition,
          draggablePosition,
          droppablePosition,
          droppableGroup,
          rootGroup,
        } = memo

        if (!isNewPosition) return null

        const fromGroupName = rootGroup.name
        const toGroupName = droppableGroup.name

        if (droppableGroup.name == rootGroup.name) {

          const newUsers = B.move(
            this.state[droppableGroup.name],
            draggablePosition,
            droppablePosition
          )

          this.setState({ [droppableGroup.name]: newUsers })

        } else {

          const user = this.state[fromGroupName][draggablePosition]

          const toUsers = B.insert(
            this.state[toGroupName],
            droppablePosition,
            user
          )

          const fromUsers = this.state[fromGroupName]
            .filter((user, index) => (index != draggablePosition))

          const newUsers = {
            [fromGroupName]: fromUsers,
            [toGroupName]: toUsers
          }

          this.setState(newUsers)

        }

      })

      return sortable

    })

  }

  beforeUnmount() {

    this.sortables.forEach(sortable => sortable.unsubscribe())

  }

  render() {

    const { div } = html

    return [
      div({ class: 'float-left' },
        List.v({
          ref: 'List1',
          align: 'vertical',
          items: this.state.users_1
        }),
      ),
      div({ class: 'float-left' },
        List.v({
          ref: 'List2',
          align: 'vertical',
          items: this.state.users_2
        })
      ),
      div({ class: 'float-left' },
        List.v({
          ref: 'List3',
          align: 'vertical',
          items: this.state.users_3
        })
      ),
      div({ class: 'float-clear' })
    ]

  }

}

module.exports = PageMultiple


/***/ }),
/* 133 */,
/* 134 */,
/* 135 */
/***/ (function(module, exports) {

const createGroups = (memo) => {

  const { config } = memo

  const groups = [
    ...config.depends,
    {
      name: config.name,
      node: config.rootNode,
    }
  ]

  return Object.assign({}, memo, { groups })

}

module.exports = createGroups


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE, DRAG_STOP } = __webpack_require__(2)
const scrollContainer = __webpack_require__(102)

const createScrollActions = (memo) => {

  const {
    config,
    isNeedScroll,
    scrollDirections,
    prevScrollDirections,
    dragType,
    scrollInterval
  } = memo

  const scrollActions = memo.scrollActions || []

  if (dragType == DRAG_STOP) {

    scrollActions.forEach(scrollAction => {

      clearInterval(scrollAction.intervalId)

    })

  }

  if (dragType != DRAG_MOVE || !isNeedScroll) return memo

  const addScrollDirections =
    scrollDirections.filter(scrollDirection => {

      return !B.include(prevScrollDirections, scrollDirection)

    })

  const removeScrollDirections =
    prevScrollDirections.filter(prevScrollDirection => {

      return !B.include(scrollDirections, prevScrollDirection)

    })

  const addedScrollActions = addScrollDirections.map(addScrollDirection => {

    const intervalId = setInterval(() => {

      scrollContainer({
        containerNode: config.scrollNode,
        intervalId,
        scrollDirection: addScrollDirection
      })

    }, config.scrollSpeed)

    return {
      direction: addScrollDirection,
      intervalId
    }

  })

  const removedScrollActions = scrollActions.filter(scrollAction => {

    const isNeedSave = !B.include(
      removeScrollDirections,
      scrollAction.direction
    )

    if (!isNeedSave) {

      clearInterval(scrollAction.intervalId)

    }

    return isNeedSave

  })

  const newScrollActions = [ ...addedScrollActions, ...removedScrollActions ]

  return Object.assign({}, memo, { scrollActions: newScrollActions })

}

module.exports = createScrollActions


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_MOVE } = __webpack_require__(2)

const inRange = (number, range) => (number >= range.from && number <= range.to)

const createScrollDirections = (memo) => {

  const { isNeedScroll, config, universalEvent, dragType } = memo

  if (!isNeedScroll || dragType != DRAG_MOVE) return memo

  const scrollNodeBox = config.scrollNode.getBoundingClientRect()

  const body = document.documentElement

  const scrollTop = window.pageYOffset || body.scrollTop
  const scrollLeft = window.pageXOffset || body.scrollLeft

  const scrollFrameBox = {
    top: Math.max(
      scrollNodeBox.top + scrollTop,
      scrollTop
    ),
    bottom: Math.min(
      scrollNodeBox.bottom + scrollTop,
      window.innerHeight + scrollTop
    ),
    left: Math.max(
      scrollNodeBox.left + scrollLeft,
      scrollLeft
    ),
    right: Math.min(
      scrollNodeBox.right + scrollLeft,
      window.innerWidth + scrollLeft
    ),
  }

  const scrollHeight = scrollFrameBox.bottom - scrollFrameBox.top
  const scrollWidth = scrollFrameBox.right - scrollFrameBox.left

  const scrollFillHeight = scrollHeight / 2 / 100 * config.scrollFill
  const scrollFillWidth = scrollWidth / 2 / 100 * config.scrollFill

  const grouppedScrollRanges = {
    horizontal: [
      {
        name: 'left',
        from: -Infinity,
        to: scrollFrameBox.left + scrollFillWidth,
      },
      {
        name: 'right',
        from: scrollFrameBox.right - scrollFillWidth,
        to: Infinity,
      }
    ],
    vertical: [
      {
        name: 'top',
        from: -Infinity,
        to: scrollFrameBox.top + scrollFillHeight,
      },
      {
        name: 'bottom',
        from: scrollFrameBox.bottom - scrollFillHeight,
        to: Infinity,
      },
    ]
  }

  const isHorizontalScrollPresent = (
    config.scrollNode.scrollWidth != config.scrollNode.clientWidth
  )

  const isVertivalScrollPresent = (
    config.scrollNode.scrollHeight != config.scrollNode.clientHeight
  )

  const horizontalScrollRange = isHorizontalScrollPresent
    ? grouppedScrollRanges.horizontal
      .find(range => inRange(event.pageX, range))
    : null

  const verticalScrollRange = isVertivalScrollPresent
    ? grouppedScrollRanges.vertical
      .find(range => inRange(event.pageY, range))
    : null

  const scrollDirections = [ horizontalScrollRange, verticalScrollRange ]
    .filter(range => range)
    .map(range => range.name)

  return Object.assign({}, memo, { scrollDirections })

}

module.exports = createScrollDirections


/***/ }),
/* 138 */
/***/ (function(module, exports) {

const createPrevScrollDirections = (memo) => {

  const { isNeedScroll, scrollDirections } = memo

  if (!isNeedScroll) return memo

  return Object.assign({}, memo, {
    prevScrollDirections: scrollDirections || []
  })

}

module.exports = createPrevScrollDirections


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_MOVE, DRAG_STOP } = __webpack_require__(2)
const B = __webpack_require__(0)

const isNeedScroll = (memo) => {

  const { config, universalEvent, dragType, handlerNode } = memo

  const isNeedScroll = (
    config.scrollNode &&
    handlerNode
  )

  return Object.assign({}, memo, { isNeedScroll })

}

module.exports = isNeedScroll


/***/ }),
/* 140 */
/***/ (function(module, exports) {

const createIsNewPosition = (memo) => {

  const {
    isDroppableNew,
    draggablePosition,
    droppablePosition,
    droppableGroup,
    rootGroup,
    config
  } = memo

  const isNewPosition = (
    isDroppableNew && (
      droppableGroup.name == rootGroup.name &&
      droppableGroup &&
      draggablePosition != droppablePosition
      ||
      droppableGroup.name != rootGroup.name &&
      droppableGroup
    )
  )

  // console.log(isNewPosition)

  return Object.assign({}, memo, { isNewPosition })

}

module.exports = createIsNewPosition


/***/ }),
/* 141 */
/***/ (function(module, exports) {

const createDroppablePosition = (memo) => {

  const {
    config,
    dragType,
    droppableNode,
    droppableAlign,
    draggableNode,
    isDroppableNew,
    draggablePosition,
    droppableGroup,
    rootGroup
  } = memo

  if (!isDroppableNew) return memo

  const droppableRootChilds = Array.from(droppableGroup.node.childNodes)

  const droppableIndex = droppableRootChilds
    .findIndex(domNode => domNode.isSameNode(droppableNode))

  const droppablePosition = (() => {

    if (config.isEmptyNode(droppableNode)) return 0

    const groupIndex = droppableGroup.name == rootGroup.name ? 0 : 1

    return (
      droppableAlign == 'before'
        ? (
            droppableIndex < draggablePosition
              ? droppableIndex
              : droppableIndex - 1
          )
        : (
            droppableIndex < draggablePosition
              ? droppableIndex + 1
              : droppableIndex
          )
    ) + groupIndex

  })()

  return Object.assign({}, memo, { droppablePosition })

}

module.exports = createDroppablePosition


/***/ }),
/* 142 */
/***/ (function(module, exports) {

const createDraggablePosition = (memo) => {

  const { config, draggableNode, isDroppableNew, rootGroup } = memo

  if (!isDroppableNew) return memo

  const sortableDomNodes = Array.from(rootGroup.node.childNodes)

  const draggablePosition = sortableDomNodes
    .findIndex(domNode => domNode.isSameNode(draggableNode))

  return Object.assign({}, memo, { draggablePosition })

}

module.exports = createDraggablePosition


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_MOVE } = __webpack_require__(2)

const checkIsDroppableNew = (memo) => {

  const {
    dragType,
    droppableNode,
    prevDroppableNode,
    droppableAlign,
    prevDroppableAlign,
    draggableNode,
  } = memo

  const droppableIsDraggableNode = (
    droppableNode &&
    droppableNode.isSameNode(draggableNode)
  )

  if (!droppableNode || droppableIsDraggableNode || dragType != DRAG_MOVE) {

    return false

  }

  return (
    !prevDroppableNode ||
    !droppableNode.isSameNode(prevDroppableNode) ||
    droppableNode.isSameNode(prevDroppableNode) &&
    droppableAlign != prevDroppableAlign
  )

}

const createIsDroppableNew = (memo) => {

  const isDroppableNew = checkIsDroppableNew(memo)

  return Object.assign({}, memo, { isDroppableNew })

}

module.exports = createIsDroppableNew


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE } = __webpack_require__(2)
const getShift = __webpack_require__(32)
const getAlign = __webpack_require__(111)

const createDroppableAlign = (memo) => {

  const { dragType, droppableNode, config, universalEvent } = memo

  if (dragType != DRAG_MOVE || !droppableNode) return memo

  const droppableShift = getShift(droppableNode, universalEvent)

  const droppableBoundings = droppableNode.getBoundingClientRect()

  const droppableAlign = getAlign(
    config.align,
    droppableShift.x,
    droppableShift.y,
    droppableBoundings.width,
    droppableBoundings.height
  )

  return Object.assign({}, memo, { droppableAlign })

}

module.exports = createDroppableAlign


/***/ }),
/* 145 */
/***/ (function(module, exports) {

const createPrevDroppableAlign = (memo) => {

  const { droppableAlign } = memo

  if (!droppableAlign) return memo

  return Object.assign({}, memo, { prevDroppableAlign: droppableAlign })

}

module.exports = createPrevDroppableAlign


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE } = __webpack_require__(2)
const findParentNodes = __webpack_require__(5)

const createDroppableNode = (memo) => {

  const { config, dragType, droppableTargetParentNodes, droppableGroup } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableNode = droppableTargetParentNodes.find(domNode => {

    return config.isDroppableNode(domNode, droppableGroup.node)

  })

  return Object.assign({}, memo, { droppableNode })

}

module.exports = createDroppableNode


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE } = __webpack_require__(2)
const findParentNodes = __webpack_require__(5)

const createDroppableGroup = (memo) => {

  const { config, dragType, droppableTargetParentNodes, groups } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableGroupNode = B.last(droppableTargetParentNodes)

  const droppableGroup = groups.find(group => {

    return group.node.isSameNode(droppableGroupNode)

  })

  return Object.assign({}, memo, { droppableGroup: droppableGroup })

}

module.exports = createDroppableGroup


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE } = __webpack_require__(2)
const findParentNodes = __webpack_require__(5)

const createDroppableTargetParentNodes = (memo) => {

  const { dragType, droppableTargetNode, groups } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableTargetParentNodes =
    findParentNodes(droppableTargetNode, domNode => (
      groups.find(group => group.node.isSameNode(domNode))
    ))

  return Object.assign({}, memo, { droppableTargetParentNodes })

}

module.exports = createDroppableTargetParentNodes


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_MOVE } = __webpack_require__(2)

const createDroppableTargetNode = (memo) => {

  const { dragType, universalEvent } = memo

  if (dragType != DRAG_MOVE) return memo

  const droppableTargetNode =
    document.elementFromPoint(
      universalEvent.clientX,
      universalEvent.clientY
    )

  return Object.assign({}, memo, { droppableTargetNode })

}

module.exports = createDroppableTargetNode


/***/ }),
/* 150 */
/***/ (function(module, exports) {

const createPrevDroppableNode = (memo) => {

  const { droppableNode } = memo

  if (!droppableNode) return memo

  return Object.assign({}, memo, { prevDroppableNode: droppableNode })
  
}

module.exports = createPrevDroppableNode


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_START, DRAG_MOVE, DRAG_STOP } = __webpack_require__(2)

const createGhostCoords = (memo) => {

  const {
    startUniversalEvent,
    universalEvent,
    draggableShift,
    dragType
  } = memo

  switch (dragType) {

    case DRAG_START: {

      const x = startUniversalEvent.pageX - draggableShift.x
      const y = startUniversalEvent.pageY - draggableShift.y

      return Object.assign({}, memo, { ghostCoords: { x, y } })

    }

    case DRAG_MOVE: {

      const x = universalEvent.pageX - draggableShift.x
      const y = universalEvent.pageY - draggableShift.y

      return Object.assign({}, memo, { ghostCoords: { x, y } })

    }

    default: {

      return memo

    }

  }

}

module.exports = createGhostCoords


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_START } = __webpack_require__(2)
const getShift = __webpack_require__(32)

const createDraggableShift = (memo) => {

  const { draggableNode, startUniversalEvent, config, dragType } = memo

  if (dragType != DRAG_START) return memo

  const draggableShift = getShift(draggableNode, startUniversalEvent)

  return Object.assign({}, memo, { draggableShift })

}

module.exports = createDraggableShift


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_START } = __webpack_require__(2)

const createGhostRootNode = (memo) => {

  const { config, rootGroup } = memo

  if (!config.cloneRootNode || memo.dragType != DRAG_START) return memo

  const ghostRootNode = rootGroup.node.cloneNode()

  return Object.assign({}, memo, { ghostRootNode })

}

module.exports = createGhostRootNode


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

const { DRAG_START } = __webpack_require__(2)

const createGhostNode = (memo) => {

  if (memo.dragType != DRAG_START) return memo

  const { draggableNode, config } = memo

  const ghostNode = draggableNode.cloneNode(true)

  const boundings = draggableNode.getBoundingClientRect()

  ghostNode.style.position = 'absolute'
  ghostNode.style.zIndex = 1000
  ghostNode.style.top = '0px'
  ghostNode.style.left = '0px'
  ghostNode.style.willChange = 'all'
  ghostNode.style.pointerEvents = 'none'
  ghostNode.classList.add(config.ghostClassName)

  ghostNode.ondragstart = () => false

  return Object.assign({}, memo, { ghostNode })

}

module.exports = createGhostNode


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_START, DRAG_STOP, DRAG_MOVE } = __webpack_require__(2)

const createDragType = (memo) => {

  const {
    universalEvent,
    handlerNode,
    draggableNode,
    dragStart,
    prevDragStart
  } = memo

  switch (universalEvent.type) {

    case 'start': {

      return Object.assign({}, memo, { dragType: null })

    }

    case 'move': {

      if (!dragStart || !handlerNode || !draggableNode) {

        return Object.assign({}, memo, { dragType: null })

      } else

      if (dragStart && !prevDragStart) {

        return Object.assign({}, memo, { dragType: DRAG_START })

      } else {

        return Object.assign({}, memo, { dragType: DRAG_MOVE })

      }

    }

    case 'stop': {

      if (!B.include([DRAG_MOVE, DRAG_STOP], memo.dragType)) return memo

      return Object.assign({}, memo, { dragType: DRAG_STOP })

    }

    default: {

      throw new Error('Unknow universalEvent.type: ' + universalEvent.type)

    }

  }

}

module.exports = createDragType


/***/ }),
/* 156 */
/***/ (function(module, exports) {

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


/***/ }),
/* 157 */
/***/ (function(module, exports) {

const createPrevDragStart = (memo) => {

  const { dragStart } = memo

  return Object.assign({}, memo, { prevDragStart: dragStart })

}

module.exports = createPrevDragStart


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const findParentNodes = __webpack_require__(5)

const createHandlerNode = (memo) => {

  const { universalEvent, config } = memo

  if (universalEvent.type != 'start') return memo

  const handlerNode = B.last(
    findParentNodes(universalEvent.target, config.isHandlerNode)
  )

  return Object.assign({}, memo, { handlerNode })

}

module.exports = createHandlerNode


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const findParentNodes = __webpack_require__(5)

const createDraggableNode = (memo) => {

  const {
    universalEvent,
    config,
    isNewPosition,
    rootGroup,
    prevRootGroup,
    droppablePosition
  } = memo

  // see here!!!

  if (isNewPosition && prevRootGroup.name != rootGroup.name) {

    const draggableNode = rootGroup.node.childNodes[droppablePosition]

    return Object.assign({}, memo, { draggableNode })

  }

  if (universalEvent.type != 'start') return memo

  const draggableNode = B.last(
    findParentNodes(universalEvent.target, config.isDraggableNode)
  )

  return Object.assign({}, memo, { draggableNode })

}

module.exports = createDraggableNode


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE, DRAG_STOP } = __webpack_require__(2)

const createRootGroup = (memo) => {

  const { dragType, isDroppableNew, droppableGroup, config } = memo

  if (dragType == DRAG_STOP) {

    return Object.assign({}, memo, {
      rootGroup: { name: config.name, node: config.rootNode }
    })

  }

  if (dragType != DRAG_MOVE || !isDroppableNew ) return memo

  const rootGroup = droppableGroup

  return Object.assign({}, memo, { rootGroup })

}

module.exports = createRootGroup


/***/ }),
/* 161 */
/***/ (function(module, exports) {

const createStartUniversalEvent = (memo) => {

  const { universalEvent } = memo

  if (universalEvent.type != 'start') return memo

  return Object.assign({}, memo, { startUniversalEvent: universalEvent })

}

module.exports = createStartUniversalEvent


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

const getUniversalEventType = __webpack_require__(129)

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


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

const B = __webpack_require__(0)
const { DRAG_MOVE } = __webpack_require__(2)

const createRootGroup = (memo) => {

  const { config } = memo

  const rootGroup = { name: config.name, node: config.rootNode }

  return Object.assign({}, memo, { rootGroup })

}

module.exports = createRootGroup


/***/ }),
/* 164 */
/***/ (function(module, exports) {

const createPrevRootGroup = (memo) => {

  const { rootGroup } = memo

  return Object.assign({}, memo, { prevRootGroup: rootGroup })

}

module.exports = createPrevRootGroup


/***/ })
/******/ ]);
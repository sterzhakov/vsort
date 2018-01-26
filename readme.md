# Vsort

![vqua](https://raw.githubusercontent.com/sterzhakov/vsort/master/logo.jpg)

Sortable lists library which support all virtual dom libraries like React, Angular, Vue and others.

It simply tells you the new position of the element.

Work with touch events too ;)

Support last chrome, safari, opera, firefox, ie.

[Demo here ](https://sterzhakov.github.io/vsort/index.html)

## How to install?
```bash
npm i vsort
```

## Example:

```javascript

  const config = {
    rootNode: document.querySelector('ul'),
  }

  const vsort = createSortable(config)

  vsort.subscribe((memo) => {

    const { isNewPosition, draggablePosition, droppablePosition } = memo

    if (!isNewPosition) return null

    console.log(
      isNewPosition,
      draggablePosition,
      droppablePosition
    )

  })
```

More:

[Horizontal](https://github.com/sterzhakov/vsort/tree/master/demo/build/components/PageHorizontal.js)

[Vertical](https://github.com/sterzhakov/vsort/tree/master/demo/build/components/PageVertical.js)

[Multiple](https://github.com/sterzhakov/vsort/tree/master/demo/build/components/PageMultiple.js)

[Scroll](https://github.com/sterzhakov/vsort/tree/master/demo/build/components/PageScroll.js)

## Vsort [Stream]

#### createSortable [Function]

arguments:

- config [object]

return:

- Vsort instance

#### vsort.subscribe(subscribeCallback [Function])

call:

- subscribeCallback on every event change

#### subscribeCallback(memo [object])

arguments:

- memo [Object]

#### vsort.unsubscribe [Function]
unsubscribes from sort events


## Config [Object]

#### name [String]
default: 'root'

Name of root group


#### rootNode [HTMLElement]
default: null

Node of root group

#### depends [Array]
default: []

Array of dependent groups.

Example:
```javscript
[{ name: 'example', node: HTMLElement }]

```

#### align [String]
default: 'vertical'

possible values: 'vertical' | 'horizontal'

Sorting direction


#### dragStartDistance [Number]
default: 10

The distance in pixels after which the drag will begin

#### isDraggableNode [Function]
default:
```javascript
domNode => domNode.tagName == 'LI'
```

Detect draggable node

#### isHandlerNode [Function]
default:
```javascript
domNode => domNode.tagName == 'LI'
```
Detect handler node

#### isDroppableNode [Function]
default:
```javascript
(domNode, rootNode) => (
  domNode &&
  domNode.parentNode &&
  domNode.parentNode.isSameNode(rootNode)
)
```

Detect droppable node

#### isEmptyNode [Function]
default:
```javascript
domNode => domNode.dataset.vsortEmpty == 'true'
```

Detect an empty node that says that the list is empty

#### ghostClassName [String]
default: 'vsort__ghost'

Name of ghost node css class

#### draggableClassName [String]
default: 'vsort__draggable'

Name of draggable node css class

#### cloneRootNode [Boolean]
default: false

Is necessary to clone the parent at creation of ghost node?

#### scrollNode [HTMLElement]
default: null

Enables scrolling when the cursor moves beyond the bounds of this node when the ghost node moves


#### scrollFill [Number]
default: 50

possible values: 0 - 100

The size of the border frame as a percentage of free space, when scrolling on it, scrolling occurs.


#### scrollSpeed [Number]
default: 5

Scroll speed

#### staticReducers [Array]
default: []

Array of functions that update memo once after create vsort instance

#### dynamicReducers [Array]
default: []

Array of functions that update memo on every event change

#### storageWrapperNode [HTMLElement]
default: document.body

Parent node for store ghostNode and draggableCloneNode


## Memo [Object]

#### config [object]
Configuration object

#### draggableNode [HTMLElement]
Draggable node

#### draggablePosition [Number]
Draggable position

#### draggableShift [Object]
Shift from element position to cursor position

#### dragStart [Boolean]
The status of the start of the drag, is triggered after the config.dragDistance is traversed

#### dragType [String]
Drag status, can be:

- DRAG_START
- DRAG_MOVE
- DRAG_STOP

#### droppableAlign [String]
Position memo.ghostNode relative to the memo.droppableNode

#### droppableGroup [Object]
example:

```javascript
{
  name: 'example',
  node: anotherUlDomNode,
}
```

#### droppableNode [HTMLElement]
The node above which the memo.ghostNode is located

#### droppablePosition [Number]
Position of memo.droppableNode on the whole list

#### droppableTargetNode [HTMLElement]
Node under cursor

#### droppableTargetParentNodes [Array]
Nodes from memo.droppableTargetNode to node where config.isDroppableNode is true.

#### ghostCoords [Object]
Ghost coords with cursor shift

#### ghostNode [HTMLElement]
Ghost node

#### ghostRootNode [HTMLElement]
Cloned config.rootNode

#### handlerNode [HTMLElement]
Handler node

#### isDroppableNew [Boolean]
Is droppable new flag

#### isNeedScroll [Boolean]
Is need scroll flag

#### isNewPosition [Boolean]
Is new position flag

#### rootGroup [Object]
Root group

Example:
```javascript
[{ name: 'example', node: HTMLElement }]
```
The name is taken from config.name
The node is taken from config.rootNode

#### scrollActions [Array]
Scroll actions

Example:
```javascript
[
  { direction: 'top', intervalId: 10 }
]
```

#### scrollDirections [Array]
possible values: 'top', 'left', 'right', 'bottom'

Scroll directions

#### universalEvent [Object]
Current normalized event

#### startUniversalEvent [Object]
Normalized event from event.(mousedown|touchstart)

#### groups [Array]
Example:
```javascript
[
  { name: 'users', node: usersDomNode }
]
```

#### storageDraggableNode [HTMLElement]
Node where stored draggable node

#### storageGhostNode [HTMLElement]
Node where stored draggable node

#### storageNode [HTMLElement]
Stored node

#### Also previous versions for:

prevDragStart,
prevDroppableAlign,
prevDroppableNode
prevRootGroup,
prevScrollDirections


## Config [Object]

#### name [String]
default: 'root'

Name of root group


#### rootNode [HTMLElement]
default: null

Node of root group

#### depends [Array]
default: []

Array of dependent groups.

Example:
```javscript
[{ name: 'example', node: HTMLElement }]

```

#### align [String]
default: 'vertical'

possible values: 'vertical' | 'horizontal'

Sorting direction


#### dragStartDistance [Number]
default: 10

The distance in pixels after which the drag will begin

#### isDraggableNode [Function]
default:
```javascript
domNode => domNode.tagName == 'LI'
```

Detect draggable node

#### isHandlerNode [Function]
default:
```javascript
domNode => domNode.tagName == 'LI'
```
Detect handler node

#### isDroppableNode [Function]
default:
```javascript
(domNode, rootNode) => (
  domNode &&
  domNode.parentNode &&
  domNode.parentNode.isSameNode(rootNode)
)
```

Detect droppable node

#### isEmptyNode [Function]
default:
```javascript
domNode => domNode.dataset.vsortEmpty == 'true'
```

Detect an empty node that says that the list is empty

#### ghostClassName [String]
default: 'vsort__ghost'

Name of ghost node css class

#### draggableClassName [String]
default: 'vsort__draggable'

Name of draggable node css class

#### cloneRootNode [Boolean]
default: false

Is necessary to clone the parent at creation of ghost node?

#### scrollNode [HTMLElement]
default: null

Enables scrolling when the cursor moves beyond the bounds of this node when the ghost node moves


#### scrollFill [Number]
default: 50

possible values: 0 - 100

The size of the border frame as a percentage of free space, when scrolling on it, scrolling occurs.


#### scrollSpeed [Number]
default: 5

Scroll speed

#### staticReducers [Array]
default: []

Array of functions that update memo once after create vsort instance

#### dynamicReducers [Array]
default: []

Array of functions that update memo on every event change

#### storageWrapperNode [HTMLElement]
default: document.body

Parent node for store ghostNode and draggableCloneNode

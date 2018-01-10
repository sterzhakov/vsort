const { DRAG_START } = require('../constants')

const createGhostNode = (memo) => {

  switch (memo.dragType) {

    case DRAG_START: {

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

    default: {

      return memo

    }

  }


}

module.exports = createGhostNode

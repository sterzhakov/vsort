const createStorageDraggableNode = (memo) => {

  const storageDraggableNode = document.createElement('div')
  storageDraggableNode.className = 'vsort__storage__draggableNode'

  return Object.assign({}, memo, { storageDraggableNode })

}

module.exports = createStorageDraggableNode

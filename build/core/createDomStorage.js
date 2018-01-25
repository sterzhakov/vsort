const createDomStorage = (memo) => {

  const { config, storageNode, storageGhostNode, storageDraggableNode } = memo

  config.storageWrapperNode.appendChild(storageNode)
  storageNode.appendChild(storageGhostNode)
  storageNode.appendChild(storageDraggableNode)

}

module.exports = createDomStorage

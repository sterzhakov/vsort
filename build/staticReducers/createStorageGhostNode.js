const createStorageGhostNode = (memo) => {

  const storageGhostNode = document.createElement('div')
  storageGhostNode.className = 'vsort__storage__ghostNode'

  return Object.assign({}, memo, { storageGhostNode })

}

module.exports = createStorageGhostNode

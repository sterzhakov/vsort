const createStorageNode = (memo) => {

  const { config } = memo

  const storageNode = document.createElement('div')
  storageNode.className = 'vsort__storage'

  return Object.assign({}, memo, { storageNode })

}

module.exports = createStorageNode

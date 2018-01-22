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

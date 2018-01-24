const createPrevRootGroup = (memo) => {

  const { rootGroup } = memo

  return Object.assign({}, memo, { prevRootGroup: rootGroup })

}

module.exports = createPrevRootGroup

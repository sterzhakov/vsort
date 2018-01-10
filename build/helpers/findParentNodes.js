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

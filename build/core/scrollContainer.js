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

      if (containerNode.scrollHeight == containerBox.height) {

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

      if (containerNode.scrollWidth == containerBox.width) {

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

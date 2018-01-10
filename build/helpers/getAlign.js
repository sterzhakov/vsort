const getAlign = (type, shiftX, shiftY, width, height) => {

  if (type == 'vertical') {

    return (shiftY < height / 2) ? 'before' : 'after'

  } else {

    return (shiftX < width / 2) ? 'before' : 'after'

  }

}

module.exports = getAlign

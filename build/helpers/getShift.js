const getShift = (domNode, event) => {

  const boundings = domNode.getBoundingClientRect()

  const pageX = boundings.left + window.pageXOffset
  const pageY = boundings.top + window.pageYOffset

  const shiftX = event.pageX - pageX
  const shiftY = event.pageY - pageY

  return { x: shiftX, y: shiftY }

}

module.exports = getShift

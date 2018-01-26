const B = require('berries')
const { Component, html } = require('vqua')
const Preview = require('./Preview')
const List = require('./List')
const User = require('../models/User')
const createSortable = require('../../../build')

class PageVertical extends Component {

  constructor(props) {

    super(props)

    this.state = {
      users: User.getAll().slice(0, 10)
    }

  }

  afterMount() {

    this.vsort = createSortable({
      rootNode: this.refs.List.refs.list,
      align: 'vertical',
      isHandlerNode: domNode => domNode.textContent == '#',
      scrollNode: document.querySelector('.sort__wrapper'),
    })

    this.vsort.subscribe((memo) => {

      const { isNewPosition, draggablePosition, droppablePosition } = memo

      if (isNewPosition) {

        const newItems = B.move(
          this.state.users,
          draggablePosition,
          droppablePosition
        )

        this.setState({ users: newItems })

      }

    })

  }

  beforeUnmount() {

    this.vsort.unsubscribe()

  }

  render() {

    return (
      List.v({
        items: this.state.users,
        ref: 'List',
        align: 'vertical',
      })
    )

  }

}

module.exports = PageVertical

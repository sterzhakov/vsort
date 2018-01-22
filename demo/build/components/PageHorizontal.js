const B = require('berries')
const { Component, html } = require('vqua')
const Preview = require('./Preview')
const List = require('./List')
const User = require('../models/User')
const createSortable = require('../../../build')

class PageHorizontal extends Component {

  constructor(props) {

    super(props)

    this.state = {
      users: User.getAll().slice(0, 10)
    }

  }

  afterMount() {

    this.sortable = createSortable({
      rootNode: this.refs.List.refs.list,
      align: this.props.align,
      isHandlerNode: domNode => domNode.textContent == '#',
      scrollNode: document.querySelector('.sort__wrapper'),
    })

    this.sortable.subscribe((memo) => {

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

    this.sortable.unsubscribe()

  }

  render() {

    return (
      List.v({
        ref: 'List',
        items: this.state.users,
        align: 'horizontal',
      })
    )

  }

}

module.exports = PageHorizontal

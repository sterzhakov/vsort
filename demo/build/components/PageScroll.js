const { Component, html } = require('vqua')
const B = require('berries')
const Preview = require('./Preview')
const List = require('./List')
const User = require('../models/User')
const createSortable = require('../../../build')

class PageScroll extends Component {

  constructor(props) {

    super(props)

    this.state = {
      users: User.getAll()
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

    const { div } = html

    return [
      div({ class: 'horizontal-dots' }),
      div({ class: 'sort__wrapper' },
        List.v({
          ref: 'List',
          align: 'horizontal',
          items: this.state.users,
        }),
      ),
      div({ class: 'vertical-dots' })
    ]


  }

}

module.exports = PageScroll

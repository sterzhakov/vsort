const B = require('berries')
const { Component, html } = require('vqua')
const createSortable = require('../../../build')

class List extends Component {

  static defaultProps() {

    return {
      align: 'vertical'
    }

  }

  constructor(props) {

    super(props)

    this.state = {
      items: [
        { id: 0, name: 'Zero'  },
        { id: 1, name: 'One'   },
        { id: 2, name: 'Two'   },
        { id: 3, name: 'Three' },
        { id: 4, name: 'Four'  },
        { id: 5, name: 'Five'  },
        { id: 6, name: 'Six '  }
      ]
    }

  }

  afterMount() {

    this.sortable = createSortable({
      rootNode: this.refs.list,
      align: this.props.align,
      isHandlerNode: domNode => domNode.textContent == '#'
    })

    this.sortable.subscribe((memo) => {

      const { isNewPosition, draggablePosition, droppablePosition } = memo

      if (isNewPosition) {

        const newItems = B.move(
          this.state.items,
          draggablePosition,
          droppablePosition
        )

        this.setState({ items: newItems })

      }

    })

  }

  beforeUnmount() {

    this.sortable.unsubscribe()

  }

  render() {

    const { ul, li, span } = html

    return (
      ul({ class: 'noselect ' + this.props.align + '-list', ref: 'list' },
        this.state.items.map((item) => {
          return (
            li({ key: item.id.toString() },
              span({ class: 'cursor-move' }, '#'),
              ' ',
              item.name,
            )
          )
        })
      )
    )

  }

}

module.exports = List

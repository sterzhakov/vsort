const B = require('berries')
const { Component, html } = require('vqua')
const Preview = require('./Preview')
const List = require('./List')
const User = require('../models/User')
const createSortable = require('../../../build')

class PageMultiple extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      users_1: User.getAll().slice(0, 1),
      users_2: User.getAll().slice(2, 5),
      users_3: User.getAll().slice(10, 20),
    }

  }

  afterMount() {

    const numbers = B.times(3 + 1).slice(1)

    this.sortables = numbers.map(number => {

      const depends = numbers
        .filter(_number => _number != number)
        .map(number => {

          const name = 'users_' + number
          const node = this.refs['List' + number].refs.list

          return { name, node }

        })

      const sortableConfig = {
        name: 'users_' + number,
        depends,
        rootNode: this.refs['List' + number].refs.list,
        align: 'vertical',
        isHandlerNode: domNode => domNode.textContent == '#',
        scrollNode: document.querySelector('.sort__wrapper'),
      }

      const sortable = createSortable(sortableConfig)

      sortable.subscribe((memo) => {

        const {
          isNewPosition,
          draggablePosition,
          droppablePosition,
          droppableGroup,
          rootGroup,
        } = memo

        if (!isNewPosition) return null

        const fromGroupName = rootGroup.name
        const toGroupName = droppableGroup.name

        if (droppableGroup.name == rootGroup.name) {

          const newUsers = B.move(
            this.state[droppableGroup.name],
            draggablePosition,
            droppablePosition
          )

          this.setState({ [droppableGroup.name]: newUsers })

        } else {

          const user = this.state[fromGroupName][draggablePosition]

          const toUsers = B.insert(
            this.state[toGroupName],
            droppablePosition,
            user
          )

          const fromUsers = this.state[fromGroupName]
            .filter((user, index) => (index != draggablePosition))

          const newUsers = {
            [fromGroupName]: fromUsers,
            [toGroupName]: toUsers
          }

          this.setState(newUsers)

        }

      })

      return sortable

    })

  }

  beforeUnmount() {

    this.sortables.forEach(sortable => sortable.unsubscribe())

  }

  render() {

    const { div } = html

    return [
      div({ class: 'float-left' },
        List.v({
          ref: 'List1',
          align: 'vertical',
          items: this.state.users_1
        }),
      ),
      div({ class: 'float-left' },
        List.v({
          ref: 'List2',
          align: 'vertical',
          items: this.state.users_2
        })
      ),
      div({ class: 'float-left' },
        List.v({
          ref: 'List3',
          align: 'vertical',
          items: this.state.users_3
        })
      ),
      div({ class: 'float-clear' })
    ]

  }

}

module.exports = PageMultiple

const { Component, html } = require('vqua')
const B = require('berries')

class Menu extends Component {

  constructor(props, context) {

    super(props, context)

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(event) {

    if (this.props.onClick)
      this.props.onClick(event)

  }

  render() {

    const { ul, li, a } = html

    return (
      ul({ class: 'menu' },
        this.props.items.map(item => {
          return (
            li({
              key: item.id,
              class: B.classNames('menu__item', {
                'menu__item--active': item.active
              })
            },
              a({
                class: 'menu__link',
                href: '#' + item.id,
                onClick: (event) => this.handleClick({ event, item })
              },
                item.name
              )
            )
          )
        })
      )
    )

  }

}

module.exports = Menu

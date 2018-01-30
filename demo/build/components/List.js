const { Component, html } = require('vqua')
const B = require('berries')

class List extends Component {

  render() {

    const { ul, li, span } = html

    return (
      ul({
        ref: 'list',
        class: B.classNames('sort', 'noselect', {
          'sort__vertical':   this.props.align == 'vertical',
          'sort__horizontal': this.props.align == 'horizontal',
        }),
      },
        this.props.items.length
          ? null
          : li({
              'data-vsort-empty': 'true',
              class: 'sort__item noselect',
              key: 'empty',
            },
              'list is empty'
            ),
        this.props.items.map((item) => {
          return (
            li({
              class: 'sort__item noselect',
              key: item.id.toString()
            },
              span({
                class: 'sort__icon cursor-move noselect'
              },
                '#'
              ),
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

const { html, Component } = require('vqua')
const List = require('./List')

const createPreview = ({ name }, ...childs) => {

const { div, p, h2 } = html

  return (
    div({ class: 'preview' },
      h2({}, name),
      childs
    )
  )

}

class App extends Component {

  render() {

    return [
      createPreview({ name: 'Verical' },
        List.v({ align: 'vertical' })
      ),
      createPreview({ name: 'Horizontal' },
        List.v({ align: 'horizontal' })
      )
    ]

  }

}

module.exports = App

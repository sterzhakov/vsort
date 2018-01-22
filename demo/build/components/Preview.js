const { Component, html } = require('vqua')

class Preview extends Component {

  render() {

    const { div, p, h2 } = html

    return (
      div({ class: 'preview' },
        h2({},
          this.props.name
        ),
        this.props.childs
      )
    )

  }

}

module.exports = Preview

const { html, Component } = require('vqua')
const B = require('berries')
const List = require('./List')
const Preview = require('./Preview')
const Menu = require('./Menu')
const PageVertical = require('./PageVertical')
const PageHorizontal = require('./PageHorizontal')
const PageScroll = require('./PageScroll')
const PageMultiple = require('./PageMultiple')

const setActivePageById = (id, pages) => {

  return pages.map(page => {

    const active = page.id == id

    return Object.assign({}, page, { active })

  })

}

class App extends Component {

  constructor(props, state) {

    super(props, state)

    const pages = [
      {
        id: 'vertical',
        name: 'Vertical',
        active: true,
        component: PageVertical,
      },
      {
        id: 'horizontal',
        name: 'Horizontal',
        active: false,
        component: PageHorizontal,
      },
      {
        id: 'scroll',
        name: 'Scroll',
        active: false,
        component: PageScroll,
      },
      {
        id: 'multiple',
        name: 'Multiple',
        active: false,
        component: PageMultiple,
      },
    ]

    const pageId = window.location.hash.slice(1) || 'vertical'

    this.state = {
      pages: setActivePageById(pageId, pages)
    }

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)

  }

  handleMenuItemClick({ event, item }) {

    this.setState({
      pages: this.state.pages.map(page => {

        return Object.assign({}, page, { active: page.id == item.id })

      })
    })

  }

  render() {

    const page = (
      this.state.pages.find(page => page.active) ||
      this.state.pages[0]
    )

    const { h1, div, br, a, p } = html

    return [
      div({ class: 'header' },
        a({
          class: 'header__back',
          href: 'https://github.com/sterzhakov/vsort'
        },
          'Back to github'
        ),
        p({
          class: 'header__description',
        },
          'Drag elements by #'
        )
      ),
      div({ class: 'sidebar' },
        Menu.v({
          items: this.state.pages,
          onClick: this.handleMenuItemClick,
        })
      ),
      div({ class: B.classNames('content', {
        ['content__' + page.id]: page.active
      }) },
        h1({},
          page.name
        ),
        br(),
        page.component.v({ key: page.id })
      )
    ]

  }

}

module.exports = App

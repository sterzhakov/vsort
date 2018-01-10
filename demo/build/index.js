const { render } = require('vqua')
const App = require('./components/App')

const $app = document.getElementById('app')

render($app, [], [App.v()])

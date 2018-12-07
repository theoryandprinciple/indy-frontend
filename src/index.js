import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './routes'
import Initializers from './initializers'

import 'sanitize.css/sanitize.css'
import './index.css'

// Run initializers... anything that will need to use or subscribe to the store
Initializers(store);

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)

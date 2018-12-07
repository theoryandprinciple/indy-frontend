import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor, history } from './store'
import App from './routes'
import Initializers from './initializers'

import 'sanitize.css/sanitize.css'
import './index.css'

// Run initializers... anything that will need to use or subscribe to the store
Initializers(store);

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div>
            <App />
          </div>
          </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

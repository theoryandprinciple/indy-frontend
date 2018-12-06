import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home/containers'
import About from '../about'
<<<<<<< HEAD
import withRoot from '../../wiring/withRoot'
=======
import Login from '../login/containers'
>>>>>>> master

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/login" component={Login} />
    </main>
  </div>
)

export default withRoot(App)

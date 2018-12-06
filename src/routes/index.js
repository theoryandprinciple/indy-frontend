import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import Home from '../containers/home/containers'
import About from '../containers/about'
import Login from '../containers/login/containers'

const App = () => (
    <Route
        render={({ location }) => (
            <React.Fragment>
                <header>
                  <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link>
                </header>
                <main>
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </main>
            </React.Fragment>
        )}
    />
)

export default App

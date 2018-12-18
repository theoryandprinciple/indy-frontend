import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Home from './home/containers'
import About from './about'
import Login from './login/containers'
import ProtectedRoute from './admin'
import ResetPassword from './login/containers/resetPass'
import withRoot from '../wiring/withRoot'
import Authenticate_Admin from '../wiring/authAdmin'

const Authenticated_ProtectedRoute = withRouter(
    Authenticate_Admin(ProtectedRoute)
)

const App = () => (
    <Route
        render={({ location }) => (
            <React.Fragment>
                <header>
                    <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
                    <Link to="/login">Login</Link>
                </header>
                <main>
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route
                            exact
                            path="/admin"
                            component={Authenticated_ProtectedRoute}
                        />
                        <Route path="/reset-pass" component={ResetPassword} />
                    </Switch>
                </main>
            </React.Fragment>
        )}
    />
)

export default withRoot(App)

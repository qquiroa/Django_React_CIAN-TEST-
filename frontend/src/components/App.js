import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Header from './layout/Header'
import ShowCategories from '../components/categories/ShowCategories'
import Register from './auth/register'
import PrivateRoute from '../components/other/PrivateRoute'
import { loadUser } from '../actions/auth'

import { Provider } from 'react-redux'
import store from '../store'
import Login from './auth/login'

class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                <Fragment>
                    <Header />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
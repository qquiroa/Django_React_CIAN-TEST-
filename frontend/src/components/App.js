import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./other/Alerts";

import Header from './layout/Header'
import Register from './auth/register'
import PrivateRoute from '../components/other/PrivateRoute'
import { loadUser } from '../actions/auth'

import { Provider } from 'react-redux'
import store from '../store'
import Login from './auth/login'

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }
    render() {
        const alertOptions = {
            timeout: 3000,
            position: "top center"
        };
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
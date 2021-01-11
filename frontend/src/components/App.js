import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./other/Alerts";

import Header from './layout/Header'
import Register from './auth/register'
import { default as OwnProductsIndex}  from './product/index'
import { default as OwnProductsEdit } from './product/edit'
import { default as OwnProductsCreate } from './product/new'
import Home from './controls/home'
import Buy from './controls/buy'
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
                            <Route exact path="/" component={Home} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/buy/:id(\d+)" component={Buy} />
                            <PrivateRoute exact path="/own-products" component={OwnProductsIndex} />
                            <PrivateRoute exact path="/own-products/create" component={OwnProductsCreate} />
                            <PrivateRoute exact path="/own-products/:id(\d+)" component={OwnProductsEdit} />
                            
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
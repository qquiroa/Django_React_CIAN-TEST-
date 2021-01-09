import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import Header from './layout/Header'
import ShowCategories from '../components/categories/ShowCategories'

import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <ShowCategories />
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
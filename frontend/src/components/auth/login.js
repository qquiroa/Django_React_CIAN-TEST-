import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import Alerts from '../other/Alerts'

export class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const { username, password } = this.state
        return (
            <Fragment>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <center>
                            <h2><b>INICIO DE SESIÓN</b></h2>
                        </center>
                        <form onSubmit={this.onSubmit} method="POST">
                            <div className="form-group">
                                <label htmlFor="username">User name</label>
                                <input type="text" className="form-control" id="username" name="username" placeholder="Enter user name" required onChange={this.onChange} value={username} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" required onChange={this.onChange} value={password} />
                            </div>
                            <center>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </center>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
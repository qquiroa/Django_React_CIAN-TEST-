import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

export class Header extends Component {
    render() {
        const { isAuthenticated, user } = this.props.auth

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Inicia sesión</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register" >Registrate</Link>
                </li>
            </ul>
        )

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <button onClick={this.props.logout}  className="btn btn-link nav-link">Cerrar sesión</button>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <Link className="navbar-brand" to="/">TIENDA</Link>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { getOwnProducts } from '../../actions/product'
import { Redirect } from 'react-router-dom'
import Alerts from '../other/Alerts'

export class Index extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.props.getOwnProducts()
    }

    render() {
        const { products } = this.state
        return (
            <Fragment>
                <div className="container">
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2">
                            <Link className="btn btn-outline-success" to="/own-products/create"><i className="fa fa-plus"></i> Nuevo producto</Link>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-content-start justify-content-center flex-wrap">
                    {this.props.products.map(product => (
                        <div className="card" style={{ width: "18rem" }} key={product.id}>
                            <center>
                            <img className="card-img-top" style={{ width: '50%'}} src={product.image_path} alt="Card image cap" />
                            </center>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{"Precio: Q" + parseFloat(product.price).toFixed(2)}</li>
                                <li className="list-group-item">{"Existencia: " + product.stock}</li>
                            </ul>
                            <Link className="btn btn-primary" to={`/own-products/${product.id}`}><li className="fa fa-pencil"></li> Editar</Link>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.product
})

export default connect(mapStateToProps, { getOwnProducts })(Index)
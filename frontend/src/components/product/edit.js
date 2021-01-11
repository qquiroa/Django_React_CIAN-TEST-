import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { getOwnProduct, updateOwnProduct } from '../../actions/product'
import { Redirect } from 'react-router-dom'
import Alerts from '../other/Alerts'

export class Edit extends Component {
    state = {
        name: '',
        description: '',
        price: 0,
        stock: 0
    }

    componentDidMount() {
        const id = this.props.match.params.id
        if (id) {
            this.props.getOwnProduct(id)
        } else {
            return <Redirect to="/own-products" />
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.product !== prevProps.product){
            this.setState(this.props.product)
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault()
        this.props.updateOwnProduct(this.state)
    }

    render() {
        const { name, description, price, stock } = this.state
        if(this.props.updated){
            return <Redirect to="/own-products" />
        }
        return (
            <Fragment>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <center>
                            <h2><b>EDITANDO PRODUCTO</b></h2>
                        </center>
                        <form onSubmit={this.onSubmit} method="POST">
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" required onChange={this.onChange} value={name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea className="form-control" id="description" name="description" onChange={this.onChange} value={description}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Precio</label>
                                <input type="number" step="0.01" className="form-control" id="price" name="price" placeholder="Enter price" required onChange={this.onChange} value={price} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Existencia</label>
                                <input type="number" className="form-control" id="stock" name="stock" placeholder="Enter stock" required onChange={this.onChange} value={stock} />
                            </div>
                            <center>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </center>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    product: state.product.editing_product,
    updated: state.product.updated
})

export default connect(mapStateToProps, { getOwnProduct, updateOwnProduct })(Edit)
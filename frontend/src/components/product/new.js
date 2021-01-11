import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { getCategories } from '../../actions/categories'
import { createOwnProduct } from '../../actions/product'
import { Redirect } from 'react-router-dom'
import Alerts from '../other/Alerts'

export class NewP extends Component {
    state = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        id_category: 0,
        image: null
    }

    componentDidMount() {
        this.props.getCategories()
    }

    onChange = e => {
        if(e.target.type=="file"){
            this.setState({ [e.target.name]: e.target.files[0] })
        } else{
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.createOwnProduct(this.state)
    }

    render() {
        const { name, description, price, stock, id_category, image } = this.state
        if (this.props.created) {
            return <Redirect to="/own-products" />
        }
        return (
            <Fragment>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <center>
                            <h2><b>CREANDO PRODUCTO</b></h2>
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
                            <div>
                                <select className="custom-select" name="id_category" onChange={this.onChange}>
                                    <option>Selecciona una categoría</option>
                                    {this.props.categories.map(category => (
                                        <option value={category.id} key={category.id}>{category.category}</option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="image" name="image" onChange={this.onChange} />
                                <label className="custom-file-label" htmlFor="customFile">Elige una foto</label>
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
    categories: state.categories.categories,
    created: state.product.created
})

export default connect(mapStateToProps, { createOwnProduct, getCategories })(NewP)
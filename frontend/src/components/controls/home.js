import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/home'
import { Link } from "react-router-dom"

export class Home extends Component {

    componentDidMount() {
        this.props.getProducts()
    }

    render() {
        return (
            <Fragment>
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
                            <Link className="btn btn-primary" to={`/buy/${product.id}`}><li className="fa fa-shopping-cart"></li> Comprar</Link>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    products: state.home.products
})

export default connect(mapStateToProps, { getProducts })(Home)
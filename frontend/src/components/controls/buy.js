import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getProduct, buyProduct } from '../../actions/buy'
import { Redirect } from 'react-router-dom'

export class Buy extends Component {

    state = {
        full_name: '',
        nit: '',
        address: '',
        total: 0,
        id_product: this.props.match.params.id,
        quantity: 1,
        unitary_price: 0,
        stock: 0
    }

    onChange = e => {
        if (e.target.name == "quantity") {
            this.setState({ total: e.target.value * this.state.unitary_price })
        }
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = e => {
        e.preventDefault()
        this.props.buyProduct(this.state)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        if (id) {
            this.props.getProduct(id)
        } else {
            return <Redirect to="/" />
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({ unitary_price: this.props.product.price, total: this.props.product.price, stock: this.props.product.stock })
        }
    }

    render() {
        const product = this.props.product,
            { full_name, nit, address, total, id_product, quantity, unitary_price, stock } = this.state
        
            if(this.props.buy_sucess){
                return <Redirect to="/" />
            }
        return (
            <Fragment>
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="d-flex justify-content-start col">
                            <div className="col-md-10 m-auto">
                                <div className="card card-body mt-5">
                                    <center>
                                        <h2><b>Datos de facturación</b></h2>
                                    </center>
                                    <form onSubmit={this.onSubmit} method="POST">
                                        <div className="form-group">
                                            <label htmlFor="full_name">Nombre completo</label>
                                            <input type="text" className="form-control" id="full_name" name="full_name" placeholder="Enter full name" required onChange={this.onChange} value={full_name} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nit">NIT</label>
                                            <input type="text" className="form-control" id="nit" name="nit" placeholder="NIT" required onChange={this.onChange} value={nit} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address">Dirección</label>
                                            <input type="text" className="form-control" id="address" name="address" placeholder="Address" required onChange={this.onChange} value={address} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="quantity">Cantidad</label>
                                            <input type="number" className="form-control" id="quantity" name="quantity" placeholder="Quantity" required onChange={this.onChange} value={quantity} min="1" max={stock} />
                                        </div>
                                        <b>TOTAL:</b> Q{parseFloat(total).toFixed(2)}
                                        <br />
                                        <center>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </center>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end col">
                            <div className="card" style={{ width: "18rem" }} key={product.id}>
                                <center>
                                    <img className="card-img-top" style={{ width: '50%' }} src={product.image_path} alt="Card image cap" />
                                </center>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{"Precio: Q" + parseFloat(product.price).toFixed(2)}</li>
                                    <li className="list-group-item">{"Existencia: " + product.stock}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    product: state.buy.product,
    buy_sucess: state.buy.buy_sucess
})

export default connect(mapStateToProps, { getProduct, buyProduct })(Buy)
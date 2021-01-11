import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { getDashboard } from '../../actions/dashboard'

export class Dashboard extends Component {

    state = {
        sellsPerProduct: {
            labels: [],
            datasets: [{
                label: 'Cantidad en Quetzales de productos comprados',
                data: []
            }]
        },
        globalAVG: {
            labels: ['Total de ventas global (en moneda)', 'Promedio de precios'],
            datasets: [{
                label: 'Otros datos',
                data: []
            }]
        }
    }

    componentDidMount() {
        this.props.getDashboard()
    }

    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info) {
            this.props.info.perProduct.forEach(data => {
                console.log(data)
                this.setState({
                    sellsPerProduct: {
                        labels: [...this.state.sellsPerProduct.labels, data.name],
                        datasets: [{
                            label: 'Cantidad en Quetzales de productos comprados',
                            data: [...this.state.sellsPerProduct.datasets[0].data, data.Total]
                        }]
                    }
                })
            })
            this.setState({
                globalAVG: {
                    labels: ['Total de ventas global (en moneda)', 'Promedio de precios'],
                    datasets: [{
                        label: 'Otros datos',
                        data: [...this.state.globalAVG.datasets[0].data, this.props.info.globalProduct.Total]
                    }]
                }
            })
            this.setState({
                globalAVG: {
                    labels: ['Total de ventas global (en moneda)', 'Promedio de precios'],
                    datasets: [{
                        label: 'Otros datos',
                        data: [...this.state.globalAVG.datasets[0].data, this.props.info.avgPrice.Total]
                    }]
                }
            })
        }
    }

    render() {
        return (
            <Fragment>
                <center>
                    <b style={{ fontSize: "6vh" }}>DASHBOARD</b>
                </center>
                <div style={{ width: "50vw" }}>
                    <Bar
                        data={this.state.sellsPerProduct}
                    />
                </div>
                <div style={{ width: "50vw" }}>
                    <Bar
                        data={this.state.globalAVG}
                    />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    info: state.dashboard
})

export default connect(mapStateToProps, { getDashboard })(Dashboard)
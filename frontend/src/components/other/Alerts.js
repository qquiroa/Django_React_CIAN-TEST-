import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { withAlert } from "react-alert";

export class Alerts extends Component {
    componentDidUpdate() {
        const { alertinfo, alert } = this.props
        if(alertinfo){
            if (alertinfo.type && alertinfo.type.toUpperCase() == "SUCCESS") {
                alert.success(alertinfo.message)
            } else if (alertinfo.type && alertinfo.type.toUpperCase() == "ERROR") {
                alert.error(`CODE ${alertinfo.code} - ${alertinfo.message}`)
            } else if (alertinfo.type) {
                alert.show(alertinfo.message)
            }
        }

    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    alertinfo: state.alert.alert
})

export default connect(mapStateToProps)(withAlert()(Alerts))
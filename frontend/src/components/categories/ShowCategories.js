import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCategories } from '../../actions/categories'

export class ShowCategories extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <Fragment>
                <div class="form-group">
                    <label for="categories"><h4>Categorías</h4></label>
                    <select class="form-control" id="categories">
                        {
                            this.props.categories.map(category => (
                                <option value={category.id}>{category.category}</option>
                            ))
                        }
                    </select>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories
})

export default connect(mapStateToProps, { getCategories })(ShowCategories)
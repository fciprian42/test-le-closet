import React, { PureComponent } from 'react'
import { railsActions } from 'redux-rails'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

class Pickup extends PureComponent {
    static propTypes = {
        products: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchProducts()
    }

    render() {
        console.log(this.props)
        return (<></>)
    }
}

const mapStateToProps = state => ({
    products: state.api.Products.models,
    loading: state.api.Products.loading
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => {
        dispatch(railsActions.index({ resource: "Products" }));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Pickup);
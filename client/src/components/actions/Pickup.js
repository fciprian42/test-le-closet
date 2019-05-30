import React, { PureComponent } from 'react'
import { railsActions } from 'redux-rails'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import ListItemIcon from "@material-ui/core/ListItemIcon";

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '15px'
    },

    loading: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    table: {
        minWidth: 650,
        marginTop: '1em'
    },

    btn: {
        minWidth: '48px!important'
    }
})


class Pickup extends PureComponent {
    static propTypes = {
        fetchProducts: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
            add: false
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handlePickup = this.handlePickup.bind(this)
    }

    componentDidMount() {
        this.props.fetchProducts()
    }

    handleDelete(product) {
        if (product) {

        }
    }

    handlePickup(product) {
        if (product) {

        }
    }

    render() {
        const { classes, loading, products } = this.props;

        if (loading) {
            return (
                <div className={classes.loading}>
                    <CircularProgress size={64} />
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <Typography variant='h5'>
                    Products list
                </Typography>
                {products && products.length > 0 && <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.attributes.id}>
                                <TableCell component="th" scope="row">
                                    {product.attributes.id}
                                </TableCell>
                                <TableCell align="left">{product.attributes.name}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={this.handleDelete(product.attributes)} color='secondary' className={classes.btn}>
                                        <FontAwesomeIcon icon={['fal', 'times']} />
                                    </Button>
                                    <Button onClick={this.handleDelete(product.attributes)} color='primary' className={classes.btn}>
                                        <FontAwesomeIcon icon={['fal', 'plus']} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
            </div>
        )
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
import React, { PureComponent } from 'react'
import { railsActions } from 'redux-rails'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Animated} from "react-animated-css"
import { CircularProgress, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Avatar } from '@material-ui/core'

import axios from 'axios'

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '15px',
        width: '100%'
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
    },

    success: {
        background: '#2ed573!important',
        height: 100,
        width: 100,
        marginBottom: '15px'
    },
})


class Pickup extends PureComponent {
    _isMounted = false

    static propTypes = {
        fetchProducts: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            add: false,
            remove: false,
            success_add: false,
            name: '',
            products: []
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handlePickup = this.handlePickup.bind(this)
    }

    static getDerivedStateFromProps(props, prevState) {
        const { products } = props

        if (products && products.length > 0) {
            return {
                add: prevState.add,
                remove: prevState.remove,
                success_add: prevState.success_add,
                name: prevState.name && prevState.name.length > 0 ? prevState.name : '',
                products
            }
        }

        return prevState
    }

    componentDidMount() {
        this._isMounted = true

        if (this._isMounted) {
            this.props.fetchProducts()
        }
    }

    handleDelete(product) {
        if (product) {
            axios({
                method: 'delete',
                url: 'http://localhost:3000/api/products/' + product.id,
            }).then(response => {
                let newProducts = this.state.products

                this.setState({
                    remove: true,
                    name: product.name
                })

                newProducts.forEach((item, index) => {
                    if (item.attributes.id === product.id) {
                        newProducts.splice(index, 1)
                    }
                })

                setTimeout(() => {
                    this.setState({
                        remove: false,
                        products: newProducts
                    })
                }, 750)
            })
        }
    }

    handlePickup(product) {
        if (product) {
            let sessionRead = JSON.parse(sessionStorage.getItem('auth'))

            axios({
                method: 'post',
                url: 'http://localhost:3000/api/items',
                data: {
                    product_id: product.id,
                    by: sessionRead.name,
                    product_name: product.name
                }
            }).then(response => {
                if (response.data) {
                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/api/operators_postes',
                        data: {
                            operator_id: sessionRead.id,
                            poste_id: 1
                        }
                    }).then(() => {
                        axios({
                            method: 'put',
                            url: 'http://localhost:3000/api/operators/' + sessionRead.id
                        }).then(() => {
                            this.setState({
                                add: true,
                                name: product.name
                            })

                            setTimeout(() => {
                                this.setState({
                                    add: false,
                                    success_add: true
                                })
                            }, 750)

                            setTimeout(() => {
                                this.setState({
                                    success_add: false
                                })
                            }, 2500)
                        })
                    })
                }
            })
        }
    }

    render() {
        const { classes, loading } = this.props
        const { add, remove, products, success_add } = this.state

        if (loading || remove || add) {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={loading || remove || add} className={classes.loading}>
                <div className={classes.loading}>
                    <CircularProgress size={64} />
                </div>
            </Animated>);
        }

        if (success_add) {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={success_add} className={classes.loading}>
                <div className={classes.loading}>
                    <Avatar className={classes.success}>
                        <FontAwesomeIcon icon={['fal', 'check']} style={{fontSize: '40px'}} />
                    </Avatar>
                    <Typography variant='h5'>
                        The product '<strong>{this.state.name}</strong>' has been add to checkup list
                    </Typography>
                </div>
            </Animated>);
        }

        return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!loading && !remove && !add && !success_add} className={classes.root}>
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
                                    <Button onClick={() => {this.handleDelete(product.attributes)}} color='secondary' className={classes.btn}>
                                        <FontAwesomeIcon icon={['fal', 'times']} />
                                    </Button>
                                    <Button onClick={() => {this.handlePickup(product.attributes)}} color='primary' className={classes.btn}>
                                        <FontAwesomeIcon icon={['fal', 'hand-paper']} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
            </div>
        </Animated>)
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
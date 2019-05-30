import React, { PureComponent } from 'react'
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


class Checkup extends PureComponent {
    _isMounted = false

    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            checkup: false
        }

        this.handleCheckUp = this.handleCheckUp.bind(this)
    }

    componentDidMount() {
        this._isMounted = true

        axios({
            method: 'get',
            url: 'http://localhost:3000/api/items'
        }).then(response => {
            if (response && response.data && response.data.length > 0) {
                if (this._isMounted) {
                    this.setState({
                        items: response.data
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleCheckUp(item) {
        if (item) {
            let sessionRead = JSON.parse(sessionStorage.getItem('auth'))

            axios({
                method: 'post',
                url: 'http://localhost:3000/api/operators_postes',
                data: {
                    operator_id: sessionRead.id,
                    poste_id: 2
                }
            }).then(() => {
                axios({
                    method: 'put',
                    url: 'http://localhost:3000/api/operators/' + sessionRead.id
                }).then(() => {
                    axios({
                        method: 'put',
                        url: 'http://localhost:3000/api/items/' + item.id
                    }).then(() => {
                        let a = this.state.items

                        a.forEach((it) => {
                            if (it.product_id === item.product_id) {
                                it.checked = true
                            }
                        })

                        this.setState({
                            checkup: true,
                            name: item.product_name
                        })

                        setTimeout(() => {
                            this.setState({
                                checkup: false
                            })
                        }, 1000)
                    })
                })
            })
        }
    }

    render() {
        const { classes, loading } = this.props
        const { items, checkup } = this.state

        if (loading) {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={loading} className={classes.loading}>
                <div className={classes.loading}>
                    <CircularProgress size={64} />
                </div>
            </Animated>);
        }

        if (checkup) {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={checkup} className={classes.loading}>
                <div className={classes.loading}>
                    <Avatar className={classes.success}>
                        <FontAwesomeIcon icon={['fal', 'check']} style={{fontSize: '40px'}} />
                    </Avatar>
                    <Typography variant='h5'>
                        The product '<strong>{this.state.name}</strong>' has been add to packup list
                    </Typography>
                </div>
            </Animated>);
        }

        return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!loading || !checkup} className={classes.root}>
            <div className={classes.root}>
                <Typography variant='h5'>
                    Items to check-up
                </Typography>
                {items && items.length > 0 && <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="center">By</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.product_id}>
                                <TableCell component="th" scope="row">
                                    {item.product_id}
                                </TableCell>
                                <TableCell align="left">{item.product_name}</TableCell>
                                <TableCell align="center">{item.by}</TableCell>
                                <TableCell align="right">
                                    <Button disabled={item.checked} onClick={() => {this.handleCheckUp(item)}} color='primary' className={classes.btn}>
                                        <FontAwesomeIcon icon={['fal', 'check']} />
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
    loading: state.api.Items.loading
})

export default compose(connect(mapStateToProps), withStyles(styles))(Checkup);
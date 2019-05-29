import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { railsActions } from 'redux-rails'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {CircularProgress, Typography, Avatar, InputLabel, InputAdornment, FormControl, Input, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import LockIcon from '@material-ui/icons/Lock'
import UserIcon from '@material-ui/icons/Person'

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    avatar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)!important',
        height: 100,
        width: 100,
        marginBottom: '5px'
    },

    form: {
        width: 350
    }
});

class Login extends PureComponent {
    static propTypes = {
        fetchOperators: PropTypes.func,
        operators: PropTypes.array,
    };

    constructor (props) {
        super(props)

        this.state = {
            loading: false,
            nameInput: '',
            operators: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static getDerivedStateFromProps(props, prevState) {
        const { operators } = props

        if (operators && operators.length > 0) {
            let newOperators = []

            operators.forEach((operator) => {
                newOperators.push(operator.attributes.name)
            })

            return {
                loading: false,
                operators: newOperators
            }
        }

        return prevState
    }

    componentDidMount() {
        this.props.fetchOperators();
    }

    handleChange(e) {
        const value = e.target.value

        this.setState({
            nameInput: value
        })
    }

    handleSubmit() {

    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography variant='h4' style={{fontWeight: 300, marginBottom: '1em'}}>
                    Login to your dashboard
                </Typography>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            value={this.state.nameInput}
                            onChange={this.handleChange}
                            startAdornment={<InputAdornment
                                position="start"
                                style={{color: 'rgba(0, 0, 0, 0.54)'}}
                            >
                                <UserIcon/>
                            </InputAdornment>}
                        />
                    </FormControl>
                    <Button fullWidth type='submit' variant='contained' style={{marginTop: '2em', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: '#fff'}}>
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    operators: state.api.Operators.models,
    session: state.session,
    loading: state.api.Operators.loading
})

const mapDispatchToProps = dispatch => ({
    fetchOperators: () => {
        dispatch(railsActions.index({ resource: "Operators" }))
    }
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Login)
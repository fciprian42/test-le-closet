import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { railsActions } from 'redux-rails'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {CircularProgress, Typography, Avatar, InputLabel, InputAdornment, FormControl, Input, Button, FormHelperText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import LockIcon from '@material-ui/icons/Lock'
import CheckIcon from '@material-ui/icons/Check'
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
        background: '#2196f3!important',
        height: 100,
        width: 100,
        marginBottom: '5px'
    },

    success: {
        background: '#2ed573!important',
        height: 100,
        width: 100,
        marginBottom: '15px'
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
            error: false,
            isLogged: false,
            nameInput: '',
            operators: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static getDerivedStateFromProps(props, prevState) {
        const { operators } = props

        if (operators && operators.length > 0 && prevState.operators.length !== operators.length) {
            let newOperators = []

            operators.forEach((operator) => {
                newOperators.push({id: operator.attributes.id, name: operator.attributes.name})
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
            nameInput: value,
            error: false
        })
    }

    handleSubmit(e) {
        const { nameInput, operators } = this.state

        e.preventDefault()

        const found = operators.find((operator) => {
            return operator.name === nameInput
        })

        if (found) {
            this.setState({
                loading: true,
                error: false
            })

            setTimeout(() => {
                this.setState({
                    isLogged: true
                })
            }, 1000)
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        const { loading, isLogged, error } = this.state
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Avatar className={!isLogged ? classes.avatar : classes.success}>
                    {!isLogged && <LockIcon />}
                    {isLogged && <CheckIcon />}
                </Avatar>
                <Typography variant='h4' style={{fontWeight: 300, marginBottom: '1em'}}>
                    {!isLogged && <>Login to your dashboard</>}
                    {isLogged && <>Welcome {this.state.nameInput}</>}
                </Typography>
                {!loading && <form onSubmit={this.handleSubmit} className={classes.form}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            required
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
                        {error && <FormHelperText id='username' style={{color: '#eb4d4b'}}>
                            This operator doesn't exist
                        </FormHelperText>}
                    </FormControl>
                    <Button fullWidth type='submit' variant='contained' color='primary' style={{marginTop: '2em', color: '#fff'}}>
                        Login
                    </Button>
                </form>}
                {loading && !isLogged && <div>
                    <CircularProgress size={32} />
                </div>}
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
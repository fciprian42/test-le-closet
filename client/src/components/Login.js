import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { railsActions } from 'redux-rails'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {CircularProgress, Typography, Avatar, InputLabel, InputAdornment, FormControl, Input, Button, FormHelperText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import sessionConstants from '../redux/constants/sessionConstants'
import {Animated} from "react-animated-css";

import LockIcon from '@material-ui/icons/Lock'
import CheckIcon from '@material-ui/icons/Check'
import UserIcon from '@material-ui/icons/Person'
import {Redirect} from "react-router-dom";

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
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
            seconds: 5,
            id: null,
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
        const { session } = this.props

        if (session.isLogged) {
            let sessionRead = JSON.parse(session.session)

            this.props.history.push(`/dashboard/${sessionRead.id}`)
        } else {
            this.props.fetchOperators();

            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (this.state.isLogged && this.state.seconds >= 1) {
            this.setState({
                seconds: this.state.seconds - 1
            });
        }
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

        const user = operators.find((operator) => {
            if (operator.name === nameInput) return operator

            return null
        })

        if (user) {
            this.setState({
                loading: true,
                id: user.id,
                error: false
            })

            setTimeout(() => {
                this.setState({
                    isLogged: true
                })

                this.props.setSession({
                    id: user.id,
                    name: user.name
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

        if (this.state.seconds <= 0) {
           return <Redirect
               to={{
                   pathname: `dashboard/${this.state.id}`,
                   state: {
                       id: this.state.id,
                       name: this.state.nameInput
                   }
               }}
           />
        }

        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} className={classes.root}>
                <div className={classes.root}>
                    <Avatar className={!isLogged ? classes.avatar : classes.success}>
                        {!isLogged && <LockIcon style={{ fontSize: 40 }} />}
                        {isLogged && <CheckIcon style={{ fontSize: 40 }} />}
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
                    {loading && !isLogged && <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={loading && !isLogged}>
                        <CircularProgress size={64} />
                    </Animated>}
                    {isLogged && <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={isLogged}>
                        <Typography variant='h6' style={{fontWeight: 300, marginTop: '1em'}}>
                            You will be redirect to your dashboard in {this.state.seconds}...
                        </Typography>
                    </Animated>}
                </div>
            </Animated>
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
    },
    setSession: (user) => {
        dispatch({ type: sessionConstants.LOGIN, data: user})
    }
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Login)
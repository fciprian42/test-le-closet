import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Typography, FormControl, MenuItem, Select, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {railsActions} from "redux-rails";

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    formControl: {
        marginLeft: 8
    }
});

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            currentService: '',
            name: null,
            postes: [],
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps(props, prevState) {
        const { state } = props.location
        const { session } = props.session
        const { postes } = props
        let sessionRead = null
        let newPostes = []

        postes.forEach((poste) => {
            newPostes.push(poste.attributes.category)
        })

        if (session && session.isLogged) {
            sessionRead = JSON.parse(session.session)
        }

        if (state && state.id && state.name) {
            return {
                id: sessionRead ? sessionRead.id : state.id,
                name: sessionRead ? sessionRead.name : state.name,
                postes: newPostes
            }
        }

        return prevState
    }

    componentDidMount() {
        if (!this.state.id || !this.state.name) {
            this.setState({
                redirect: true
            })
        } else {
            this.props.fetchPostes()
        }
    }

    handleChange(e) {
        const value = e.target.value

        this.setState({
            currentService: value
        })
    }

    render() {
        const { classes, session } = this.props
        const { redirect, name, postes, currentService} = this.state

        let sessionRead = session && session.isLogged && JSON.parse(session.session)


        if (redirect) {
            return <Redirect to='/'/>
        }

        return (<div className={classes.root}>
            <Typography variant='h4' style={{fontWeight: 300, marginTop: '1em'}}>
                {name}
            </Typography>
            <Typography variant='h6' style={{fontWeight: 300}}>
                {currentService && 'currently serving in'}
                {sessionRead.id === this.state.id && <FormControl className={classes.formControl}>
                    <Select
                        value={currentService}
                        onChange={this.handleChange}
                        input={<Input id="select" />}
                    >
                        {postes.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>}
                {sessionRead.id !== this.state.id && currentService}
            </Typography>
        </div>)
    }
}

const mapStateToProps = state => ({
    session: state.session,
    postes: state.api.Postes.models
})

const mapDispatchToProps = dispatch => ({
    fetchPostes: () => {
        dispatch(railsActions.index({ resource: "Postes" }));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Dashboard);
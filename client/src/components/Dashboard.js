import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Typography, FormControl, MenuItem, Select, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {railsActions} from "redux-rails";
import sessionConstants from '../redux/constants/sessionConstants'
import {Animated} from "react-animated-css";

import axios from 'axios'

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    formControl: {
        marginLeft: 8
    },

    score: {
        display: 'flex',
        marginTop: '2em',
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: '#2196f3',
        color: '#fff',
        fontSize: '2em',
        border: '2px solid #1769aa'
    }
});

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            currentService: '',
            score: 0,
            name: null,
            postes: [],
            edit: false,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps(props, prevState) {
        const { postes, session } = props

        if (postes && postes.length > 0) {
            let newPostes = []

            let sessionRead = session && session.isLogged && JSON.parse(session.session)

            postes.forEach((poste) => {
                newPostes.push({id: poste.attributes.id, category: poste.attributes.category})
            })

            return {
                ...prevState,
                postes: newPostes,
                currentService: prevState.edit ? prevState.currentService : sessionRead.currentService ? sessionRead.currentService : ''
            }
        }

        return prevState
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            if (this.props.session.isLogged && this.props.match.params.id === JSON.parse(this.props.session.session).id.toString()) {
                this.props.fetchPostes();
            }

            axios({
                method: 'get',
                url: 'http://localhost:3000/api/operators/' +  this.props.match.params.id
            }).then(response => {
                if (response.data && response.data.id) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.first_name + ' ' + response.data.last_name,
                        score: response.data.score,
                    })
                }
            })
        } else {
            if (!this.props.match.params.id || !this.props.session.isLogged) {
                this.setState({
                    redirect: true
                })
            }
        }
    }

    handleChange(e) {
        const value = e.target.value

        this.setState({
            currentService: value,
            edit: true
        })

        this.props.setService(value)
    }

    render() {
        const { classes, session } = this.props
        const { redirect, name, postes, currentService, score} = this.state

        let sessionRead = session && session.isLogged && JSON.parse(session.session)

        if (redirect) {
            return <Redirect to='/'/>
        }

        return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} className={classes.root}>
                <div className={classes.root}>
                    <Typography variant='h4' style={{fontWeight: 300, marginTop: '1em'}}>
                        {name}
                    </Typography>
                    <Typography variant='h6' style={{fontWeight: 300, textAlign: 'center'}}>
                        {sessionRead.id === this.state.id && <>You are tag in <FormControl className={classes.formControl}>
                            <Select
                                value={currentService}
                                onChange={this.handleChange}
                                input={<Input id="select" />}
                            >
                                {postes.map((poste) => (
                                    <MenuItem key={poste.id} value={poste.category}>
                                        {poste.category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl></>}
                        {sessionRead.id !== this.state.id && currentService}
                    </Typography>
                    <div className={classes.score}>
                        {score}
                    </div>
                </div>
            </Animated>)
    }
}

const mapStateToProps = state => ({
    session: state.session,
    postes: state.api.Postes.models,
    operator: state.api.Operators.models
})

const mapDispatchToProps = dispatch => ({
    fetchPostes: () => {
        dispatch(railsActions.index({ resource: "Postes" }));
    },
    setService: (category) => {
        dispatch({type: sessionConstants.SWITCH_SERVICE, data: category})
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Dashboard);
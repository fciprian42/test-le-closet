import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            redirect: false
        }
    }

    static getDerivedStateFromProps(props, prevState) {
        const { state } = props.location

        if (state && state.id && state.name) {
            return {
                id: state.id,
                name: state.name
            }
        }

        return prevState
    }

    componentDidMount() {
        if (!this.state.id || !this.state.name) {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        const { redirect } = this.state

        if (redirect) {
            return <Redirect to='/'/>
        }

        return (<></>)
    }
}

export default Dashboard
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Dashboard extends PureComponent {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (<></>)
    }
}

export default Dashboard
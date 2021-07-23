import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FormControlLabel, Switch } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var BACKEND = "http://" + window.location.host

const switchDefaults = {
    color: 'primary',
    size: 'small'
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "disablerChecked": false };
    }
    callmatrix(path) {
        console.log(`Calling matrix Image Board /clock/${path}`)
        fetch(`${BACKEND}/api/clock/${path}`, {
            method: "GET",
            mode: "cors",
        });
    }
    async componentDidMount() {
        const resp = await fetch(`${BACKEND}/api/clock/status`,
            {
                method: "GET",
                mode: "cors",
            }
        );

        const status = await resp.text();

        if (resp.ok) {
            if (status === "true") {
                console.log("board is enabled", status)
                this.setState({ "disablerChecked": true })
            } else {
                console.log("board is disabled", status)
                this.setState({ "disablerChecked": false })
            }
        }
    }

    handleSwitch = () => {
        if (!this.state.disablerChecked) {
            console.log("enabling board")
            this.callmatrix("enable")
        } else {
            console.log("disabling board")
            this.callmatrix("disable")
        }
        this.setState({ "disablerChecked": !this.state.disablerChecked })
    }
    render() {
        return (
            <Container fluid style={{}}>
                <Row className="text-center pt-3">
                    <Col>
                    <FontAwesomeIcon icon="clock" size='5x' />
                    </Col>
                    </Row>
                    <Row className="pt-4">
                        <Col>
                            <FormControlLabel control={
                               <Switch id="clockenabler" checked={this.state.disablerChecked} onChange={this.handleSwitch} color={switchDefaults.color} size={switchDefaults.size} />
                           } label="Enable/Disable" />
                        </Col>
                    </Row>
            </Container>
        )
    }
}

export default Clock;
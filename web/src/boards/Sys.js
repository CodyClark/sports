import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import server from '../logos/server.png';
import { FormControlLabel, Switch } from '@material-ui/core';

var BACKEND = "http://" + window.location.host

const switchDefaults = {
    color: 'primary',
    size: 'small'
}

class Sys extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "disablerChecked": false };
    }
    callmatrix(path) {
        console.log(`Calling matrix Sys Board /clock/${path}`)
        fetch(`${BACKEND}/api/sys/${path}`, {
            method: "GET",
            mode: "cors",
        });
    }
    async componentDidMount() {
        const resp = await fetch(`${BACKEND}/api/sys/status`,
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
            <Container fluid style={{minHeight: '350px'}}>
                <Row className="text-center pt-2"><Col><Image src={server} style={{ height: '100px', width: 'auto' }} fluid /></Col></Row>
                <Row className="pt-4">
                    <Col>
                    <FormControlLabel control={
                        <Switch id="sysenabler" checked={this.state.disablerChecked} onChange={this.handleSwitch} color={switchDefaults.color} size={switchDefaults.size} />
                    } label="Enable/Disable" />
                        </Col>
                </Row>
            </Container>
        )
    }
}

export default Sys;
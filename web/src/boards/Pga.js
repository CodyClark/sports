import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import pgalogo from '../logos/pga-tour-logo.svg';
import { GetStatus, CallMatrix } from '../util';
import { FormControlLabel, Switch } from '@material-ui/core';

const switchDefaults = {
    color: 'primary',
    size: 'small'
}

class Pga extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "stats": false,
            "scroll": false,
        };
    }
    async componentDidMount() {
        await GetStatus(`pga/stats/status`, (val) => {
            this.setState({
                "stats": val,
            })
        })
        await GetStatus(`pga/stats/scrollstatus`, (val) => {
            this.setState({
                "scroll": val,
            })
        })
    }

    handleSwitch = (apiOn, apiOff, stateVar) => {
        var currentState = this.state[stateVar]
        console.log("handle switch", currentState)
        if (currentState) {
            console.log("Turn off", apiOff)
            CallMatrix(apiOff);
        } else {
            console.log("Turn on", apiOn)
            CallMatrix(apiOn);
        }
        this.setState(prev => ({
            [stateVar]: !prev[stateVar],
        }))
    }

    logosrc() {
        return pgalogo;
    }
    render() {
        return (
            <Container fluid style={{}}>
                <Row className="text-center pt-2">
                    <Col>
                        <Image src={this.logosrc()} style={{ height: '100px', width: 'auto' }} fluid />
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col>
                        <FormControlLabel control={
                            <Switch checked={this.state.stats} size={switchDefaults.size} color={switchDefaults.color}
                                onChange={() => this.handleSwitch(`pga/stats/enable`, `pga/stats/disable`, "stats")} />
                        } label="Enable/Disable"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                            <Switch id="pgascroll"  checked={this.state.scroll} size={switchDefaults.size} color={switchDefaults.color}
                                onChange={() => this.handleSwitch(`pga/stats/scrollon`, `pga/stats/scrolloff`, "scroll")} />
                        } label="Scroll Mode" />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Pga;
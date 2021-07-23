import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GetStatus, CallMatrix } from './util.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControlLabel, Switch } from '@material-ui/core';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "screen": false, "webboard": false };
    }
    async componentDidMount() {
        await GetStatus("status", (val) => {
            this.setState({ "screen": val })
        })
        await GetStatus("webboardstatus", (val) => {
            this.setState({ "webboard": val })
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

    render() {
        return (
            <Container fluid style={{minHeight: '372px'}}>
                <Row className="text-center">
                    <Col>
                        <Row className="text-center pt-2">
                            <Col>
                                <FontAwesomeIcon icon="cogs" size='5x' />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="pt-5">
                    <Col>
                    <FormControlLabel control={
                        <Switch color="primary" size="small" id="screen" checked={this.state["screen"]} onChange={() => this.handleSwitch("screenon", "screenoff", "screen")} />
                    } label="Screen On/Off" />
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                    <FormControlLabel control={
                         <Switch color="primary" size="small" id="webboard" checked={this.state["webboard"]} onChange={() => this.handleSwitch("webboardon", "webboardoff", "webboard")} />
                    } label="Web Board On/Off" />
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Home;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import imgimg from '../logos/image.png';
import { GetStatus, CallMatrix } from '../util';
import { FormControlLabel, Switch } from '@material-ui/core';

const switchDefaults = {
    color: 'primary',
    size: 'small'
}

class ImageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "enabled": false,
            "memcache": false,
            "diskcache": false
        };
    }
    async componentDidMount() {
        await GetStatus("img/status", (val) => {
            this.setState({ "enabled": val })
        })
        await GetStatus("img/memcachestatus", (val) => {
            this.setState({ "memcache": val })
        })
        await GetStatus("img/diskcachestatus", (val) => {
            this.setState({ "diskcache": val })
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
            <Container fluid style={{}}>
                <Row className="text-center"><Col><Image src={imgimg} style={{ height: '100px', width: 'auto' }} fluid /></Col></Row>
                <Row className="pt-4">
                    <Col>
                        <FormControlLabel control={
                            <Switch checked={this.state.enabled} color={switchDefaults.color} size={switchDefaults.size} 
                                onChange={() => this.handleSwitch("img/enable", "img/disable", "enabled")} />
                             } label="Enable/Disable" />
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                    <FormControlLabel control={
                        <Switch id="imgmem" checked={this.state.memcache} color={switchDefaults.color} size={switchDefaults.size} 
                            onChange={() => this.handleSwitch("img/enablememcache", "img/disablememcache", "memcache")} />
                        }  label="Enable Memory Cache" />
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                            <Switch id="imgdisk"  checked={this.state.diskcache} color={switchDefaults.color} size={switchDefaults.size} 
                                onChange={() => this.handleSwitch("img/enablediskcache", "img/disablediskcache", "diskcache")} />
                        } label="Enable Disk Cache" />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ImageBoard;
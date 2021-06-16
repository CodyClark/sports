import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { GetStatus, CallMatrix } from '../util';
import { FormControlLabel, Switch } from '@material-ui/core';

import nfllogo from '../logos/nfl-logo.svg';
import mlblogo from '../logos/mlb-logo.svg';
import mlslogo from '../logos/mls-logo.svg';
import nhllogo from '../logos/nhl-logo.svg';
import nbalogo from '../logos/nba-logo.svg';
import ncaamlogo from '../logos/ncaa-logo.svg';

const switchDefaults = {
    color: 'primary',
    size: 'small'
}

class Sport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "enabled": false,
            "hideFavorite": false,
            "stickyFavorite": false,
            "stats": false,
            "scroll": false,
            "statscroll": false,
            "tightscroll": false,
        };
    }
    async componentDidMount() {
        await GetStatus(`${this.props.sport}/status`, (val) => {
            this.setState({
                "enabled": val,
            })
        })
        await GetStatus(`${this.props.sport}/scrollstatus`, (val) => {
            this.setState({
                "scroll": val,
            })
        })
        await GetStatus(`${this.props.sport}/tightscrollstatus`, (val) => {
            this.setState({
                "tightscroll": val,
            })
        })
        await GetStatus(`${this.props.sport}/stats/status`, (val) => {
            this.setState({
                "stats": val,
            })
        })
        await GetStatus(`${this.props.sport}/stats/scrollstatus`, (val) => {
            this.setState({
                "statscroll": val,
            })
        })
        await GetStatus(`${this.props.sport}/favoritescorestatus`, (val) => {
            this.setState({
                "hideFavorite": val,
            })
        })
        await GetStatus(`${this.props.sport}/favoritestickystatus`, (val) => {
            this.setState({
                "stickyFavorite": val,
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
        if (this.props.sport === "nhl") {
            return nhllogo
        } else if (this.props.sport === "ncaam") {
            return ncaamlogo
        } else if (this.props.sport === "nba") {
            return nbalogo
        } else if (this.props.sport === "nfl") {
            return nfllogo
        } else if (this.props.sport === "mls") {
            return mlslogo
        } else {
            return mlblogo
        }
    }
    render() {
        return (
            <Container fluid>
                <Row className="text-center">
                    <Col>
                        <Image src={this.logosrc()} style={{ height: '125px', width: 'auto' }} fluid />
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col>
                        <FormControlLabel control={
                            <Switch id={this.props.sport + "enabler"} checked={this.state.enabled} color={switchDefaults.color} size={switchDefaults.size} 
                            onChange={() => this.handleSwitch(`${this.props.sport}/enable`, `${this.props.sport}/disable`, "enabled")} />
                            } label="Enable/Disable"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                           <Switch id={this.props.sport + "scroller"} checked={this.state.scroll} color={switchDefaults.color} size={switchDefaults.size} 
                             onChange={() => this.handleSwitch(`${this.props.sport}/scrollon`, `${this.props.sport}/scrolloff`, "scroll")} />
                         } label="Scroll Mode" />
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                            <Switch id={this.props.sport + "tightscroller"} checked={this.state.tightscroll} color={switchDefaults.color} size={switchDefaults.size} 
                                onChange={() => this.handleSwitch(`${this.props.sport}/tightscrollon`, `${this.props.sport}/tightscrolloff`, "tightscroll")} />
                            } label="Back-to-back Scroll Mode"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                            <Switch id={this.props.sport + "stats"}  checked={this.state.stats} color={switchDefaults.color} size={switchDefaults.size} 
                                onChange={() => this.handleSwitch(`${this.props.sport}/stats/enable`, `${this.props.sport}/stats/disable`, "stats")} />
                            } label="Stats" />
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                            <Switch id={this.props.sports + "statscroll"} label="Stats Scroll Mode" checked={this.state.statscroll} color={switchDefaults.color} size={switchDefaults.size} 
                               onChange={() => this.handleSwitch(`${this.props.sport}/stats/scrollon`, `${this.props.sport}/stats/scrolloff`, "statscroll")} />
                        } label="Enable/Disable"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                          <Switch id={this.props.sport + "favscore"}  checked={this.state.hideFavorite} color={switchDefaults.color} size={switchDefaults.size} 
                            onChange={() => this.handleSwitch(`${this.props.sport}/hidefavoritescore`, `${this.props.sport}/showfavoritescore`, "hideFavorite")} />
                        } label="Hide Favorite Scores"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <FormControlLabel control={
                            <Switch id={this.props.sport + "favstick"}  checked={this.state.stickyFavorite} color={switchDefaults.color} size={switchDefaults.size} 
                               onChange={() => this.handleSwitch(`${this.props.sport}/favoritesticky`, `${this.props.sport}/favoriteunstick`, "stickyFavorite")} />
                            } label="Stick Favorite Live Games"/>
                        </Col>
                </Row>
            </Container>
        )
    }
}

export default Sport;
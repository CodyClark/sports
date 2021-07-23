import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Home from './Home.js';
import Sport from './boards/Sport.js';
import ImageBoard from './boards/ImageBoard.js';
import Clock from './boards/Clock.js';
import Sys from './boards/Sys.js';
import Pga from './boards/Pga.js';

const styles = {
    row: {
        marginTop: 10
    },
    col: {
        paddingTop: '20px'
    }
}

const card_border = "18rem"

const sports = ["nhl", "mlb", "ncaam", "nfl", "nba", "mls"].map((sport) =>
    <Col lg="auto" style={styles.col}>
        <Card style={{ width: { card_border } }}>
            <Sport sport={sport} id={sport} key={sport} />
        </Card>
    </Col>
);

class All extends React.Component {
    render() {
        return (
            <Container fluid="xl" >
                <Row className="justify-content-md-space-between" sm={1} lg={2} xl={3} style={styles.row}>
                    <Col lg="auto" style={styles.col}>
                        <Card style={{ width: { card_border } }}>
                            <Home />
                        </Card>
                    </Col>

                    {sports}
                    
                    <Col lg="auto" style={styles.col}>
                        <Card style={{ width: { card_border } }}>
                            <Pga />
                        </Card>
                    </Col>
                    <Col lg="auto" style={styles.col}>
                        <Card style={{ width: { card_border } }}>
                            <ImageBoard id="imgboard" />
                        </Card>
                    </Col>
                    <Col lg="auto" style={styles.col}>
                        <Card style={{ width: { card_border } }}>
                            <Clock id="clock" />
                        </Card>
                    </Col>
                    <Col lg="auto" style={styles.col}>
                        <Card style={{ width: { card_border } }}>
                            <Sys id="sys" />
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default All;
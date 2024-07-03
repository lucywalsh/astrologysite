import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default function BirthChart(props){
    console.log(props);

    let planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

    let renderPlanets = () => {
        const rows = [];
        for (let i = 0; i < planets.length; i++) {
            rows.push(<tr><td>{planets[i]}</td><td>{props[planets[i]]}</td></tr>);
        }
        return <tbody>{rows}</tbody>;
    }

    return(
        <React.Fragment>
            <Row className="birth-chart-container justify-content-md-center">
                <Col className="big-three">Sun: {props['Sun']}</Col>
                <Col className="big-three">Moon: {props['Moon']}</Col>
                <Col className="big-three">Rising: {props['Rising']}</Col>
            </Row>
            <Row className="birth-chart-container justify-content-md-center">
                <Table className="chart-table" bordered>
                    {renderPlanets()}
                </Table>
            </Row>
        </React.Fragment>
    );
}
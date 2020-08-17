import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";

function HomePage() {
    return (
        <Container id="homepage">
            <input id="link" placeholder="Make your links shorter"></input>
            <button id="submit-button">Convert!</button>
        </Container>
    )
}
export default HomePage;
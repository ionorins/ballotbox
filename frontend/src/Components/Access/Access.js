import '../../App.css';
import React, {useState} from "react";
import Login from "./Login.js";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Signup from "./Signup";
import {Link, useHistory} from "react-router-dom";
import {FiChevronLeft} from "react-icons/fi";
import Button from "react-bootstrap/Button";

const Access = ({setToken}) => {
    const [currentView, setView] = useState(<Login setToken={setToken}/>);
    let history = useHistory();

    if (JSON.parse(localStorage.getItem('loggedIn')) === "true") {
        history.push("/host")
    }

    return (
        <div className="container">
            <Link to="/" className="clickable-link">
                <h1 className="display-3">BallotBox🗳️</h1>
            </Link>
        <Card className="access-card mx-auto my-3">
            <Card.Header style={{borderBottom: "none", backgroundColor: "transparent",}}>
                <Nav variant="tabs" className="tab-bar" defaultActiveKey="#login">
                    <Nav.Item className="custom-nav-tabs mx-1">
                        <Nav.Link className="custom-nav-links" href="#login" onClick={() => setView(<Login />)}>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="custom-nav-tabs mx-1">
                        <Nav.Link className="custom-nav-links" href="#signup" onClick={() => setView(<Signup />)}>Sign Up
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body className="access-card-body">
                { currentView }
            </Card.Body>
            <Card.Footer style={{background: "none",}}>
                <Button className="back-button" onClick={() => history.push("/")}>
                    <FiChevronLeft />
                </Button>
            </Card.Footer>
        </Card>

            <Navbar fixed="bottom">
                <Navbar.Text className="mx-auto navbar-text">
                    DBCampus Project 2021
                </Navbar.Text>
            </Navbar>
        </div>
    )
}
export default Access;

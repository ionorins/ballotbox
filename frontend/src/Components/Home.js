import '../App.css';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Home = ({ roomCode }) => {


    return (
        <div className="container">
            <Navbar fixed="top" className="navbar">
                <Navbar.Text className="mx-auto">
                    {roomCode}
                </Navbar.Text>
            </Navbar>
            <Card className="main-card mx-auto">
                <Card.Header>
                    <Card.Title>Feedback</Card.Title>
                </Card.Header>
                <Card.Body>

                    <Card.Text>
                        fetch 
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Home;
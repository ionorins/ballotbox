import '../../../App.css';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";


const FreeText = () => {

    const [optionForm, setOptionForm] = useState(
        <div>
        <InputGroup className="my-4" size="sm">
            <Form.Control type="text" placeholder="Choice 1"/>
        </InputGroup>
        <InputGroup className="my-4" size="sm">
            <Form.Control type="text" placeholder="Choice 2"/>
        </InputGroup>
        </div>
    );

    const [optionsList, setOptionsList] = useState([1,2]);

    const incrementOptions = () => {
        optionsList.push(optionsList[optionsList.length - 1] + 1);
        setOptionsList(optionsList);
        let temp = optionsList.map((number) =>
            <InputGroup className="my-4" size="sm">
                <Form.Control type="text" placeholder={"Choice "+number}/>
            </InputGroup>
        )
        setOptionForm(temp)
        console.log(optionsList)
    }


    return (
        <Form className="forms mx-auto">
            <h1>Multiple Choice</h1>
            <InputGroup className="my-4" size="lg">
                <Form.Control type="text" placeholder="Question prompt"/>
            </InputGroup>
            {optionForm}
            <InputGroup>
                <Button  onClick={() => incrementOptions()}  size="sm" variant="light">Extra Option</Button>
            </InputGroup>
            <Button variant="primary" type="submit" className="buttons my-2">
                Add
            </Button>
        </Form>
    )
}
export default FreeText;

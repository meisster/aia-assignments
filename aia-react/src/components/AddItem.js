import React, {useState} from "react";
import '../styles/AddItem.scss';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Item from "./Item";
import {useHistory} from "react-router-dom";
import items from "../data/items"

export default function AddItem() {
    const [validated, setValidated] = useState(false);
    const [item, setItem] = useState({
        title: "",
        text: "",
        img: "",
        rating: ""
    });
    const history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            const newId = Math.max(...(items.map(i => i.id))) + 1;
            items.push({...item, id: newId});
            navigateTo(`/collection/${newId}`)
        }
        setValidated(true);
    };

    function navigateTo(path, data) {
        history.push({
            pathname: path,
            state: data
        });
    }

    function onTitleChange(title) {
        setItem(prevState => {
            return {...prevState, title}
        })
    }

    function onRatingChange(rating) {
        setItem(prevState => {
            return {...prevState, rating}
        })
    }

    function onDescriptionChange(description) {
        setItem(prevState => {
            return {...prevState, text: description}
        })
    }

    function onImageChange(img) {
        setItem(prevState => {
            return {...prevState, img}
        })
    }

    return (
        <div className='AddItem'>
            <hr style={{marginBottom: "1rem", width: "70%"}}/>
            <h1>Add a new game</h1>
            <hr style={{marginBottom: "1rem", width: "70%"}}/>

            <div className='form-container'>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='col-md-4'>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="title">
                            <Form.Label>Game's title</Form.Label>
                            <Form.Control
                                onChange={(event) => onTitleChange(event.target.value)}
                                required
                                type="text"
                                placeholder="Game's Title"/>
                            <Form.Control.Feedback type="invalid">Please provide game's title</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                onChange={(event) => onDescriptionChange(event.target.value)}
                                required
                                type="text"
                                placeholder="Description"/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a short description
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                onChange={(event) => onImageChange(event.target.value)}
                                required
                                type="text"
                                placeholder="Image source"/>
                            <Form.Control.Feedback type="invalid">
                                Please provide an image url
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select"
                                          onChange={(event) => onRatingChange(event.target.value)}
                                          required
                                          placeholder="Rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please provide a rating
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div className="form-buttons">
                        <Button variant="success" type="submit">Submit</Button>
                        <Button variant="danger" onClick={() => navigateTo('/collection')}>Cancel</Button>
                    </div>
                </Form>
                <div>
                    <Item className='col-md-4' onItemClick={() => {
                    }}
                          title={item.title} img={item.img} text={item.text}/>
                </div>
            </div>
        </div>
    )
}
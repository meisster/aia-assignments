import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/Item.scss";

export default function Item(props) {
    return (
        <div className={'Item'}
             onClick={() => props.onItemClick({
                 title: props.title,
                 img: props.img,
                 rating: props.rating,
                 id: props.id
             })}>
            <Card bg="dark" style={{width: '18rem'}}>
                <Card.Img variant="top" src={props.img} width={100} height={400}/>
                <Card.Body>
                    <Card.Title style={{textTransform: "uppercase"}}>{props.title}</Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
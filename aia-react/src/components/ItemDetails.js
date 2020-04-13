import React from "react";
import './ItemDetails.scss';
import {useHistory} from "react-router";
import Button from "react-bootstrap/Button";
import items from "../data/items"

export default function ItemDetails(props) {
    const history = useHistory();
    const item = items.find(item => item.id == props.match.params.itemId);

    function navigateTo(path, data) {
        history.push({
            pathname: path,
            state: data
        });
    }

    function deleteItem() {
        const index = items.findIndex(it => it.id == item.id);
        items.splice(index, 1);
        navigateTo('/collection');
    }

    return (
        !!item ?
            <div className={"ItemDetails"}>
                <h1>Game details</h1>
                <h2>{item.title}</h2>
                <h2>Rating: {item.rating}</h2>
                <img src={item.img} alt="image" width={286} height={400}/>
                <div className={'button-container'}>
                    <Button variant={'outline-danger'} onClick={deleteItem}>Delete</Button>
                    <Button variant={'outline-success'} onClick={() => navigateTo('/collection')}>Go to collection</Button>
                </div>
            </div>
            : null
    )
}
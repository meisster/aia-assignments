import React, {useState} from "react";
import './Collection.scss';
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import Item from "./Item";
import items from "../data/items"
import Filter from "./Filter";
import {MdAddCircleOutline} from "react-icons/md";

export default function Collection({match}) {

    const history = useHistory();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");


    function onSearchChanged(search) {
        setSearch(search);
    }

    function onSortChanged(newSort) {
        setSort(newSort);
    }

    function resolveSort(sort) {
        switch (sort) {
            case sortType.NAME_A:
                return (a, b) => a.title > b.title ? 1 : (b.title > a.title) ? -1 : 0;
            case sortType.NAME_Z:
                return (a, b) => a.title < b.title ? 1 : (b.title < a.title) ? -1 : 0;
            case sortType.RATING_H:
                return (a, b) => a.rating < b.rating ? 1 : (b.rating < a.rating) ? -1 : 0;
            case sortType.RATING_L:
                return (a, b) => a.rating > b.rating ? 1 : (b.rating > a.rating) ? -1 : 0;
            default:
                return (a, b) => 0;
        }
    }

    function itemClicked(item) {
        navigateTo(`${match.url}/${item.id}`)
    }

    function navigateTo(path) {
        history.push({
            pathname: path
        });
    }

    return (
        <div className="Collection">
            <h1>This is my games collection</h1>
            <Button variant="outline-secondary" onClick={() => navigateTo('/')}>Go back</Button>
            <Button variant="outline-secondary"
                    style={{width: 150, marginTop: "1rem", borderRadius: 30}}
                    onClick={() => navigateTo(`${match.path}/add`)}><MdAddCircleOutline/></Button>
            <Filter onSearchChange={onSearchChanged} onSort={onSortChanged}/>
            <div className="item-container">
                {items.filter(item => item.title.includes(search))
                    .sort(resolveSort(sort))
                    .map(item => {
                        return <Item id={item.id} key={item.id} text={item.text} title={item.title} img={item.img}
                                     rating={item.rating} onItemClick={itemClicked}/>
                    })}
            </div>
        </div>
    )
}
export const sortType = {
    NAME_A: 'name-a',
    NAME_Z: 'name-z',
    RATING_H: 'rating-h',
    RATING_L: 'rating-z'
};
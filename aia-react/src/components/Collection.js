import React, {useState} from "react";
import '../styles/Collection.scss';
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import Item from "./Item";
import items from "../data/items"
import Filter from "./Filter";
import {MdAddCircleOutline, MdKeyboardBackspace} from "react-icons/md";

export default function Collection({match}) {

    const history = useHistory();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");


    function onSearchChanged(query) {
        setSearch(query);
    }

    function onSortChanged(newSort) {
        setSort(newSort);
    }

    function resolveSort(sortBy) {
        switch (sortBy) {
            case sortType.NAME_A:
                return (a, b) => a.title > b.title ? 1 : (b.title > a.title) ? -1 : 0;
            case sortType.NAME_Z:
                return (a, b) => a.title < b.title ? 1 : (b.title < a.title) ? -1 : 0;
            case sortType.RATING_H:
                return (a, b) => a.rating < b.rating ? 1 : (b.rating < a.rating) ? -1 : 0;
            case sortType.RATING_L:
                return (a, b) => a.rating > b.rating ? 1 : (b.rating > a.rating) ? -1 : 0;
            default:
                return () => 0;
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
            <hr style={{width: "55%"}}/>
            <h1>Games collection</h1>
            <hr style={{marginBottom: "2rem", width: "55%"}}/>
            <Button variant="outline-secondary"
                    style={{borderColor: "#f57c00", width: 150, borderRadius: 30}}
                    onClick={() => navigateTo('/')}><MdKeyboardBackspace fill='#f57c00'/></Button>
            <hr style={{marginBottom: "0rem", width: "10%"}}/>
            <Button variant="outline-secondary"
                    style={{borderColor: "#f57c00", width: 150, marginTop: "1rem", borderRadius: 30}}
                    onClick={() => navigateTo(`${match.path}/add`)}><MdAddCircleOutline fill='#f57c00'/></Button>
            <hr style={{marginBottom: "2rem", marginTop: "2rem", width: "55%"}}/>
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
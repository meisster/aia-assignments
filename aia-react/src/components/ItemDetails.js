import React, {useState} from "react";
import '../styles/ItemDetails.scss';
import {useHistory} from "react-router";
import Button from "react-bootstrap/Button";
import items from "../data/items"
import {MdStar, MdStarBorder} from "react-icons/md";
import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";

export default function ItemDetails(props) {
    const history = useHistory();
    const [item, setItem] = useState(items.find(it => it.id == props.match.params.itemId));

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

    function modifyRating(delta) {
        let rating = item.rating + delta;
        rating = rating > 10 ? 10 : rating < 0 ? 0 : rating;
        setItem(prevState => {
            return {...prevState, rating: rating}
        });
        const index = items.findIndex(it => it.id == item.id);
        items.splice(index, 1, {...item, rating: rating});
    }

    function stars(count) {
        let table = [];

        for (let i = 0; i < count; i++) {
            table.push(<MdStar fill='#DAA520'/>)
        }
        for (let i = count; i < 10; i++) {
            table.push(<MdStarBorder/>);
        }
        return table
    }

    return (
        !!item ?
            <div className={"ItemDetails"}>
                <div className="item-details-wrapper">
                    <h1>{item.title}</h1>
                    <hr style={{marginBottom: "1rem", width: "70%"}}/>
                    <h4>
                        <Button variant="outline-secondary"
                                className='no-border'
                                onClick={() => modifyRating(-1)}><FiMinusCircle stroke='black' fill='red'/></Button>
                        {stars(item.rating)}
                        <Button variant="outline-secondary"
                                className='no-border'
                                onClick={() => modifyRating(1)}><FiPlusCircle stroke='black' fill='green'/></Button>
                    </h4>
                    <hr style={{marginBottom: "1rem", width: "70%"}}/>
                    <img src={item.img} width={286} height={400} alt=''/>
                    <hr style={{marginBottom: "1rem", width: "70%"}}/>
                    <h4>{item.text}</h4>
                    <hr style={{marginBottom: "1rem", width: "70%"}}/>

                    <div className={'button-container'}>
                        <Button variant={'outline-danger'} onClick={deleteItem}>Delete</Button>
                        <Button variant={'outline-success'} onClick={() => navigateTo('/collection')}>
                            Go to collection
                        </Button>
                    </div>
                </div>
            </div>
            : null
    )
}
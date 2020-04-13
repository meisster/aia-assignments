import React from 'react';
import Welcome from "./components/Welcome";
import {animated, useTransition} from "react-spring";
import {Route, Switch, useLocation} from 'react-router'
import Collection from "./components/Collection";
import ItemDetails from "./components/ItemDetails";
import AddItem from "./components/AddItem";

export default function App() {
    const location = useLocation();

    const transitions = useTransition(location, location => location.pathname, {
        from: {position: 'absolute', opacity: 1, transform: 'translate3d(0,100%,0)'},
        enter: {opacity: 1, transform: 'translate3d(0,0,0)'},
        leave: {opacity: 1, transform: 'translate3d(0,-100%,0)'},
    });

    return transitions.map(({item: location, props, key}) => (
        <animated.div key={key} style={props}>
            <Switch location={location}>
                <Route path="/" exact component={Welcome}/>
                <Route path="/collection" exact component={Collection}/>
                <Route path="/collection/add" exact component={AddItem}/>
                <Route path="/collection/:itemId" component={ItemDetails}/>
            </Switch>
        </animated.div>
    ));
}

import disc from "../assets/compact-disc.svg";
import React from "react";
import Button from "react-bootstrap/Button";
import './Welcome.scss';
import {Link} from "react-router-dom";


export default function Welcome() {

    return (
        <div className='Welcome'>
            <header className='Welcome-header'>
                <h1>Welcome to my games collection</h1>
                <div>
                    <img src={disc}
                         className='Welcome-logo'
                         alt='logo'/>
                </div>
                <Link to="/collection">
                    <Button variant="outline-primary">Enter games collection</Button>
                </Link>

            </header>
        </div>
    );
}
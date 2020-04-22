import React from "react";
import "../styles/Filter.scss";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import {sortType} from "./Collection";


export default function Filter(props) {
    return (
        <div className="Filter">
            <InputGroup className="input-group-custom">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    className="dropdown-button"
                    title="Sort"
                    id="input-group-dropdown-1">
                    <Dropdown.Item href="#" onClick={() => props.onSort(sortType.NAME_A.toString())}>Name A-Z</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => props.onSort(sortType.NAME_Z)}>Name Z-A</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#" onClick={() => props.onSort(sortType.RATING_H)}>Rating: from highest</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => props.onSort(sortType.RATING_L)}>Rating: from lowest</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1"
                             onChange={(event) => {
                                 props.onSearchChange(event.target.value)
                             }}
                             placeholder="Search..."/>
            </InputGroup>
        </div>
    )
}
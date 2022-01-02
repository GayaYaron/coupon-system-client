import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/general.css";

export function MainMenuItem(props) {
    const [searchValue, setSearchValue] = useState("");

    const mapDropItem = () => {
        return props.dropItemList.map((item, index) => {
            return (<li key={index}><Link className="dropdown-item" to={item.address}>
                {item.text}</Link></li>)
        });
    }

    const messageOrList = () => {
        if (Array.isArray(props.dropItemList)) {
            return (
                <ul className="dropdown-content" aria-labelledby={props.itemId}>
                    {mapDropItem()}
                </ul>
            );
        } else {
            return (
                <ul className="dropdown-content" aria-labelledby={props.itemId}>
                    <p className="dropdown-item">{props.dropItemList}</p>
                </ul>
            )
        }
    }

    const makeDropdown = () => {
        return (
            <div className="dropdown">
                <Link className="nav-link" to={props.address} id={props.itemId}>
                    {props.text} <i className="fas fa-caret-down"></i>
                </Link>
                {messageOrList()}
            </div>
        );
    };

    const searchInputType = () => {
        return ((props.searchType) ? (props.searchType) : "search");
    };

    const resetSearch = (event) => {
        props.onSubmit(event);
        setSearchValue("");
    }

    const setValue = (event) => {
        setSearchValue(event.target.value);
    }

    switch (props.type) {
        case "dropdown":
            return (makeDropdown());
        case "searchbar":
            return (
                <form className="d-flex flex-row my-2 my-lg-0 mx-2" onSubmit={resetSearch}>
                    <input className="form-control" type={searchInputType()} placeholder={props.placeholder}
                        aria-label={props.description} name={props.name} required={true} value={searchValue} onChange={setValue} />
                    <button type="submit" className="btn btn-secondary my-2 my-sm-0">Search</button>
                </form>
            );
        default:
            return (
                <Link className="nav-link" to={props.address}>{props.text} </Link>
            );
    };
};
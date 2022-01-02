import { useState } from "react";
import { LoginButton } from "./LoginButton";

export function MainMenu(props) {
    const [show, setShow] = useState(-1);

    const hamburgerContentClass = () => {
        const base = "collapse navbar-collapse ";
        return show === (-1) ? (base + "d-none") : (base + "d-block");
    }

    const turnItemsToList = () => {
        return (
            props.items.map((item, index) => <li key={index} className="nav-item mx-2">{item}</li>)
        );
    }

    const flipShow = () => {
        setShow(show*(-1));
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light sticky-top green-back">
            <button className="navbar-toggler" onClick={flipShow} type="button" data-bs-toggle="collapse"
                    data-bs-target="#company-menu-collapse" aria-controls="company-menu-collapse" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className={hamburgerContentClass()} id="company-menu-collapse">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0 align-items-center">
                    {turnItemsToList()}
                </ul>
                <LoginButton pathBack="../" btnClass="btn btn-secondary ms-auto mx-2" />
            </div>
        </nav>
    );

}

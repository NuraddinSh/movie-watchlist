import React from "react";

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-bottom-dark" data-bs-theme="dark" role="navigation">
            {props.children}
        </nav>
    )
}
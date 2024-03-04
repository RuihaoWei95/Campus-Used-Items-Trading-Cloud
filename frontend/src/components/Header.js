import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link id="brand_name" className="navbar-brand" to="/">Home</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link id="hover" className="nav-link active" aria-current="page" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link id="hover" className="nav-link active" aria-current="page" to="/Item">MyItem</Link>
                        </li>
                        <li className="nav-item">
                        <Link id="cart" className="nav-link active" aria-current="page" to="/Cart">MyCart🛒</Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
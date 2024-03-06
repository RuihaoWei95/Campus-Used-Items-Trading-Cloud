import React, { useEffect, useState }from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 


function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const cookieExists = () => {
        return Cookies.get("userId") !== undefined;
    };

    useEffect(() => {
        setIsLoggedIn(cookieExists());
        
        // Setup an interval to check for cookie existence
        const intervalId = setInterval(() => {
            setIsLoggedIn(cookieExists());
        }, 1000); // Check every 1000 milliseconds (1 second)

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        Cookies.remove("userId");
        setIsLoggedIn(false); // Update the login state immediately
        alert("Logout successfully!");
        navigate('/login'); // Redirect to login page
    };
    
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link id="brand_name" className="navbar-brand" to="/home">Home</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!isLoggedIn && (
                                    <li className="nav-item">
                                        <Link id="hover" className="nav-link active" aria-current="page" to="/login">Login</Link>
                                    </li>
                        )}
                        {isLoggedIn && (<li className="nav-item">
                        <div id="hover" className="nav-link active" aria-current="page" onClick={handleLogout}>Logout</div>
                        </li>)}
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
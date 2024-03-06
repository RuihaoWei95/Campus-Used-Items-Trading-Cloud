import React from "react";

function Footer(){
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>
                Cloud Computing Group Project<span>💗</span>SCU, copyright <span>©️</span> {currentYear}
            </p>
        </footer>
    );
}

export default Footer;
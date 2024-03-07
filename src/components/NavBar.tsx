import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <nav>
            <div>
                <Link to="/">
                    <img src="logo.png" alt="Logo" />
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;

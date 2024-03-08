import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <nav>
            <div className="flex items-center p-4">
                <Link to="/">
                    <img src="src/assets/react.svg" alt="Logo" />
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;

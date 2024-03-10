import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const NavBar: React.FC = () => {
    return (
        <nav className="bg-background/95 backdrop-blur">
            <div className="flex justify-between">
                <Link to="/">
                    <h2 className="text-xl font-bold m-4">EMAIL FINDER</h2>
                </Link>
                <div className="flex items-center m-4">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

function NavBar() {
    return (
        <nav className="bg-background">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <h2 className="text-xl font-bold m-4">EMAIL FINDER</h2>
                </Link>
                <div className="flex items-center justify-center">
                    <Link to="/about">
                        <h3 className="">ABOUT</h3>
                    </Link>
                    <div className="m-4">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

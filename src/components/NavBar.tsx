import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

function NavBar() {
    return (
        <nav className="bg-background border-b">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <h2 className="text-2xl font-bold md:m-4 m-2 font-mono">
                        EMAIL FINDER
                    </h2>
                </Link>
                <div className="flex items-center justify-center">
                    <Link to="/about">
                        <h3 className="font-mono">ABOUT</h3>
                    </Link>
                    <div className="md:m-4 m-2">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/helloworld";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

function App() {
    return (
        <>
            <Router>
                <NavBar />
            </Router>
            <div>
                <Header />
            </div>

            <div>
                <SearchBar />
            </div>
        </>
    );
}

export default App;

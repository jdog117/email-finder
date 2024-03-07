import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom"; // using hashrouter so that this can be deployed to a static CDN
import Home from "@/pages/Home";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";

export function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

// makes testing easier
export function WrappedApp() {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    );
}

import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom"; // using hashrouter so that this can be deployed to a static CDN
import Home from "@/pages/Home";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import About from "./pages/About";

export function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </ThemeProvider>
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

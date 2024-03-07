import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // app is wrappedapp because it is default export
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

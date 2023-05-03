import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.css";
import "./normalize.css";
import App from "./components/app/app";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./services/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);

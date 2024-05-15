import React from "react";
import css from "./home-view.module.css";
import { useNavigate } from "react-router-dom";

const AppHomePage = () => {
    const navigate = useNavigate(); // our navigator
    // navigate("/login"); // reroute to login page which doesn't yet exist (just an example)
    return (
        <main className={css.main}>
            HOME PAGE
        </main>
    );
};

export default AppHomePage;
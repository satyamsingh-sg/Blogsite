import React, { useState } from "react";
import Header from "../components/header/Header";
import classes from "./Layout.module.css";
import Navigation from "../components/navigation/Navigation";
import { Outlet, useLocation } from "react-router-dom";
const SearchResults = () => {
    const [nav, setNav] = useState(false);
    const navHandler = () => {
        nav ? setNav(false) : setNav(true);
    };
    const location = useLocation(); //QUery parameters
    const params = new URLSearchParams(location.search);
    return (
        <>
            {!nav && <Header nav={navHandler} />}
            {nav && <Navigation nav={navHandler} />}
            {!nav && (
                <>
                    <div className={"container-fluid " + classes.content}>
                        <div className="row">
                            <div
                                className={
                                    "col-md-2 shadow-lg " +
                                    classes.leftpane +
                                    " " +
                                    classes.results
                                }
                            >
                                <div>
                                    <b>Results for:</b>
                                </div>
                                <b>
                                    {params.get("query")
                                        ? params.get("query")
                                        : params.get("genre")}
                                </b>
                            </div>
                            <div className={"col-md-7 " + classes.middlepane}>
                                {<Outlet />}
                            </div>
                            <div
                                className={
                                    "col-md-3 shadow-lg " + classes.rightpane
                                }
                            ></div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SearchResults;

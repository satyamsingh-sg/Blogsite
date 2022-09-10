import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import Profile from "../components/NewProfile/Profile";
import RestrictedAccess from "./RestrictedAccess";

const Layout = (props) => {
    const [nav, setNav] = useState(false); //State for the nav
    const navHandler = () => {
        //Nav handler
        nav ? setNav(false) : setNav(true);
    };
    const authStatus = useSelector((state) => state.auth);
    const params = useParams();

    // This is the uid extracted from the url via routing

    // This is the uid of the current user
    const mainVarient = {
        hidden: {
            opacity: 0,
            x: "100vw",
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        exit: {
            x: "100vw",
            transition: {
                ease: "easeInOut",
            },
        },
    };

    return authStatus.isAuthenticated ? (
        <>
            {!nav && <Header nav={navHandler} />}
            {nav && <Navigation nav={navHandler} />}
            {!nav && (
                <motion.div
                    variants={mainVarient}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="container-fluid"
                >
                    <div className="row">
                        <div className="col-md-3">
                            <Profile uid={params.uid} />
                        </div>
                        <div className="col-md-9">
                            <Outlet />
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    ) : (
        <RestrictedAccess />
    );
};

export default Layout;

import React from "react";
import classes from "./Left.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Left = (props) => {
    const authStatus = useSelector((state) => state.auth); //Acceessing the user's data
    const path = authStatus.isAuthenticated
        ? "forms/post"
        : "/auth?code=signin&main=true"; // Conditional form path
    return (
        <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 2, bounce: 0.4 }}
        >
            <div className={classes.header}>
                <button
                    type="button"
                    className={
                        "btn btn-primary shadow-none " + classes.menubutton
                    }
                    onClick={props.nav}
                >
                    <MenuIcon sx={{ color: "#333333", fontSize: "2em" }} />
                </button>
            </div>
            <div id="seperator" style={{ height: "10em" }}></div>
            <div className={"container " + classes.content}>
                <h1>The Blogsite</h1>
                <div id="seperator" style={{ height: "2em" }}></div>
                <p>
                    Creativity doesn't wait for that perfect moment. Publish
                    your passions, your own way.
                </p>
                <Link
                    to={path}
                    className={
                        "btn btn-primary shadow-none " + classes.postbutton
                    }
                >
                    Publish your first post
                </Link>
            </div>
        </motion.div>
    );
};

export default Left;

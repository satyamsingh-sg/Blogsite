import React, { useState } from "react";
import classes from "./Authentication.module.css";
import LoadingSpinner from "./LoadingSpinner";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const Authentication = () => {
    // Main page for authentication
    const location = useLocation(); //Location to track the type of signin
    const query = new URLSearchParams(location.search);
    const [submitted, setSubmitted] = useState(false);

    // Css properties
    const mainVarient =
        query.get("main") === "true"
            ? {
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
              }
            : {};

    return (
        <motion.div
            variants={mainVarient}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container-fluid"
        >
            <div className="row">
                <div
                    className={
                        "col-md-6 align-items-center d-flex " + classes.signin
                    }
                >
                    <Signin
                        display={query.get("code") === "signin"}
                        onSubmit={setSubmitted}
                    />
                </div>
                <div
                    className={
                        "col-md-6 align-items-center d-flex " + classes.signup
                    }
                >
                    <Signup
                        display={query.get("code") === "signup"}
                        onSubmit={setSubmitted}
                    />
                </div>
                {submitted && <LoadingSpinner />}
            </div>
        </motion.div>
    );
};

export default Authentication;

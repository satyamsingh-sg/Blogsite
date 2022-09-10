import { motion } from "framer-motion";
import React from "react";
import { Outlet } from "react-router-dom";

const FormLayout = () => {
    // Just a sample layout file
    const mainVarient = {
        hidden: {
            opacity: 0,
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
    return (
        <>
            <motion.div
                variants={mainVarient}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={"container-fluid"}
                style={{ height: "100vh", backgroundColor: "#05386b" }}
            >
                <div className="row ">
                    <div className="col-md-2"></div>
                    {<Outlet />}
                    <div className="col-md-2"></div>
                </div>
            </motion.div>
        </>
    );
};

export default FormLayout;

import {
    Facebook,
    GitHub,
    Instagram,
    KeyboardArrowUp,
    Twitter,
    WhatsApp,
    YouTube,
} from "@mui/icons-material";
import React from "react";
import classes from "./Footer.module.css";

// Complete static file with no state management
const Footer = () => {
    return (
        <>
            <div className={"container-fluid " + classes.upstream}>
                <h2>The Blogsite</h2>
                <button className={"btn shadow-none " + classes.upbutton}>
                    <KeyboardArrowUp
                        sx={{
                            fontSize: "2em",
                            padding: "0",
                            marginTop: "-0.25em",
                        }}
                    />
                </button>
            </div>
            <div className={"container-fluid " + classes.content}>
                <div className={"container-fluid " + classes.line1}>
                    <div className={"container-fluid " + classes.links}>
                        <a href="w">Terms of Service</a>
                        <a href="w">Privacy</a>
                        <a href="w">Content Policy</a>
                        <a href="w">Help Center</a>
                    </div>
                    <button className={"btn shadow-none " + classes.support}>
                        Support us
                    </button>
                </div>
                <div className={"container-fluid " + classes.line2}>
                    <div className={"container-fluid " + classes.copyrights}>
                        <h5>Copyrights @FSD group 8 The blogsites</h5>
                    </div>
                    <div className={classes.socialIcons}>
                        <Instagram />
                        <Facebook />
                        <Twitter />
                        <WhatsApp />
                        <YouTube />
                        <GitHub />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;

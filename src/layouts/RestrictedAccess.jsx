import { PersonOffOutlined } from "@mui/icons-material";
import React from "react";

const RestrictedAccess = () => {
    // Template
    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <PersonOffOutlined sx={{ fontSize: "10em", margin: "0.2em" }} />
            <h1>Access Restricted</h1>
        </div>
    );
};

export default RestrictedAccess;

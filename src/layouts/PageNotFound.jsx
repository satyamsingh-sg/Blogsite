import { ErrorOutline } from "@mui/icons-material";
import React from "react";

const PageNotFound = () => {
    // Page not found
    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <ErrorOutline sx={{ fontSize: "10em", margin: "0.2em" }} />
            <h1>Page not found</h1>
        </div>
    );
};

export default PageNotFound;

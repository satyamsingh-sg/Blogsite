import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingSpinner = () => {
    return (
        <div
            className="container-fluid d-flex justify-content-center align-content-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                height: "100vh",
                position: "fixed",
            }}
        >
            <CircularProgress
                sx={{
                    color: "#5cdb95",
                    margin: "auto 0",
                }}
            />
        </div>
    );
};

export default LoadingSpinner;

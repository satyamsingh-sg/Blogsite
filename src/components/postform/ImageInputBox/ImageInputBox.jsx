import { Delete } from "@mui/icons-material";
import React, { useState } from "react";
import classes from "./ImageInputBox.module.css";

const ImageInputBox = (props) => {
    // Custom input box for image
    const [preview, setPreview] = useState(""); //State for the previw of the image
    return (
        <div className="d-flex align-items-center mb-3">
            <div
                className={"container " + classes.banner}
                style={{
                    backgroundImage: `url(${preview})`,
                    height: `${props.height}`,
                }}
            >
                <label style={{ fontWeight: "bold" }} htmlFor="bannerImage">
                    {props.inputname}
                </label>
                <label
                    className={"btn btn-primary " + classes.fileinput}
                    style={{
                        border: "2px solid",
                        borderColor: preview ? "" : "red",
                    }}
                >
                    <input
                        type="file"
                        id="bannerImage"
                        accept="images/*"
                        onChange={(event) => {
                            setPreview("https://picsum.photos/200");
                        }}
                    />
                    Drop image
                </label>
            </div>
            {props.isAdded && (
                <button
                    className={"btn shadow-none"}
                    style={{ paddingRight: 0 }}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onDelete(props.id);
                    }}
                >
                    <Delete sx={{ color: "red" }} />
                </button>
            )}
        </div>
    );
};

export default ImageInputBox;

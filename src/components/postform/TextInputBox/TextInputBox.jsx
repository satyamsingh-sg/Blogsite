import { Delete } from "@mui/icons-material";
import React, { useState } from "react";
import classes from "./TextInputBox.module.css";

const TextInputBox = (props) => {
    // Custom for the tetxt input box
    const [length, setLength] = useState(0); //State for the length of the text entered
    return (
        <div className="d-flex align-items-center mb-3">
            <div className={"form-floating flex-grow-1"}>
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: `${props.height}` }}
                    onChange={(event) => {
                        props.isAdded
                            ? props.onChange(props.id, event.target.value)
                            : props.onChange(event.target.value);
                        setLength(event.target.value.length);
                    }}
                    maxLength={props.maxLength}
                    required
                ></textarea>
                <label htmlFor="floatingTextarea">{props.inputname}</label>
                <p htmlFor="length" className={classes.length}>
                    {length}/{props.maxLength}
                </p>
            </div>
            {props.isAdded && (
                <button
                    className={"btn shadow-none"}
                    style={{ paddingRight: 0 }}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onDelete(props.id); //Deleting the input box appropriately
                    }}
                >
                    <Delete sx={{ color: "red" }} />
                </button>
            )}
        </div>
    );
};

export default TextInputBox;

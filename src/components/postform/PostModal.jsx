import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";

const PostModal = (props) => {
    // Model to select the type of input box
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Choose the type of element
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div
                        className="modal-body"
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={(event) => {
                                event.preventDefault();
                                props.handler("image");
                            }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <ImageIcon /> Image
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={(event) => {
                                event.preventDefault();
                                props.handler("text");
                            }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <TextFieldsIcon /> Text
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;

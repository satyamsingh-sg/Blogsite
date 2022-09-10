import React from "react";
import { Modal } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
//Url copy block
const Copyurl = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ fontSize: "1.2em" }}
                >
                    Copy Url
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group input-group-lg d-flex align-items-center">
                    <input
                        type="text"
                        style={{ fontSize: "1em" }}
                        className="form-control"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={props.url}
                    />
                    {/* Url Click Button  */}
                    <CopyToClipboard text={props.url}>
                        <button
                            className="btn btn-primary"
                            style={{ fontSize: "1em", height: "3.2em" }}
                            type="button"
                            id="button-addon2"
                        >
                            Copy URL
                        </button>
                    </CopyToClipboard>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Copyurl;

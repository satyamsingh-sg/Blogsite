import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "@mui/material";
import ModalBody from "./ModalBody";
import { Edit } from "@mui/icons-material";

const ModalButton = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Link
                className="btn btn-primary d-flex"
                onClick={handleShow}
                style={{
                    width: "6.5em",
                    fontWeight: "600",
                    backgroundColor: "#5cdb95",
                    color: "#05386b",
                }}
            >
                <Edit sx={{ mr: "0.2em" }} /> Create
            </Link>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select the one below</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalBody />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalButton;

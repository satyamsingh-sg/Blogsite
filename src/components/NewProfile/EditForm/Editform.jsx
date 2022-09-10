import { Box } from "@mui/material";
import { useState } from "react";
import classes from "./form.module.css";
import InputTag from "./InputTag";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const Editform = (props) => {
    //props are form

    const [firstName, setFirstName] = useState(props.userDetails.firstName); //useState for firstname of the user
    const [lastName, setLastName] = useState(props.userDetails.lastName); //useState for lastname of the user
    const [email, setEmail] = useState(props.userDetails.email); //useState for email of the user
    const [bio, setBio] = useState(props.userDetails.bio); //useState for bio of the user
    const [genre, setGenre] = useState(props.userDetails.genres); //useState for genres of the user

    const formsubmitHandler = (e) => {
        //function for submitting the edit form
        e.preventDefault(); //prevents refreshing of the page
        props.setAddform((state) => !state); //closing the edit form when submitted
        props.editHandler(
            // sending the changed data of the user using the props
            firstName,
            lastName,
            email,
            bio,
            genre
        );
    };

    const closeForm = () => {
        //function used for closing the form using close button
        props.setAddform((state) => !state); //closing the form
    };

    return (
        <motion.div
            initial={{ x: "-50vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.1, type: "spring" }}
        >
            <Box
                sx={{
                    height: "545px",
                    backgroundColor: "white",
                    width: "330px",
                    paddingTop: "0.3em",
                    marginLeft: "0.7em",
                    borderRadius: "0.3em",
                }}
            >
                <form onSubmit={formsubmitHandler}>
                    <div className={classes.formmain}>
                        <button
                            className="btn shadow-none"
                            onClick={closeForm}
                            style={{ marginLeft: "16em" }}
                        >
                            <CloseIcon />
                        </button>
                        <div style={{ marginBottom: "1em" }}>
                            <span style={{ fontSize: "24px" }}>
                                <b>Enter your details</b>
                            </span>
                        </div>
                        <div className="form-group-row">
                            <div className="col-11">
                                <label for="userfname">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userfname"
                                    placeholder="Enter your first name"
                                    defaultValue={props.userDetails.firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    } //Changing the value of the firstname by the user entered value
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group-row">
                            <div className="col-11">
                                <label for="userlname">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userlname"
                                    placeholder="Enter your Last name"
                                    defaultValue={props.userDetails.lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    } //Changing the value of lastname by the user entered value
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group-row">
                            <div className="col-11">
                                <label for="useremail">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="useremail"
                                    placeholder="Enter your email"
                                    defaultValue={props.userDetails.email}
                                    onChange={(e) => setEmail(e.target.value)} //Changing the value of email by the user entered value
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && e.preventDefault();
                                    }}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="form-group-row">
                            <div className="col-11">
                                <InputTag
                                    genre={props.userDetails.genres}
                                    setGenre={setGenre}
                                />
                            </div>
                        </div>

                        <br />
                        <div className="form-group-row">
                            <div className="col-11">
                                <label for="userbio">Enter bio</label>
                                <textarea
                                    className="form-control"
                                    id="userbio"
                                    rows="3"
                                    defaultValue={props.userDetails.bio}
                                    onChange={(e) => setBio(e.target.value)} //Changing the value of bio by the user entered value
                                ></textarea>
                            </div>
                        </div>
                        <br />

                        <button className={classes.customupdatebtn}>
                            <span className={classes.update}>Update</span>
                        </button>
                    </div>
                </form>
            </Box>
        </motion.div>
    );
};

export default Editform;

import * as React from "react";
import { Container, Box } from "@mui/material";
import classes from "./rightp.module.css";
import { Avatar } from "@mui/material";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Rightp = (props) => {
    const navigate = useNavigate();
    const profileData = props.profileData; // importing and saving the profile data
    return (
        <div>
            <div className={classes.containerMD}>
                <Container>
                    <Box
                        sx={{
                            bgcolor: "white",
                            height: "158px",
                            borderRadius: "0.3em",
                        }}
                    >
                        <div className="container-fluid">
                            {" "}
                            {/*This division is to print the user details in a box*/}
                            <div className="row justify-content-end">
                                <div style={{ height: "1em" }}></div>
                            </div>
                            <div className="row justify-content-start">
                                <div
                                    className="col-1"
                                    style={{ marginRight: "4em" }}
                                >
                                    <Avatar
                                        sx={{ width: "74px", height: "73px" }}
                                    />
                                </div>

                                <div className="col-8">
                                    <span className={classes.uname}>
                                        {" "}
                                        <b>
                                            {profileData.firstName}{" "}
                                            {profileData.lastName}
                                        </b>
                                    </span>

                                    <div className="row justify-content-center">
                                        <div className="col-6">
                                            <span>
                                                <Link underline="none">
                                                    {" "}
                                                    <div
                                                        className={
                                                            classes.mainfollowers
                                                        }
                                                    >
                                                        Followers
                                                    </div>
                                                </Link>
                                            </span>
                                        </div>
                                        <div className="col-6">
                                            <span>
                                                <Link underline="none">
                                                    <div
                                                        className={
                                                            classes.mainfollowers
                                                        }
                                                    >
                                                        Following
                                                    </div>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="col-8">
                                            <span
                                                className={
                                                    classes.followercount
                                                }
                                            >
                                                {" "}
                                                <b>
                                                    {profileData.followercount}
                                                </b>
                                            </span>
                                        </div>
                                        <div className="col-4">
                                            <span
                                                className={
                                                    classes.followingcount
                                                }
                                            >
                                                {" "}
                                                <b>
                                                    {profileData.followingcount}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                    {profileData.userId !==
                                        localStorage.getItem("localId") && (
                                        <div className="row justify-content-start">
                                            <div className="col-12">
                                                <Button
                                                    onClick={() => {
                                                        navigate(
                                                            `/profile/${profileData.userId}`
                                                        );
                                                    }}
                                                    variant="contained"
                                                    style={{
                                                        height: "30px",
                                                        width: "100%",
                                                        marginTop: "1em",
                                                        backgroundColor:
                                                            "#05386B",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    Inspect
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Box>
                </Container>
            </div>
            <hr
                style={{
                    color: "#5CDB95",
                    border: "2px",
                    height: "2px",
                    width: "343px",
                }}
            />
        </div>
    );
};

export default Rightp;

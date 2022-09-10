import * as React from "react";
import { Container, Box } from "@mui/material";
import classes from "./rightq.module.css";
import { Avatar } from "@mui/material";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Rightq = (props) => {
    const profileData = props.profileData;
    const navigate = useNavigate();
    const userDetails = props.profileData;

    return (
        <div>
            <div className={classes.containerMD}>
                {" "}
                {/*The users details are printed in this component in the right side of the question details page*/}
                <Container>
                    <Box
                        sx={{
                            bgcolor: "white",
                            height: "158px",
                            borderRadius: "0.3em",
                        }}
                    >
                        <div className="container-fluid">
                            <div className="row justify-content-end">
                                <div
                                    className="col-2"
                                    style={{ height: "em" }}
                                ></div>
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
                                        <b>{props.profileData.firstName}</b>
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
                                                    {userDetails.followercount}
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
                                                    {userDetails.followingcount}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-start">
                                        <div className="col-12">
                                            <span>
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
                                            </span>
                                        </div>
                                    </div>
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

            {/* <div className={classes.containerLD}>
                    <div className={classes.Mcon}>
                    <span style={{color:"white"}}>Recommended</span>
                    </div>
                    <div className={classes.containerSecond}>

                    </div>
                    {num.map((i)=>(
                        <><div className={classes.containerThird} >
                            <div className={classes.recomendedtext}>Just displaying the titles is enough here, but please make sure to show the question mark? </div>
                        </div></>
                    ))}
                </div> */}
        </div>
    );
};

export default Rightq;

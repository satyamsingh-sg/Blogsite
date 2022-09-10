import classes from "./newprofile.module.css";
import Avatar from "@mui/material/Avatar";
import { Container, Box, Chip } from "@mui/material";
import { Link } from "@mui/material";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import Editform from "./EditForm/Editform";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profile";
import { useEffect } from "react";
import Members from "./Members/Members";
import { motion } from "framer-motion";
import { sendOtherProfileData } from "../../store/profile-actions";
import { fetchOtherProfileData } from "../../store/profile-actions";
import LoadingSpinner from "../auth/LoadingSpinner";
const Profile = (props) => {
    const [submit, setSubmit] = useState(false);
    const [otherProfileData, setOtherProfileData] = useState({}); //setting usestate for other users profile
    const authStatus = useSelector((state) => state.auth);
    const userInfo = useSelector((state) => state.profile);
    const [addform, setAddform] = useState(false);
    const [memtab, setmemTab] = useState(false);
    const dispatch = useDispatch();
    const isFollowing = (list, id) => {
        // checking the id of the users who are following
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return true;
            }
        }
        return false;
    };
    const [followStatus, setfollowStatus] = useState(
        isFollowing(userInfo.followingList, props.uid)
    );
    const [curUser, setCurUser] = useState(true); //setting current user to true

    const userDetails = {
        //current or logined user userDetails
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        bio: userInfo.bio,
        genres: userInfo.genres,
        followingList: userInfo.followingList,
        followersList: userInfo.followersList,
        postIds: userInfo.postIds,
        questionIds: userInfo.questionIds,
    };

    const followCount = userDetails.followersList.length; //followcount of the current user

    const followingCount = userDetails.followingList.length; //following count of the current

    const editHandler = (firstName, lastName, email, bio, genres) => {
        //editHandler for updating the user details using edit form
        dispatch(
            //sending updated user details to the store
            profileActions.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                bio: bio,
                genres: genres,
                followersList: userDetails.followersList,
                followingList: userDetails.followingList,
                postIds: userDetails.postIds,
                questionIds: userDetails.questionIds,
            })
        );
    };

    const formHandler = (e) => {
        //form that appears when clicking the edit icon
        setAddform((state) => !state);
    };

    const linkHandler = (e) => {
        // for followers and following tab
        setmemTab((state) => !state);
    };

    const followbuttonHandler = () => {
        if (followStatus === false) {
            setfollowStatus(true);

            dispatch(fetchOtherProfileData(props.uid)).then((res) => {
                //fetching the followed user id
                const newData = {
                    ...userInfo,
                    followingList: [
                        ...userInfo.followingList,
                        { id: props.uid, name: res.firstName },
                    ],
                };
                dispatch(
                    sendOtherProfileData(
                        //sending the id of us to the followed user
                        {
                            ...res,
                            followersList: [
                                ...res.followersList,
                                {
                                    id: authStatus.localId,
                                    name: userInfo.firstName,
                                },
                            ],
                        },
                        props.uid
                    )
                ).then((result) => {
                    if (result === "succes") {
                        dispatch(profileActions.update(newData)); //updating the store
                        var len = otherProfileData.followerCount + 1; //increasing the followers count
                        setOtherProfileData((res) => {
                            //updating the count in the other users profile
                            return { ...res, followerCount: len };
                        });
                    }
                });
            });
        } else {
            //else condition is for unfollowing
            setfollowStatus(false);
            const newList = userInfo.followingList.filter(
                //filtering the user id
                (id) => id.id !== props.uid
            );
            const newData = {
                //updating the user data
                ...userInfo,
                followingList: newList,
            };
            dispatch(fetchOtherProfileData(props.uid)).then((res) => {
                dispatch(
                    sendOtherProfileData(
                        //updating the other users data
                        {
                            ...res,
                            followersList: res.followersList.filter(
                                (id) => id.id !== authStatus.localId
                            ),
                        },
                        props.uid
                    )
                ).then((result) => {
                    if (result === "succes") {
                        dispatch(profileActions.update(newData)); //updating the data in the store
                        var len = otherProfileData.followerCount - 1;
                        setOtherProfileData((res) => {
                            return { ...res, followerCount: len };
                        });
                    }
                });
            });
        }
    };
    useEffect(() => {
        setSubmit(true);
        if (props.uid === authStatus.localId) {
            setSubmit(false);
            return;
        }
        setCurUser(false);
        dispatch(fetchOtherProfileData(props.uid)).then((res) => {
            //getting the details of the other users
            const data = {
                ...res,
                followerCount: res.followersList.length, //getting followers count of the other users
                followingCount: res.followingList.length, //getting following count of the other users
            };

            setOtherProfileData(data); //setting the above obtained data into the otherProfileData variable using useState
            setSubmit(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return submit ? (
        <LoadingSpinner />
    ) : (
        <div className={classes.maincontainer}>
            <div className={classes.containerMd}>
                {!addform && !memtab && (
                    <Container
                        style={{ paddingLeft: "1em", paddingRight: "1em" }}
                        component={motion.div}
                        initial={{ x: "-50vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: 0.1,
                            type: "spring",
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: "white",
                                height: "140px",
                                borderRadius: "0.3em",
                            }}
                        >
                            <div className="container-fluid">
                                <div className="row justify-content-end">
                                    <div className="col-1 p-0">
                                        <div
                                            style={{
                                                marginTop: "0.5em",
                                                marginLeft: "0.2em",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {curUser && ( //for keeping edit icon access to the current user
                                                <Link
                                                    underline="none"
                                                    color="black"
                                                    onClick={formHandler}
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>
                                            )}
                                            {!curUser && (
                                                <div
                                                    style={{ height: "1em" }}
                                                ></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-start">
                                    <div
                                        className="col-3"
                                        style={{
                                            marginRight: "2em",
                                            paddingLeft: "0.3em",
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: "85px",
                                                height: "85px",
                                            }}
                                        />
                                    </div>

                                    <div className="col-7">
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                width: "200px",
                                            }}
                                        >
                                            <b>
                                                {curUser //details of the current user
                                                    ? userDetails.firstName
                                                    : otherProfileData.firstName}{" "}
                                                {curUser //details of the other user
                                                    ? userDetails.lastName
                                                    : otherProfileData.lastName}
                                            </b>
                                        </div>

                                        {curUser ? (
                                            <div className="row justify-content-center">
                                                <div className="col-7">
                                                    <Link
                                                        underline="none"
                                                        onClick={linkHandler}
                                                    >
                                                        <span
                                                            className={
                                                                classes.mainfollowers
                                                            }
                                                        >
                                                            <b>Followers</b>
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="col-5">
                                                    <Link
                                                        underline="none"
                                                        onClick={linkHandler}
                                                    >
                                                        {" "}
                                                        <span
                                                            className={
                                                                classes.mainfollowing
                                                            }
                                                        >
                                                            <b>Following</b>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row justify-content-center">
                                                <div className="col-7">
                                                    <Link underline="none">
                                                        <span
                                                            className={
                                                                classes.mainfollowers
                                                            }
                                                        >
                                                            <b>Followers</b>
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="col-5">
                                                    <Link underline="none">
                                                        {" "}
                                                        <span
                                                            className={
                                                                classes.mainfollowing
                                                            }
                                                        >
                                                            <b>Following</b>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        <div className="row justify-content-end">
                                            <div className="col">
                                                <span
                                                    className={
                                                        classes.followercount
                                                    }
                                                >
                                                    <b>
                                                        {curUser
                                                            ? followCount //followers count of the current user : else followerscount of the other user
                                                            : otherProfileData.followerCount}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <span
                                                    className={
                                                        classes.followingcount
                                                    }
                                                >
                                                    <b>
                                                        {curUser
                                                            ? followingCount //following count of the current user : else followingcount of the other user
                                                            : otherProfileData.followingCount}
                                                    </b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                        <Box
                            sx={{ height: "15px", backgroundColor: "#05386B" }}
                        ></Box>

                        <Box
                            sx={{
                                bgcolor: "white",
                                height: "385px",
                                borderRadius: "0.3em",
                            }}
                        >
                            <div className="row" style={{ marginTop: "0.2em" }}>
                                <span className={classes.genres}>
                                    <h5
                                        style={{
                                            borderBottom: "1px solid #c4c4c4",
                                            width: "14em",
                                            paddingBottom: "0.2em",
                                            fontSize: "1.2em",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Interested Geners
                                    </h5>
                                </span>
                                {userDetails.genres.length !== 0 && (
                                    <div
                                        className="col"
                                        style={{
                                            marginLeft: "1.2em",
                                            height: "60px",
                                        }}
                                    >
                                        <div>
                                            {curUser //genres of the current user
                                                ? userDetails.genres.map(
                                                      (gen) => (
                                                          <Chip
                                                              style={{
                                                                  marginBottom:
                                                                      "0.5em",
                                                                  marginRight:
                                                                      "0.3em",
                                                                  backgroundColor:
                                                                      "#8ee4af",
                                                                  color: "#05386b",
                                                                  fontWeight:
                                                                      "600",
                                                              }}
                                                              label={gen}
                                                          />
                                                      )
                                                  )
                                                : otherProfileData.genres.map(
                                                      (gen) => {
                                                          //genres of the other users
                                                          return (
                                                              <Chip
                                                                  style={{
                                                                      marginBottom:
                                                                          "0.5em",
                                                                      marginRight:
                                                                          "0.3em",
                                                                      backgroundColor:
                                                                          "#8ee4af",
                                                                      color: "#05386b",
                                                                      fontWeight:
                                                                          "600",
                                                                  }}
                                                                  label={gen}
                                                              />
                                                          );
                                                      }
                                                  )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="row" style={{ height: "70px" }}>
                                <span className={classes.email}>
                                    <h5
                                        style={{
                                            borderBottom: "1px solid #c4c4c4",
                                            width: "14em",
                                            paddingBottom: "0.2em",
                                            fontSize: "1.2em",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Email
                                    </h5>
                                </span>
                                {userDetails.email !== "" && (
                                    <div
                                        className="col"
                                        style={{
                                            fontSize: "0.9em",
                                            marginLeft: "1.2em",
                                        }}
                                        //current user email else other users email
                                    >
                                        {curUser
                                            ? userDetails.email
                                            : otherProfileData.email}
                                    </div>
                                )}
                                <br />
                            </div>

                            <div className="row" style={{ marginTop: "0.4em" }}>
                                <span className={classes.bio}>
                                    <h5
                                        style={{
                                            borderBottom: "1px solid #c4c4c4",
                                            width: "14em",
                                            paddingBottom: "0.2em",
                                            fontSize: "1.2em",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Bio
                                    </h5>
                                </span>
                                {userDetails.bio !== "" && (
                                    <div
                                        className="row"
                                        style={{
                                            fontSize: "0.9em",
                                            marginLeft: "1.2em",
                                            overflowY: "scroll",
                                            overflowX: "hidden",
                                            width: "280px",
                                        }}
                                    >
                                        {curUser
                                            ? userDetails.bio
                                            : otherProfileData.bio}
                                    </div>
                                )}

                                <br />
                            </div>
                            {!curUser && (
                                <div
                                    className="row"
                                    style={{ marginTop: "1em", height: "60px" }}
                                >
                                    <div className="col">
                                        <div>
                                            <button
                                                className={
                                                    classes.customfollowbtn
                                                }
                                                onClick={followbuttonHandler}
                                            >
                                                <b>
                                                    {followStatus
                                                        ? "Following"
                                                        : "Follow"}
                                                </b>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Box>
                    </Container>
                )}
                {addform &&
                    curUser && ( //giving access to the edit form only to the current user
                        <Editform
                            setAddform={setAddform}
                            editHandler={editHandler}
                            userDetails={userDetails}
                        />
                    )}
                {!curUser && <div style={{ height: "1em" }}></div>}
                {memtab && ( //for followers and following tab
                    <Members
                        userInfo={otherProfileData}
                        curUser={curUser}
                        setmemTab={setmemTab}
                    />
                )}
                <br />
            </div>
        </div>
    );
};

export default Profile;

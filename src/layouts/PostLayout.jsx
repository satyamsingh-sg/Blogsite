import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header/Header";
import classes from "./Layout.module.css";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navigation/Navigation";
import Rightp from "../components/post_details/leftp/rightp/rightp";
import Leftp from "../components/post_details/leftp/leftp/leftp";
import Middlep from "../components/post_details/leftp/middlep/middlep";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchPostData } from "../store/post-actions";
import {
    fetchOtherProfileData,
    fetchProfileData,
} from "../store/profile-actions";
import { profileActions } from "../store/profile";
import LoadingSpinner from "../components/auth/LoadingSpinner";

const PostLayout = () => {
    const dispatch = useDispatch(); //Dispatch function to update data in the store
    const [nav, setNav] = useState(false); //State for the nav
    const [data, setData] = useState({}); //State for the data
    const [submit, setSubmit] = useState(false); //State for the loading spinner

    const updateRecentActivity = (data, value) => {
        //Updating recent activity locally
        var temp;
        var filtered = data.filter((obj) => obj.id === value.id);
        if (filtered.length !== 0) {
            temp = data.filter((obj) => obj.id !== value.id);
            temp = [value].concat(temp);
            return temp;
        }
        if (data.length >= 10) {
            var limited = [...data];
            limited.pop();
            temp = [value].concat(limited);
            return temp;
        } else {
            temp = [value].concat(data);
            return temp;
        }
    };

    const navHandler = () => {
        // Setting the nav handler
        nav ? setNav(false) : setNav(true);
    };
    const params = useParams(); // Extracting the data from the routing params
    const mainVarient = {
        hidden: {
            opacity: 0,
            x: "100vw",
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        exit: {
            x: "100vw",
            transition: {
                ease: "easeInOut",
            },
        },
    };
    // Useeffects are used here for fetching and sending the data for the post data
    useEffect(() => {
        setSubmit(true);
        dispatch(fetchProfileData(localStorage.getItem("localId"))).then(
            (result) => {
                if (result !== "false") {
                    dispatch(
                        profileActions.update({
                            ...result, //Updating the recent activity
                            recentActivity: updateRecentActivity(
                                result.recentActivity,
                                {
                                    id: params.postID,
                                    type: "post",
                                }
                            ),
                        })
                    );
                }
            }
        );

        // Dispatching the actions
        dispatch(fetchPostData(params.postID)).then((result) => {
            if (result !== null) {
                dispatch(fetchOtherProfileData(result.uid)).then((data) => {
                    //Fetching other profile data for the inspect feature
                    setData({
                        ...data,
                        followercount: data.followersList.length,
                        followingcount: data.followingList.length,
                        userId: result.uid,
                    });
                    setSubmit(false);
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();

    return submit ? (
        <LoadingSpinner />
    ) : (
        <>
            {!nav && <Header nav={navHandler} />}
            {nav && <Navigation nav={navHandler} />}
            {!nav && (
                <motion.div
                    variants={mainVarient}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={"container-fluid " + classes.content}>
                        <div className="row">
                            <div
                                className={
                                    "col-md-2 shadow-lg " + classes.leftpane
                                }
                            >
                                <Leftp
                                    postID={params.postID}
                                    profileData={data}
                                    handler={executeScroll}
                                />
                            </div>
                            <div
                                className={
                                    "col-md-7 shadow-lg " + classes.middlepane
                                }
                            >
                                <Middlep
                                    postID={params.postID}
                                    profileData={data}
                                    theRef={myRef}
                                />
                            </div>
                            <div
                                className={
                                    "col-md-3 shadow-lg " + classes.rightpane
                                }
                            >
                                <Rightp
                                    postID={params.postID}
                                    profileData={data}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Footer />
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default PostLayout;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import classes from "./Layout.module.css";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navigation/Navigation";
import Leftq from "../components/Ques_details/leftq/leftq";
import Rightq from "../components/Ques_details/rightq/rightq";
import Middleq from "../components/Ques_details/middleq/middleq";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchQuestionData } from "../store/question-actions";
import {
    fetchOtherProfileData,
    fetchProfileData,
} from "../store/profile-actions";
import { profileActions } from "../store/profile";
import LoadingSpinner from "../components/auth/LoadingSpinner";

const QuestionLayout = () => {
    const [submit, setSubmit] = useState(false);
    const dispatch = useDispatch();
    const [nav, setNav] = useState(false);
    const [data, setData] = useState({});
    const navHandler = () => {
        nav ? setNav(false) : setNav(true);
    };
    const params = useParams();
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
    const updateRecentActivity = (data, value) => {
        //Function to update the recent activity
        var temp;
        if (data.filter((obj) => obj.id === value.id) !== []) {
            temp = data.filter((obj) => obj.id !== value.id);
            temp = [value].concat(temp);
            return temp;
        }
        if (data.length === 10) {
            temp = data.pop();
            temp = [value].concat(data);
            return temp;
        } else {
            temp = [value].concat(data);
            return temp;
        }
    };

    // Effets to handle the api requests for the question data
    useEffect(() => {
        setSubmit(true);
        dispatch(fetchProfileData(localStorage.getItem("localId"))).then(
            (result) => {
                //Fetching the profile data
                if (result !== "false") {
                    dispatch(
                        profileActions.update({
                            //Dispatching the data
                            ...result,
                            recentActivity: updateRecentActivity(
                                result.recentActivity,
                                {
                                    id: params.threadID,
                                    type: "question",
                                }
                            ),
                        })
                    );
                }
            }
        );
        dispatch(fetchQuestionData(params.threadID)).then((result) => {
            //Fetching the others profile data
            if (result !== null) {
                //Dispatching it
                dispatch(fetchOtherProfileData(result.userId)).then((data) => {
                    setData({
                        ...data,
                        followercount: data.followersList.length,
                        followingcount: data.followingList.length,
                        userId: result.userId,
                    });
                });
                setSubmit(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();
    window.scroll(0, 0);

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
                                <Leftq
                                    questionID={params.threadID}
                                    handler={executeScroll}
                                />
                            </div>
                            <div
                                className={
                                    "col-md-7 shadow-lg " + classes.middlepane
                                }
                            >
                                <Middleq
                                    questionID={params.threadID}
                                    profileData={data}
                                    theRef={myRef}
                                />
                            </div>
                            <div
                                className={
                                    "col-md-3 shadow-lg " + classes.rightpane
                                }
                            >
                                <Rightq
                                    questionID={params.threadID}
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

export default QuestionLayout;

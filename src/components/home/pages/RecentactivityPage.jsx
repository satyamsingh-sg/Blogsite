import React, { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import QuestionCard from "../cards/QuestionCard";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { fetchActivity } from "../../../store/activity-actions";
import { CircularProgress } from "@mui/material";

const RecentActivityPage = () => {
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
            x: "-100vw",
            transition: {
                ease: "easeInOut",
            },
        },
    };

    const profileData = useSelector((state) => state.profile);
    const [status, setStatus] = useState(false);
    const [recents, setRecents] = useState([]);
    useEffect(() => {
        setStatus(true);
        fetchActivity(profileData.recentActivity).then((result) => {
            setRecents(result);
            setStatus(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return status ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}
        >
            <CircularProgress sx={{ color: "#5cdb95" }} />
        </div>
    ) : (
        <motion.div
            variants={mainVarient}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {recents.map((recent, index) => {
                return recent !== null && recent.data !== null ? (
                    recent.type === "post" ? (
                        <PostCard
                            id={recent.data.postId}
                            key={index}
                            banner={recent.data.imageUrl}
                            title={recent.data.postTitle}
                            description={recent.data.postSummary}
                            likes={recent.data.likes}
                            author={recent.data.author}
                            publishedDate={recent.data.publishedDate}
                            userId={recent.data.uid}
                            comments={recent.data.comments}
                        />
                    ) : (
                        <QuestionCard
                            key={recent.data.questionId}
                            id={recent.data.questionId}
                            votes={recent.data.bookmarks}
                            answers={recent.data.comments}
                            question={recent.data.question}
                            details={recent.data.description}
                            author={recent.data.author}
                            userId={recent.data.userId}
                            publishedDate={recent.data.publishedDate}
                        />
                    )
                ) : (
                    <div></div>
                );
            })}
        </motion.div>
    );
};
export default RecentActivityPage;

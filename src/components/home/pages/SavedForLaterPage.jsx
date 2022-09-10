import React, { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import QuestionCard from "../cards/QuestionCard";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateRecentActivity } from "../../../store/profile-actions";
import { fetchActivity } from "../../../store/activity-actions";
import { CircularProgress, Pagination, Stack } from "@mui/material";

const SavedForLaterPage = () => {
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

    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const [status, setStatus] = useState(false);
    const [saved, setSaved] = useState([]);
    useEffect(() => {
        dispatch(updateRecentActivity(profile, authData.localId));
        setStatus(true);
        fetchActivity(profile.savedContent).then((result) => {
            setSaved(result);
            setStatus(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [limit, setLimit] = useState(0);
    const pageinationHandler = (e, value) => {
        setLimit((value - 1) * 10);
        window.scroll(0, 0);
    };

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
            {saved.slice(limit, limit + 10).map((saved, index) => {
                return saved.type === "post" ? (
                    <PostCard
                        id={saved.data.postId}
                        userId={saved.data.uid}
                        key={index}
                        banner={saved.data.imageUrl}
                        title={saved.data.postTitle}
                        description={saved.data.postSummary}
                        likes={saved.data.likes}
                        author={saved.data.author}
                        comments={saved.data.comments}
                        publishedDate={saved.data.publishedDate}
                    />
                ) : (
                    <QuestionCard
                        key={saved.data.questionId}
                        id={saved.data.questionId}
                        answers={saved.data.comments}
                        question={saved.data.question}
                        details={saved.data.description}
                        author={saved.data.author}
                        votes={saved.data.likes}
                        userId={saved.data.userId}
                        publishedDate={saved.data.publishedDate}
                    />
                );
            })}
            <Stack spacing={2}>
                <Pagination
                    sx={{
                        margin: "1em auto",
                        backgroundColor: "#5cdb95",
                        padding: "0.5em",
                        color: "white",
                        borderRadius: "0.5em",
                    }}
                    count={Math.ceil(saved.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    onChange={pageinationHandler}
                />
            </Stack>
        </motion.div>
    );
};
export default SavedForLaterPage;

import React from "react";
import PostCard from "../cards/PostCard";
import { motion } from "framer-motion";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const PostPage = () => {
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
    const [limit, setLimit] = useState(0);
    const [status, setStatus] = useState(false);
    const pageinationHandler = (e, value) => {
        setLimit((value - 1) * 10);
        window.scroll(0, 0);
    };
    const [data, setTitle] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts.json"
                );
                const data = await res.json();
                return data;
            } catch (error) {
                return "failed";
            }
        };
        setStatus(true);
        fetchData().then((result) => {
            if (result !== "failed") {
                setStatus(false);
                setTitle(result);
            }
        });
    }, []);
    var result = [];
    for (var i in data) result.push(data[i]);

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
            {result.slice(limit, limit + 10).map((post) => (
                <PostCard
                    key={post.postId}
                    id={post.postId}
                    banner={post.imageUrl}
                    author={post.author}
                    title={post.postTitle}
                    description={post.postSummary}
                    likes={post.likes}
                    publishedDate={post.publishedDate}
                    comments={post.comments}
                    userId={post.uid}
                />
            ))}
            <Stack spacing={2}>
                <Pagination
                    sx={{
                        margin: "1em auto",
                        backgroundColor: "#5cdb95",
                        padding: "0.5em",
                        color: "white",
                        borderRadius: "0.5em",
                    }}
                    count={Math.ceil(result.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    onChange={pageinationHandler}
                />
            </Stack>
        </motion.div>
    );
};
export default PostPage;

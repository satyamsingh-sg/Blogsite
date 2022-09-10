import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PostCard from "../home/cards/PostCard";

const Results = () => {
    const location = useLocation(); //Navigation info
    const params = new URLSearchParams(location.search);
    const posts = useSelector((state) => state.trending);
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
    // Results pave which renders all the search results
    return (
        <motion.div
            variants={mainVarient}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {posts.data.map((post) =>
                params.get("genre") ? (
                    params.get("genre") === post.genre ? (
                        <PostCard
                            key={post.postId}
                            id={post.postId}
                            banner={post.imageUrl}
                            title={post.postTitle}
                            description={post.postSummary}
                            likes={post.likes}
                            publishedDate={post.publishedDate}
                            userId={post.uid}
                        />
                    ) : (
                        <div></div>
                    )
                ) : post.postTitle
                      ?.toLowerCase()
                      .includes(params.get("query")?.toLowerCase()) ? (
                    <PostCard
                        key={post.postId}
                        id={post.postId}
                        banner={post.imageUrl}
                        title={post.postTitle}
                        description={post.postSummary}
                        likes={post.likes}
                        publishedDate={post.publishedDate}
                        userId={post.uid}
                    />
                ) : (
                    <div></div>
                )
            )}
        </motion.div>
    );
};

export default Results;

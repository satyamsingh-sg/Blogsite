import { motion } from "framer-motion";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress, Pagination, Stack } from "@mui/material";

const QuestionPage = () => {
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
    const [data, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions.json"
            );
            const data = await res.json();
            setTitle(data);
        };
        fetchData();
    }, []);

    var result = [];

    for (var i in data) result.push(data[i]);

    let status = result.length;

    const [limit, setLimit] = useState(0);
    const pageinationHandler = (e, value) => {
        setLimit((value - 1) * 10);
        window.scroll(0, 0);
    };

    return !status ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}
        >
            <h1>
                <CircularProgress sx={{ color: "#5cdb95" }} />
            </h1>
        </div>
    ) : (
        <motion.div
            variants={mainVarient}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {result.slice(limit, limit + 10).map((query) => {
                return (
                    <QuestionCard
                        key={query.questionId}
                        id={query.questionId}
                        votes={query.likes}
                        answers={query.comments}
                        author={query.author}
                        question={query.question}
                        details={query.description}
                        userId={query.userId}
                        publishedDate={query.publishedDate}
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
                    count={Math.ceil(result.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    onChange={pageinationHandler}
                />
            </Stack>
        </motion.div>
    );
};
export default QuestionPage;

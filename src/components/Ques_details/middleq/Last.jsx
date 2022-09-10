//import ThumbUp from "@mui/icons-material/ThumbUp";
import { Avatar } from "@mui/material";
import classes from "./last.module.css";
//import TimerIcon from "@mui/icons-material/Timer";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { questionActions } from "../../../store/question";
import { sendQuestionData } from "../../../store/question-actions";
//import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import CommentsSection from "./commentsSection";

const Last = (props) => {
    const dispatch = useDispatch(); // initialising the dispatch to use store easily
    const authdata = useSelector((state) => state.auth); // importing auth data from store
    const userData = useSelector((state) => state.profile); // importing profile data
    const [comment, setComment] = useState("");
    const profileData = props.profileData;
    const commentsdata = useSelector((state) => state.question);
    const addCommentHandler = (event) => {
        // function to handle comments

        event.preventDefault();
        setComment("");
        if (comment === "") {
            return;
        }
        var today = new Date();
        const publishedDate = today.toLocaleDateString("en-US");
        const newComments = [
            ...commentsdata.comments,
            {
                userId: authdata.localId,
                name: userData.firstName,
                text: comment,
                publishedDate,
            },
        ];
        dispatch(
            questionActions.add({ ...commentsdata, comments: newComments })
        ); // adding comments for the questions in store

        dispatch(
            sendQuestionData(
                { ...commentsdata, comments: newComments },
                commentsdata.questionId
            )
        ).then((res) => {
            // console.log("printing response", res);
        });
    };

    return (
        <div className={classes.answers}>
            <span style={{ fontSize: "30px" }}>
                <b ref={props.theRef}>Answers</b>
            </span>
            <div>
                {commentsdata.comments.map(
                    (
                        comment // printing all the comments is done in commentssection component and we are importing it here
                    ) => (
                        // coming soon
                        <CommentsSection
                            profileData={profileData}
                            commentsdata={commentsdata}
                            comment={comment}
                        />
                    )
                )}
                <div>
                    <br />
                    <form onSubmit={addCommentHandler}>
                        {" "}
                        {/* adding comment onsubmit */}
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-1">
                                    <Avatar />
                                </div>
                                <div className="col-11">
                                    <TextField
                                        value={comment}
                                        fullWidth
                                        width="500px"
                                        helperText=" "
                                        id="ques_answer"
                                        label="Add an answer"
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        multiline
                                        rows={3}
                                        size="small"
                                    />
                                    <Button variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Last;

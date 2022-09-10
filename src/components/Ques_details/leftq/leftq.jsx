import * as React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendQuestionData } from "../../../store/question-actions";
import { ThumbUpOffAlt } from "@mui/icons-material";
import { profileActions } from "../../../store/profile";
import { questionActions } from "../../../store/question";
import BookmarkAdded from "@mui/icons-material/BookmarkAdded";

import Copyurl from "../../home/cards/CopyUrl";

const Leftq = (props) => {
    const checkId = (savedId, questionId) => {
        // function to check if the user has liked(or bookmarked) the particular post earlier or not
        for (var i = 0; i < savedId.length; i++) {
            if (savedId[i].id === questionId) {
                return true;
            }
        }
        return false;
    };

    const dispatch = useDispatch(); // initialising the dispatch to use store easily

    const questiondata = useSelector((state) => state.question); // Getting the data from the store
    const [like, setLike] = useState(questiondata.likes);
    const [bookmark, setBookmark] = useState(questiondata.bookmarks);
    const likedcontent = useSelector((state) => state.profile); // Getting the upvotes of the post from the store
    const likeid = likedcontent.likedContent;
    const savedId = likedcontent.savedContent;

    const [likestatus, setLikestatus] = useState(
        likeid.includes(questiondata.questionId)
    );
    const [bookmarkstatus, setBookmarkstatus] = useState(
        checkId(savedId, questiondata.questionId)
    );

    const likeHandler = () => {
        // like handler to increment number of likes in database and ui on clicking like buttons
        if (!likestatus) {
            var likes = like;
            setLikestatus(true);
            setLike((val) => val + 1);
            likes = like + 1;
            dispatch(profileActions.addLikedContent(questiondata.questionId));

            // dispatch(sendProfileData(profiledata, authdata.localId));
            dispatch(
                sendQuestionData(
                    { ...questiondata, likes: likes },
                    questiondata.questionId
                )
            ).then((res) => {
                if (res === "success") {
                    dispatch(
                        questionActions.add({ ...questiondata, likes: likes })
                    );
                }
            });
        }
    };

    const dislikeHandler = () => {
        // dislike handler to decrement number of likes in database and ui on clicking like button again when already liked
        if (likestatus) {
            var likes = like;
            setLikestatus(false);
            setLike((val) => val - 1);
            likes = like - 1;
            dispatch(
                profileActions.removeLikedContent(questiondata.questionId)
            );
            dispatch(
                sendQuestionData(
                    { ...questiondata, likes: likes },
                    questiondata.questionId
                )
            );
            // dispatch(sendProfileData(profiledata, authdata.localId));
        }
    };
    const bookmarklikeHandler = () => {
        // state management for bookmark button
        if (!bookmarkstatus) {
            var bookmarks = bookmark;
            setBookmarkstatus(true);
            setBookmark((val) => val + 1);
            bookmarks = bookmark + 1;
            dispatch(
                profileActions.addBookmark({
                    type: "question",
                    id: questiondata.questionId,
                })
            );

            // dispatch(sendProfileData(profiledata, authdata.localId));

            dispatch(
                sendQuestionData(
                    { ...questiondata, bookmarks: bookmarks },
                    questiondata.questionId
                )
            );
        }
    };

    const bookmarkdislikeHandler = () => {
        // state management for un bookmarking
        if (bookmarkstatus) {
            var bookmarks = bookmark;
            setBookmarkstatus(false);
            setBookmark((val) => val - 1);
            bookmarks = bookmark - 1;
            dispatch(
                profileActions.removeBookmark({
                    type: "question",
                    id: questiondata.questionId,
                })
            );
            dispatch(
                sendQuestionData(
                    { ...questiondata, bookmarks: bookmarks },
                    questiondata.questionId
                )
            ).then((res) => {
                if (res === "success") {
                    dispatch(
                        questionActions.add({
                            ...questiondata,
                            bookmarks: bookmarks,
                        })
                    );
                }
            });
            // dispatch(sendProfileData(profiledata, authdata.localId));
        }
    };

    const [modalShow, setModalShow] = React.useState(false);
    const url = window.location.href;
    return (
        <>
            <div style={{ paddingTop: "3em" }}>
                {likeid.includes(questiondata.questionId) ? ( //  if else condition to check if the user liked the post earlier
                    <button
                        className="btn shadow-none" // Dislike butoon is shown if the above condition is true or not
                        style={{ paddingLeft: "5.5em" }}
                        onClick={dislikeHandler} // Triggers dislike handler
                    >
                        <ThumbUpIcon /> {likestatus ? "Upvoted" : "Upvote"}
                    </button>
                ) : (
                    <button
                        className="btn shadow-none" // like button is shown if the above condition returns false
                        style={{ paddingLeft: "5.5em" }}
                        onClick={likeHandler} // Triggers like handler
                    >
                        <ThumbUpOffAlt /> {likestatus ? "Upvoted" : "Upvote"}
                    </button>
                )}

                <span style={{ paddingLeft: "7em" }}>{like}</span>
                <br />
                <br />
                <button
                    className="btn shadow-none"
                    style={{ paddingLeft: "5.5em" }}
                    onClick={props.handler}
                >
                    <CommentIcon /> Answers
                </button>
                <span style={{ paddingLeft: "7em" }}>
                    {questiondata.comments.length}
                </span>
                <br />
                <br />

                {bookmarkstatus ? ( // if else condition to check if the user bookmarked the post earlier
                    <button
                        className="btn shadow-none" // Unbookmark butoon is shown if the above condition is true or not
                        style={{ paddingLeft: "5.5em" }}
                        onClick={bookmarkdislikeHandler} // Triggers bookmarkdislikeHandler
                    >
                        <BookmarkAdded />{" "}
                        {bookmarkstatus ? "Bookmarked" : "Bookmark"}
                    </button>
                ) : (
                    <button
                        className="btn shadow-none" // bookmark button is shown if the above condition returns false
                        style={{ paddingLeft: "5.5em" }}
                        onClick={bookmarklikeHandler} // Triggers bookmarklikeHandler
                    >
                        <BookmarkIcon />{" "}
                        {bookmarkstatus ? "Bookmarked" : "Bookmark"}
                    </button>
                )}
                <span style={{ paddingLeft: "7em" }}> {bookmark}</span>
                <br />
                <br />

                <button
                    className="btn shadow-none"
                    style={{ paddingLeft: "5.5em" }}
                    onClick={() => setModalShow(true)}
                >
                    <ShareIcon /> Share
                </button>
                <Copyurl
                    show={modalShow}
                    url={url}
                    onHide={() => setModalShow(false)}
                />
                <br />
            </div>
        </>
    );
};

export default Leftq;

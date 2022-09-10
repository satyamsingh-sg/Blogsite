import * as React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendPostData } from "../../../../store/post-actions";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkAdded from "@mui/icons-material/BookmarkAdded";
import { profileActions } from "../../../../store/profile";
import { postActions } from "../../../../store/post";
import Copyurl from "../../../home/cards/CopyUrl";

const Leftp = (props) => {
    const postdata = useSelector((state) => state.post);
    const dispatch = useDispatch(); // initialising the dispatch to use store easily

    const [like, setLike] = useState(postdata.likes);
    const [bookmark, setBookmark] = useState(postdata.bookmarks);
    const likedcontent = useSelector((state) => state.profile); // Getting the likes of the post from the store
    const likeid =
        likedcontent.likedContent === undefined
            ? []
            : likedcontent.likedContent;

    const checkId = (savedId, postId) => {
        // function to check if the user has liked(or bookmarked) the particular post earlier or not
        for (var i = 0; i < savedId.length; i++) {
            if (savedId[i].id === postId) {
                return true;
            }
        }
        return false;
    };

    const savedId = likedcontent.savedContent;

    const [likestatus, setLikestatus] = useState(
        likeid.includes(postdata.postId)
    );
    const [bookmarkstatus, setBookmarkstatus] = useState(
        checkId(savedId, postdata.postId)
    );

    const likeHandler = () => {
        // like handler to increment number of likes in database and ui on clicking like buttons
        if (!likestatus) {
            var likes = like;
            setLikestatus(true);
            setLike((val) => val + 1);
            likes = like + 1;
            dispatch(profileActions.addLikedContent(postdata.postId));
            dispatch(
                sendPostData({ ...postdata, likes: likes }, postdata.postId)
            ).then((res) => {
                if (res === "success") {
                    dispatch(postActions.add({ ...postdata, likes: likes }));
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
            dispatch(profileActions.removeLikedContent(postdata.postId));
            dispatch(
                sendPostData({ ...postdata, likes: likes }, postdata.postId)
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
                    type: "post",
                    id: postdata.postId,
                })
            );
            dispatch(
                sendPostData(
                    { ...postdata, bookmarks: bookmarks },
                    postdata.postId
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
                    type: "post",
                    id: postdata.postId,
                })
            );
            dispatch(
                sendPostData(
                    { ...postdata, bookmarks: bookmarks },
                    postdata.postId
                )
            ).then((res) => {
                if (res === "success") {
                    dispatch(
                        postActions.add({ ...postdata, bookmarks: bookmarks })
                    );
                }
            });
        }
    };
    const [modalShow, setModalShow] = React.useState(false);
    const url = window.location.href;
    return (
        <>
            <div style={{ paddingTop: "3em" }}>
                {likeid.includes(postdata.postId) ? ( //  if else condition to check if the user liked the post earlier
                    <button
                        className="btn shadow-none" // Dislike butoon is shown if the above condition is true or not
                        style={{ paddingLeft: "5.5em" }}
                        onClick={dislikeHandler} // Triggers dislike handler
                    >
                        <ThumbUpIcon /> {likestatus ? "Liked" : "Like"}
                    </button>
                ) : (
                    <button // like button is shown if the above condition returns false
                        className="btn shadow-none"
                        style={{ paddingLeft: "5.5em" }}
                        onClick={likeHandler} // Triggers like handler
                    >
                        <ThumbUpOffAlt /> {likestatus ? "Liked" : "Like"}
                    </button>
                )}
                <span style={{ paddingLeft: "7em" }}>{like}</span>
                <br />
                <br />
                <button // comment button to scrole down to post comments
                    className="btn shadow-none"
                    style={{ paddingLeft: "5.5em" }}
                    onClick={props.handler}
                >
                    <CommentIcon /> Comment
                </button>
                <span style={{ paddingLeft: "7em" }}>
                    {postdata.comments.length}
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
                <span style={{ paddingLeft: "7em" }}>{bookmark}</span>
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

export default Leftp;

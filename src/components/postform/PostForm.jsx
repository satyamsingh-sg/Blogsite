import React, { useEffect, useRef, useState } from "react";
import classes from "./Form.module.css";
import AddIcon from "@mui/icons-material/Add";
import PostModal from "./PostModal";
import ImageInputBox from "./ImageInputBox/ImageInputBox";
import TextInputBox from "./TextInputBox/TextInputBox";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profile";
import { sendPostData } from "../../store/post-actions";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../auth/LoadingSpinner";
import { postsActions } from "../../store/posts";
const PostForm = () => {
    const auth = useSelector((state) => state.auth); //Accessing the user's data from the redux store
    const about = useSelector((state) => state.profile); //Accessing the user's profile from the redux store

    const dispatch = useDispatch(); //Dispatch to dispatch the actions

    // State for the form inputs
    const [inputList, setInputList] = useState([]);
    const [banner, setBanner] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [submit, setSubmit] = useState(false);
    const [genre, setGenre] = useState("");
    const navigate = useNavigate();
    const formRef = useRef();

    // Effect for the scroll
    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, [inputList.length]);

    // Handler for the form validation
    const bannerHandler = (value) => {
        setBanner(value);
    };

    const titleHandler = (value) => {
        setTitle(value);
    };

    const summaryHandler = (value) => {
        setSummary(value);
    };

    // Scrolling function
    function updateScroll() {
        var element = document.getElementById("post-form");
        element.scrollTop = element.scrollHeight;
    }

    // Input handler for custom inputs

    const addInputHandler = (type) => {
        setInputList((value) => [
            ...value,
            {
                id: uuidv4(),
                type: type,
                value: "",
            },
        ]);
        updateScroll();
    };

    // Input delete handler
    const deleteInputHandler = (id) => {
        const values = [...inputList];
        values.splice(
            values.findIndex((value) => value.id === id),
            1
        );
        setInputList(values);
    };

    // Input on change handler
    const inputChangeHandler = (id, value) => {
        const newInputFields = inputList.map((input) => {
            if (input.id === id) {
                input.value = value;
            }
            return input;
        });
        setInputList(newInputFields);
    };

    // Form on submit handler
    const onSubmitHandler = (event) => {
        const postId = uuidv4();
        const uid = auth.localId;
        var today = new Date();
        const publishedDate = today.toLocaleDateString("en-US");
        event.preventDefault();
        const finalData = inputList.map((input) => {
            if (input.type === "image") {
                input.value = "https://picsum.photos/200";
            }
            return input;
        });
        const postData = {
            postId: postId,
            likes: 0,
            uid: uid,
            publishedDate: publishedDate,
            bookmarks: 0,
            postTitle: title,
            imageUrl: "https://picsum.photos/200",
            postSummary: summary,
            postData: finalData,
            comments: [],
            genre: genre,
            author: about.firstName,
        };
        setSubmit(true);
        dispatch(sendPostData(postData, postId)).then((result) => {
            //Dispatching the required data to the redux store and firebase
            if (result === "success") {
                var postIds = [...about.postIds, postId];
                dispatch(profileActions.update({ ...about, postIds: postIds }));
                dispatch(postsActions.addPost(postData));
                setSubmit(false);

                navigate(`/profile/${uid}`, { replace: true });
            }
        });
    };

    return submit ? (
        <LoadingSpinner />
    ) : (
        <div className={"col-md-8 " + classes.form}>
            <form
                className={"container"}
                onSubmit={onSubmitHandler}
                ref={formRef}
            >
                {/* <br /> */}
                <div
                    id="post-form"
                    className="d-flex align-items-center justify-content-between"
                >
                    <h1 className="mb-4 mt-4">
                        <b>Step 1: </b> Create the post
                    </h1>
                    <select
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Please select the type of genre this post is related to !"
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }}
                        className="form-select"
                        aria-label="Default select example"
                        style={{
                            width: "10em",
                            backgroundColor: "#5cdb95",
                            fontWeight: "600",
                            border: "2px solid #5cdb95",
                            borderColor: genre === "genre-invalid" ? "red" : "",
                        }}
                        defaultValue={""}
                        required
                    >
                        <option value="" disabled>
                            Select genre
                        </option>
                        <option value="tech">Technology</option>
                        <option value="gadgets">Gadgets</option>
                        <option value="coding">Coding</option>
                        <option value="traveling">Traveling</option>
                        <option value="movies">Movies</option>
                        <option value="gaming">Gaming</option>
                    </select>
                </div>
                {/* <br /> */}
                <ImageInputBox
                    id={"hello9"}
                    height={"30vh"}
                    isAdded={false}
                    onChange={bannerHandler}
                    inputname={"Add banner image"}
                />
                {/* <br /> */}
                <TextInputBox
                    id={"hello0"}
                    inputname={"Title"}
                    isAdded={false}
                    onChange={titleHandler}
                    maxLength={120}
                />
                {/* <br /> */}
                <TextInputBox
                    id={"hello"}
                    inputname={"Summary"}
                    height={"100px"}
                    isAdded={false}
                    onChange={summaryHandler}
                    maxLength={400}
                />
                {/* <br /> */}
                {/* Custom rendering */}
                {inputList.map((input, index) => {
                    return input.type === "text" ? (
                        <React.Fragment key={index}>
                            <TextInputBox
                                id={input.id}
                                inputname={`Content cell ${index + 1}`}
                                isAdded={true}
                                onChange={inputChangeHandler}
                                onDelete={deleteInputHandler}
                                maxLength={400}
                                height={"120px"}
                            />
                            {/* <br /> */}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>
                            <ImageInputBox
                                id={input.id}
                                height={"20vh"}
                                inputname={`Add image ${index + 1}`}
                                isAdded={true}
                                onChange={inputChangeHandler}
                                onDelete={deleteInputHandler}
                            />
                        </React.Fragment>
                    );
                })}
                <div id="post-form"></div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ marginBottom: "1em" }}
                >
                    Submit
                </button>
            </form>
            <button
                className={"btn btn-primary " + classes.floatingbutton}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <AddIcon />
            </button>
            <PostModal handler={addInputHandler} />
        </div>
    );
};

export default PostForm;

import React from "react";
import { useState } from "react";
import classes from "./AddPost.module.css";
const AddQuestion = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(title, description, image);
    };

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const classValue = "form-group " + classes.formInput;
    const container = "container " + classes.container;

    return (
        <>
            <div className={container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={classes.title}>Add Post</h2>
                    <div className="form-row">
                        <div className={classValue}>
                            <label style={{ fontWeight: "bold" }} for="title">
                                Question Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                                placeholder="Add Post Title Here..."
                                required
                            />
                        </div>
                        <div className={classValue}>
                            <label style={{ fontWeight: "bold" }} for="parah1">
                                Question Description
                            </label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                placeholder="Add Description Here..."
                                required
                            ></textarea>
                        </div>
                        <div className={classValue}>
                            <label
                                style={{ fontWeight: "bold" }}
                                for="bannerImage"
                            >
                                Add banner Image
                            </label>
                            <br />
                            <input
                                type="file"
                                className="form-control-file"
                                id="bannerImage"
                                onChange={(event) => {
                                    setImage(
                                        "https://source.unsplash.com/1600x900"
                                    );
                                }}
                            />
                        </div>

                        <div className={classValue}>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddQuestion;

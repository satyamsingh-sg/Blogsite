import classes from "./modal.module.css";
import { Link } from "react-router-dom";

//Modal for Create button in header
const ModalBody = () => {
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className={classes.postmodal}>
                        <img
                            src="https://previews.123rf.com/images/scis65/scis651504/scis65150400029/38942772-yellow-post-it-with-tape-on-a-white-background.jpg"
                            alt="post"
                            className={classes.postimg}
                        />
                        <span className={classes.posttext}>
                            <Link to="/forms/post">
                                <b>Posts</b>
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="col-6">
                    <div className={classes.questionmodal}>
                        <img
                            src="https://previews.123rf.com/images/scis65/scis651504/scis65150400029/38942772-yellow-post-it-with-tape-on-a-white-background.jpg"
                            alt="question"
                            className={classes.questimg}
                        />
                        <span className={classes.questext}>
                            <Link to="/forms/question">
                                {" "}
                                <b>Questions</b>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBody;

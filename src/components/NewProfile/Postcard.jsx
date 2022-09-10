import classes from "./postcard.module.css";
import { useSelector } from "react-redux";
import PostCard from "../home/cards/PostCard";

const Postcard = (props) => {
    const postsdata = useSelector((state) => state.posts); //fetching the details of the particular user
    if (postsdata === null) {
        return (
            <div style={{ paddingLeft: "16em", paddingTop: "3em" }}>
                <b>Create your own post</b>
            </div>
        );
    } else {
        return (
            <div>
                <div className={classes.cardcontainer}>
                    <div className={classes.postscreate}></div>
                    <div className={classes.postcards}>
                        {props.curUser
                            ? postsdata.map(
                                  (
                                      postdata //Checking if the user is ourselves or others to render the posts section in profile page
                                  ) => (
                                      <PostCard //if we are the user and sending the current post details using props
                                          key={postdata.postId}
                                          id={postdata.postId} //id of the post
                                          banner={postdata.imageUrl} //banner of the post
                                          title={postdata.postTitle} //posts title
                                          description={postdata.postSummary} //posts description
                                          likes={postdata.likes} //posts likes
                                          publishedDate={postdata.publishedDate} //posts published date
                                          userId={postdata.uid} //user id of the particular post
                                          author={postdata.author} //author of the post
                                      />
                                  )
                              )
                            : props.postsData.map(
                                  (
                                      postdata //other users posts data
                                  ) => (
                                      <PostCard
                                          key={postdata.postId}
                                          id={postdata.postId} //id of the post
                                          banner={postdata.imageUrl} //banner of the post
                                          title={postdata.postTitle} //posts title
                                          description={postdata.postSummary} //posts description
                                          likes={postdata.likes} //likes of the posts
                                          publishedDate={postdata.publishedDate} //published date of the post
                                          userId={postdata.uid} //user id of the post
                                          author={postdata.author} //author of the post
                                      />
                                  )
                              )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Postcard;

import { Avatar, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../../store/profile";
import { fetchOtherProfileData } from "../../../store/profile-actions";
import { sendOtherProfileData } from "../../../store/profile-actions";

const Following = (props) => {
    const followinglist = useSelector((state) => state.profile.followingList); //fetching user following list from the store
    const dispatch = useDispatch(); //Intializing the dispatch
    const followInfo = useSelector((state) => state.profile); //fetching user info from the store
    const authStatus = useSelector((state) => state.auth); //fetching user authentication from the user
    const unfollowHandler = (index) => {
        const newList = followInfo.followingList.filter(
            (id) => id.id !== index
        );

        dispatch(fetchOtherProfileData(index)).then((res) => {
            dispatch(
                sendOtherProfileData(
                    {
                        ...res,
                        followersList: res.followersList.filter(
                            (id) => id.id !== authStatus.localId
                        ),
                    },
                    index
                )
            ).then((result) => {
                if (result === "succes") {
                    dispatch(
                        profileActions.update({
                            ...followInfo,
                            followingList: newList,
                        })
                    );
                }
            });
        });
    };

    return (
        <div>
            <div className="container-fluid">
                <h4 style={{ paddingBottom: "0.5em" }}>
                    Following: {followinglist.length}{" "}
                </h4>
                {followinglist.map((user) => (
                    <div className="row" style={{ paddingBottom: "0.5em" }}>
                        <div className="col-2">
                            <Avatar src="/broken-image.jpg" />
                        </div>
                        <div className="col-6" style={{ paddingTop: "0.3em" }}>
                            <Link underline="none" color="black" href="#">
                                {user.name}
                            </Link>
                        </div>
                        <div className="col-4" style={{}}>
                            <button
                                className="btn btn-danger"
                                onClick={() => unfollowHandler(user.id)} //unfollowing the user by using their ids
                            >
                                Unfollow
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Following;

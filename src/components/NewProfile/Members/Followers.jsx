import { Avatar, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../../store/profile";
import { fetchOtherProfileData } from "../../../store/profile-actions";
import { sendOtherProfileData } from "../../../store/profile-actions";
const Followers = (props) => {
    const followInfo = useSelector((state) => state.profile); //fetching the user data from the store
    const authStatus = useSelector((state) => state.auth); //fetching the user authentication from the store
    const followerslist = followInfo.followersList; //Taking followerslist from the followinfo
    const dispatch = useDispatch(); //Intializing dispatch
    const removeHandler = (index) => {
        const newList = followInfo.followersList.filter(
            (id) => id.id !== index
        );

        dispatch(fetchOtherProfileData(index)).then((res) => {
            dispatch(
                sendOtherProfileData(
                    {
                        ...res,
                        followingList: res.followingList.filter(
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
                            followersList: newList,
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
                    Followers: {followerslist.length}{" "}
                </h4>
                {followerslist.map((user) => (
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
                                onClick={() => removeHandler(user.id)} //removing user by using their ids
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Followers;

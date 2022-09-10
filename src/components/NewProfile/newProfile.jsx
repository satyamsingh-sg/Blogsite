import Profile from "./Profile.jsx";
import ProfileMiddle from "./ProfileMiddle.jsx";

const NewProfile = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <Profile />
                </div>

                <div className="col-9">
                    <ProfileMiddle />
                </div>
            </div>
        </div>
    );
};

export default NewProfile;

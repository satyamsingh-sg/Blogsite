import { profileActions } from "./profile";
export const sendProfileData = (about, localId) => {
    //sending the profile data to the database
    return async (dispatch) => {
        const sendRequest = async () => {
            //sending req to the database
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/users/${localId}.json`;
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(about),
            });

            if (!response.ok) {
                throw new Error("Sending data failed.");
            }
        };

        try {
            await sendRequest();
        } catch (error) {}
    };
};

export const fetchProfileData = (localId) => {
    //fetching the profile data from the database
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/users/${localId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }

            const data = await response.json();

            return data;
        };

        try {
            const profileData = await fetchData(); //fetching data of the user profile
            var data = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                followersList:
                    profileData.followersList === undefined
                        ? []
                        : profileData.followersList,
                followingList:
                    profileData.followingList === undefined
                        ? []
                        : profileData.followingList,
                postIds:
                    profileData.postIds === undefined
                        ? []
                        : profileData.postIds,
                questionIds:
                    profileData.questionIds === undefined
                        ? []
                        : profileData.questionIds,
                bio: profileData.bio,
                genres:
                    profileData.genres === undefined ? [] : profileData.genres,
                recentActivity:
                    profileData.recentActivity === undefined
                        ? []
                        : profileData.recentActivity,
                savedContent:
                    profileData.savedContent === undefined
                        ? []
                        : profileData.savedContent,
                likedContent:
                    profileData.likedContent === undefined
                        ? []
                        : profileData.likedContent,
            };
            dispatch(profileActions.update(data)); //updating the data from the database to the store
            return data;
        } catch (error) {
            return "false";
        }
    };
};

export const fetchOtherProfileData = (localId) => {
    //fetching the profile details of the other users
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/users/${localId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }

            const data = await response.json();

            return data;
        };

        try {
            const profileData = await fetchData(); //fetching the other users profile data
            var data = {
                ...profileData,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                followersList:
                    profileData.followersList === undefined
                        ? []
                        : profileData.followersList,
                followingList:
                    profileData.followingList === undefined
                        ? []
                        : profileData.followingList,
                postIds:
                    profileData.postIds === undefined
                        ? []
                        : profileData.postIds,
                questionIds:
                    profileData.questionIds === undefined
                        ? []
                        : profileData.questionIds,
                bio: profileData.bio,
                genres:
                    profileData.genres === undefined ? [] : profileData.genres,
                recentActivity:
                    profileData.recentActivity === undefined
                        ? []
                        : profileData.recentActivity,
                savedContent:
                    profileData.savedContent === undefined
                        ? []
                        : profileData.savedContent,
                likedContent:
                    profileData.likedContent === undefined
                        ? []
                        : profileData.likedContent,
            };
            return data;
        } catch (error) {
            return "failed";
        }
    };
};

export const updateRecentActivity = (data, localId) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/users/${localId}.json`;
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Sending data failed.");
            }
        };

        try {
            await sendRequest();
            return "success";
        } catch (error) {
            return "failure";
        }
    };
};

export const sendOtherProfileData = (about, userId) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/users/${userId}.json`;
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(about),
            });

            if (!response.ok) {
                throw new Error("Sending data failed.");
            }
        };

        try {
            await sendRequest();
            return "succes";
        } catch (error) {
            return error;
        }
    };
};

import { authActions } from "./auth";
import { API_KEY } from "../keys";
import { profileActions } from "./profile";
export const signinAction = (email, password) => {
    return async (dispatch) => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            returnSecureToken: true,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                return data;
            } catch (error) {
                return error;
            }
        };

        const authData = await fetchData();
        if (authData.error) {
            return authData.error.message;
        }
        dispatch(authActions.login(authData));
        return "success";
    };
};

export const signupAction = (email, password, firstname, lastName) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            try {
                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            returnSecureToken: true,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();
                return data;
            } catch (error) {
                return error;
            }
        };

        const authData = await sendRequest();
        if (authData.error) {
            return authData.error.message;
        }
        await dispatch(authActions.login(authData));
        await dispatch(
            profileActions.update({
                firstName: firstname,
                lastName: lastName,
                email: email,
                bio: "",
                genres: [],
                postIds: [],
                questionIds: [],
                followersList: [],
                followingList: [],
            })
        );
        return "success";
    };
};

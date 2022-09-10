import { postActions } from "./post";
import { postsActions } from "./posts";
import { trendingActions } from "./trending";
export const sendPostData = (postData, postId) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts/${postId}.json`;
            const response = await fetch(url, {
                method: "put",
                body: JSON.stringify(postData),
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

export const fetchPostData = (postId) => {
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts/${postId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }
            const data = await response.json();

            return data;
        };

        try {
            const postData = await fetchData();
            var data = {
                ...postData,
                comments:
                    postData.comments === undefined ? [] : postData.comments,
                postData:
                    postData.postData === undefined ? [] : postData.postData,
                genre: postData.genre === undefined ? "tech" : postData.genre,
            };
            dispatch(postActions.add(data));
            return data;
        } catch (error) {
            return "failed";
        }
    };
};

export const fetchPostsData = (postId) => {
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts/${postId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }
            const data = await response.json();

            return data;
        };

        try {
            const postData = await fetchData();
            var data = {
                ...postData,
                comments:
                    postData.comments === undefined ? [] : postData.comments,
                postData:
                    postData.postData === undefined ? [] : postData.postData,
                genre: postData.genre === undefined ? "tech" : postData.genre,
            };
            dispatch(postsActions.addPost(data));
            return "success";
        } catch (error) {
            return "failed";
        }
    };
};

export const fetchOtherPostsData = (postId) => {
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts/${postId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }
            const data = await response.json();

            return data;
        };

        try {
            const postData = await fetchData();
            var data = {
                ...postData,
                comments:
                    postData.comments === undefined ? [] : postData.comments,
                postData:
                    postData.postData === undefined ? [] : postData.postData,
                genre: postData.genre === undefined ? "tech" : postData.genre,
            };

            return data;
        } catch (error) {
            return "failed";
        }
    };
};

export const fetchTrendingPosts = () => {
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts.json`;
        const fetchData = async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }
            const data = await response.json();
            return data;
        };
        try {
            const postData = await fetchData();
            const data = [];
            for (var key in postData) {
                data.push(postData[key]);
            }
            dispatch(trendingActions.addPosts(data));
            return "success";
        } catch (error) {
            return "failed";
        }
    };
};

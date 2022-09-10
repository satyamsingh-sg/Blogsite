export const fetchUsers = () => {
    return async (dispatch) => {
        const getUsers = async () => {
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/users.json`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Sending data failed.");
            }
            const data = await response.json();
            return data;
        };

        try {
            const users = await getUsers();
            // console.log(users);
            // console.log("Success");
            return Object.values(users);
        } catch (error) {
            // console.log(error);
            // console.log("send post error");
            return "failure";
        }
    };
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const getPosts = async () => {
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts.json`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Sending data failed.");
            }
            const data = await response.json();
            return data;
        };

        try {
            const posts = await getPosts();
            // console.log(posts);
            // console.log("Success");
            return Object.values(posts);
        } catch (error) {
            // console.log(error);
            // console.log("send post error");
            return "failure";
        }
    };
};

export const fetchQuestions = () => {
    return async (dispatch) => {
        const getQuestions = async () => {
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions.json`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Sending data failed.");
            }
            const data = await response.json();
            return data;
        };

        try {
            const threads = await getQuestions();
            return Object.values(threads);
        } catch (error) {
            return "failure";
        }
    };
};

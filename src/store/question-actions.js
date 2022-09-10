import { questionActions } from "./question";
import { questionsActions } from "./questions";
export const sendQuestionData = (questionData, questionId) => {
    //sending the question details to the database
    return async (dispatch) => {
        const sendRequest = async () => {
            //sending the req to the database
            const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions/${questionId}.json`;
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(questionData),
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

export const fetchQuestionData = (questionId) => {
    //fetching the question details from the database

    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions/${questionId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }

            const data = await response.json();

            return data;
        };

        try {
            const questionData = await fetchData();
            var data = {
                ...questionData,
                comments:
                    questionData.comments === undefined
                        ? []
                        : questionData.comments,
                bookmarks:
                    questionData.bookmarks === undefined
                        ? 0
                        : questionData.bookmarks,
                status:
                    questionData.status === undefined
                        ? "active"
                        : questionData.status,
            };
            dispatch(questionActions.add(data)); //updating the details in the store
            return data;
        } catch (error) {
            return "failed";
        }
    };
};

export const fetchQuestionsData = (questionId) => {
    //fetching the question details  to show in the question tabs in the profile page

    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions/${questionId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }
            const data = await response.json();

            return data;
        };

        try {
            const questionData = await fetchData();
            var data = {
                ...questionData,
                comments:
                    questionData.comments === undefined
                        ? []
                        : questionData.comments,
                bookmarks:
                    questionData.bookmarks === undefined
                        ? 0
                        : questionData.bookmarks,
                status:
                    questionData.status === undefined
                        ? "active"
                        : questionData.status,
            };
            dispatch(questionsActions.addQuestion(data));
            return "success";
        } catch (error) {
            return "failed";
        }
    };
};
export const fetchOtherQuestionsData = (questionId) => {
    return async (dispatch) => {
        const url = `https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions/${questionId}.json`;
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Could not fetch data!");
            }
            const data = await response.json();

            return data;
        };

        try {
            const questionData = await fetchData();
            var data = {
                ...questionData,
                comments:
                    questionData.comments === undefined
                        ? []
                        : questionData.comments,
                bookmarks:
                    questionData.bookmarks === undefined
                        ? 0
                        : questionData.bookmarks,
                status:
                    questionData.status === undefined
                        ? "active"
                        : questionData.status,
            };
            return data;
        } catch (error) {
            return "failed";
        }
    };
};

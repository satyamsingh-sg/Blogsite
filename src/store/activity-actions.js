export const fetchActivity = async (recentActivity) => {
    // Fetch all the posts with teh given post id
    const fetchPosts = async (postId) => {
        try {
            const response = await fetch(
                `https://blogsite-dc4f2-default-rtdb.firebaseio.com/posts/${postId}.json`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    };

    // Fetch all the questions give the questio  id
    const fetchQuestions = async (threadId) => {
        try {
            const response = await fetch(
                `https://blogsite-dc4f2-default-rtdb.firebaseio.com/questions/${threadId}.json`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    };

    const postData = recentActivity.filter((obj) => obj?.type === "post"); //Filtering all the post ids
    const questionData = recentActivity.filter(
        (obj) => obj?.type === "question"
    ); //Filtering all the question ids
    const recents = [];
    for (var post in postData) {
        const temp = await fetchPosts(postData[post].id);
        recents.push({ type: "post", data: temp });
    }
    for (var question in questionData) {
        const temp = await fetchQuestions(questionData[question].id);
        recents.push({ type: "question", data: temp });
    }

    return recents; //Returning all the data
};

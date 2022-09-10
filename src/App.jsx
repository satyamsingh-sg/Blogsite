/* eslint-disable react-hooks/exhaustive-deps */
import Routing from "./Routing";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendProfileData, fetchProfileData } from "./store/profile-actions";
import { BrowserRouter } from "react-router-dom";
import { fetchPostsData, fetchTrendingPosts } from "./store/post-actions";
import { fetchQuestionsData } from "./store/question-actions";
import { postsActions } from "./store/posts";
import { questionsActions } from "./store/questions";
function App() {
    const isAuth = useSelector((state) => state.auth);
    const aboutData = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("idToken") !== null) {
            dispatch(
                authActions.login({
                    idToken: localStorage.getItem("idToken"),
                    localId: localStorage.getItem("localId"),
                })
            );
        }
    }, []);
    useEffect(() => {
        if (!isAuth.isAuthenticated) {
            return;
        }
        dispatch(sendProfileData(aboutData, isAuth.localId));
    }, [aboutData]);
    useEffect(() => {
        dispatch(fetchTrendingPosts());
    }, []);
    useEffect(() => {
        if (!isAuth.isAuthenticated) {
            dispatch(postsActions.reset());
            dispatch(questionsActions.reset());
            return;
        }
        dispatch(fetchProfileData(isAuth.localId)).then((res) => {
            if (res !== null) {
                res.postIds?.map((id) => {
                    return dispatch(fetchPostsData(id));
                });
            }
        });
        dispatch(fetchProfileData(isAuth.localId)).then((res) => {
            if (res !== null) {
                res.questionIds?.map((id) => {
                    return dispatch(fetchQuestionsData(id));
                });
            }
        });
    }, [isAuth]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </div>
    );
}

export default App;

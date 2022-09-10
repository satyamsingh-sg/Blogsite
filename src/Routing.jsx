import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./components/main/Main";
import ProfileLayout from "./layouts/ProfileLayout";
import HomeLayout from "./layouts/HomeLayout";
import Authentication from "./components/auth/Authentication";
import PostLayout from "./layouts/PostLayout";
import QuestionLayout from "./layouts/QuestionLayout";
import PostPage from "./components/home/pages/PostPage";
import QuestionPage from "./components/home/pages/QuestionPage";
import RecentActivityPage from "./components/home/pages/RecentactivityPage";
import SavedForLaterPage from "./components/home/pages/SavedForLaterPage";
import PostForm from "./components/postform/PostForm";
import QuestionForm from "./components/postform/QuestionForm";
import FormLayout from "./components/postform/FormLayout";
import PageNotFound from "./layouts/PageNotFound";
import { AnimatePresence } from "framer-motion";
import ProfileMiddle from "./components/NewProfile/ProfileMiddle";
import SearchResultsLayout from "./layouts/SearchResultsLayout";
import Results from "./components/search/Results";
import Admin from "./admin/Admin";
import UserDetailed from "./admin/UserDetailed";
import Users from "./admin/Users";
import Posts from "./admin/Posts";
import Questions from "./admin/Questions";

const Routing = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />} />
        <Route element={<SearchResultsLayout />}>
          <Route path="/searchresults" element={<Results />} />
        </Route>
        <Route path="/auth" element={<Authentication />} />

        <Route path="/home/*" element={<HomeLayout />}>
          <Route path="post" element={<PostPage />} />
          <Route path="question" element={<QuestionPage />} />
          <Route path="recents" element={<RecentActivityPage />} />
          <Route path="saved" element={<SavedForLaterPage />} />
        </Route>

        <Route path="/forms/*" element={<FormLayout />}>
          <Route path="post" element={<PostForm />} />
          <Route path="question" element={<QuestionForm />} />
        </Route>

        <Route path="/posts/:postID" element={<PostLayout />} />

        <Route path="/forum-threads/:threadID" element={<QuestionLayout />} />

        <Route element={<ProfileLayout />}>
          <Route path="/profile/:uid" element={<ProfileMiddle />} />
        </Route>
        <Route path="/admin/*" element={<Admin />}>
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="questions" element={<Questions />} />
          <Route path="users/:id" element={<UserDetailed />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;

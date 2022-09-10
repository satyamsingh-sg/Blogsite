import { createSlice } from "@reduxjs/toolkit";

//for showing the posts details of the users in the profile page
const initialpostsState = [];

const postsSlice = createSlice({
    name: "postsData",
    initialState: initialpostsState,
    reducers: {
        addPost(state, action) {
            //adding the details of the posts
            state.push({
                postId: action.payload.postId,
                uid: action.payload.uid,
                publishedDate: action.payload.publishedDate,
                postTitle: action.payload.postTitle,
                imageUrl: action.payload.imageUrl,
                postSummary: action.payload.postSummary,
                postData: action.payload.postData,
                likes: action.payload.likes,
                bookmarks: action.payload.bookmarks,
                comments: action.payload.comments,
                genre: action.payload.genre,
                author: action.payload.author,
            });
        },
        reset: () => initialpostsState,
    },
});

export const postsActions = postsSlice.actions; //exporting the reducers

export default postsSlice.reducer; //exporting the store
